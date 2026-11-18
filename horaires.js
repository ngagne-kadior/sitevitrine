// ===== HORAIRES D'OUVERTURE : source unique pour tout le site =====
// Partie 1 : données et fonctions pures (aucun accès à la page), utilisables dans Node (module.exports) pour les tests.
// Partie 2 : pastille « Ouvert / Fermé », bandeau et ligne du panier (navigateur uniquement).
// Chargé AVANT order.js, qui reprend HORAIRES pour les créneaux Jour / Heure du panier.

// Tous les jours, deux plages. Heure d'ouverture incluse, heure de fermeture exclue
// (à 14h00 pile, la boutique est fermée).
const HORAIRES = {
  fuseau: 'Africa/Dakar',
  plages: [
    { debut: '06:00', fin: '14:00' },
    { debut: '16:00', fin: '23:00' }
  ]
};

// Jours de fermeture totale (fête, inventaire…), au format "AAAA-MM-JJ", heure de Dakar.
// Pour fermer un jour de fête, ajoutez sa date entre guillemets suivie d'une virgule, par exemple :
//   const FERMETURES_EXCEPTIONNELLES = [
//     '2027-03-20', // Korité
//     '2027-05-27', // Tabaski
//   ];
// Ce jour-là, le site affiche « Fermé aujourd'hui · réouverture demain à 06h00 ».
// Pensez à retirer les dates passées de temps en temps.
const FERMETURES_EXCEPTIONNELLES = [];

const MINUTES_FERME_BIENTOT = 30; // « ferme_bientot » : ouvert et fermeture dans 30 minutes ou moins

// "06:00" → 360
function hhmmEnMinutes(hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + m;
}
// 960 → "16h00"
function formatHeure(minutes) {
  return String(Math.floor(minutes / 60)).padStart(2, '0') + 'h' + String(minutes % 60).padStart(2, '0');
}
// Plages en minutes depuis minuit, triées : [{ debut: 360, fin: 840 }, …]
function plagesEnMinutes(horaires = HORAIRES) {
  return horaires.plages.map(p => ({ debut: hhmmEnMinutes(p.debut), fin: hhmmEnMinutes(p.fin) })).sort((a, b) => a.debut - b.debut);
}

// Date ("AAAA-MM-JJ") et minutes depuis minuit dans le fuseau de la boutique, quelle que soit l'heure de l'appareil.
function heureBoutique(date, fuseau = HORAIRES.fuseau) {
  try {
    const p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: fuseau, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date).forEach(x => { p[x.type] = x.value; });
    return { jour: `${p.year}-${p.month}-${p.day}`, minutes: (+p.hour % 24) * 60 + +p.minute };
  } catch (e) {
    // Fuseau indisponible : Dakar est à UTC+0 toute l'année, sans heure d'été.
    return { jour: date.toISOString().slice(0, 10), minutes: date.getUTCHours() * 60 + date.getUTCMinutes() };
  }
}
// "2026-12-31" + 1 → "2027-01-01"
function ajouterJours(jour, n) {
  const [y, m, d] = jour.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
// "2026-12-26" → "samedi 26 décembre"
function nomDuJour(jour) {
  const [y, m, d] = jour.split('-').map(Number);
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}

// Statut de la boutique à un instant donné. Fonction pure : même entrée → même résultat, rien n'est modifié.
// Renvoie { etat: "ouvert" | "ferme_bientot" | "ferme", message, prochaineOuverture }
// prochaineOuverture = prochaine heure d'ouverture strictement après l'instant donné :
//   { jour: "AAAA-MM-JJ", heure: "16h00", quand: "à 16h00" | "demain à 06h00" | "le samedi 26 décembre à 06h00" }
//   ou null si aucune ouverture n'est prévue dans les 60 prochains jours.
function getStatutBoutique(date = new Date(), horaires = HORAIRES, fermetures = FERMETURES_EXCEPTIONNELLES) {
  const { jour, minutes } = heureBoutique(date, horaires.fuseau);
  const plages = plagesEnMinutes(horaires), fermes = new Set(fermetures);
  const fermeAujourdhui = fermes.has(jour);

  let prochaineOuverture = null;
  for (let i = 0; i <= 60 && !prochaineOuverture; i++) {
    const j = ajouterJours(jour, i);
    if (fermes.has(j)) continue;
    const p = plages.find(pl => i > 0 || pl.debut > minutes);
    if (p) {
      const heure = formatHeure(p.debut);
      const quand = i === 0 ? `à ${heure}` : i === 1 ? `demain à ${heure}` : `le ${nomDuJour(j)} à ${heure}`;
      prochaineOuverture = { jour: j, heure, quand };
    }
  }

  if (fermeAujourdhui) {
    const msg = prochaineOuverture ? `Fermé aujourd'hui · réouverture ${prochaineOuverture.quand}` : "Fermé aujourd'hui";
    return { etat: 'ferme', message: msg, prochaineOuverture };
  }
  const enCours = plages.find(p => minutes >= p.debut && minutes < p.fin);
  if (enCours) {
    const reste = enCours.fin - minutes;
    if (reste <= MINUTES_FERME_BIENTOT) return { etat: 'ferme_bientot', message: `Ouvert · ferme dans ${reste} min`, prochaineOuverture };
    return { etat: 'ouvert', message: `Ouvert · jusqu'à ${formatHeure(enCours.fin)}`, prochaineOuverture };
  }
  if (!prochaineOuverture) return { etat: 'ferme', message: 'Fermé', prochaineOuverture };
  // Même jour : avant la première plage → « ouvre à », entre deux plages → « réouverture à ».
  const avantPremiere = prochaineOuverture.jour === jour && minutes < plages[0].debut;
  const msg = prochaineOuverture.jour === jour
    ? (avantPremiere ? `Fermé · ouvre ${prochaineOuverture.quand}` : `Fermé · réouverture ${prochaineOuverture.quand}`)
    : `Fermé · ouvre ${prochaineOuverture.quand}`;
  return { etat: 'ferme', message: msg, prochaineOuverture };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HORAIRES, FERMETURES_EXCEPTIONNELLES, hhmmEnMinutes, formatHeure, plagesEnMinutes, heureBoutique, getStatutBoutique };
}

// ---------- Partie 2 : affichage sur la page ----------
(function () {
  if (typeof document === 'undefined') return;
  const CLE_BANDEAU = 'lekadior-bandeau-ferme-masque';

  // Test en local uniquement : ?simuler=13:40 remplace l'heure réelle (ignoré en ligne).
  function instantCourant() {
    const local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const sim = local && /^([01]\d|2[0-3]):([0-5]\d)$/.exec(new URLSearchParams(location.search).get('simuler') || '');
    if (!sim) return new Date();
    const { jour } = heureBoutique(new Date());
    const [y, m, d] = jour.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, +sim[1], +sim[2])); // Dakar = UTC+0
  }

  function bandeauMasque() { try { return sessionStorage.getItem(CLE_BANDEAU) === '1'; } catch (e) { return false; } }
  function masquerBandeau() { try { sessionStorage.setItem(CLE_BANDEAU, '1'); } catch (e) { /* stockage indisponible : masqué jusqu'au rechargement */ } }

  let dernierEtat = null, bandeauFermeIci = false;

  // Met le texte d'une pastille à jour. Une zone role="status" n'est annoncée que si l'état change :
  // pour un simple changement de minute (ou le premier affichage), l'annonce est coupée le temps de la mise à jour.
  function majPastille(el, statut, annoncer) {
    el.dataset.etat = statut.etat;
    el.hidden = false;
    if (el.textContent === statut.message) return;
    const live = el.getAttribute('aria-live');
    if (live && !annoncer) {
      el.setAttribute('aria-live', 'off');
      el.textContent = statut.message;
      setTimeout(() => el.setAttribute('aria-live', live), 500);
    } else el.textContent = statut.message;
  }

  function rafraichir() {
    const statut = getStatutBoutique(instantCourant());
    const change = dernierEtat !== null && dernierEtat !== statut.etat;
    document.querySelectorAll('[data-statut-boutique]').forEach(el => majPastille(el, statut, change));
    dernierEtat = statut.etat;

    const ferme = statut.etat === 'ferme';
    const bandeau = document.querySelector('.bandeau-ferme');
    if (bandeau) {
      const reouv = statut.prochaineOuverture ? ` Réouverture ${statut.prochaineOuverture.quand}.` : '';
      bandeau.querySelector('.bandeau-ferme-texte').textContent = `Nous sommes actuellement fermés.${reouv} Vous pouvez quand même commander : nous répondons à la réouverture.`;
      bandeau.hidden = !ferme || bandeauFermeIci || bandeauMasque();
    }
    const ligne = document.querySelector('.cart-ferme');
    if (ligne) ligne.hidden = !ferme;
  }

  function demarrer() {
    const bandeau = document.querySelector('.bandeau-ferme');
    if (bandeau) bandeau.querySelector('.bandeau-ferme-close').addEventListener('click', () => {
      bandeauFermeIci = true; masquerBandeau(); bandeau.hidden = true;
    });
    rafraichir();
    setInterval(rafraichir, 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') rafraichir(); });
  }
  // Attendre la fin du chargement des scripts : la ligne du panier est créée par cart.js.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
