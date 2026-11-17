// ===== GÂTEAU SUR MESURE : demande envoyée sur WhatsApp =====
// Partie 1 : fonctions pures (aucun accès à la page), utilisables dans Node (module.exports) pour les tests.
// Partie 2 : formulaire #cakeForm de la page (navigateur uniquement).

const CAKE_OCCASIONS = ['Anniversaire', 'Mariage', 'Baptême', 'Fête ou événement', 'Autre'];
const CAKE_GUESTS = ['Moins de 10', '10 à 20', '20 à 40', '40 à 80', 'Plus de 80'];
const CAKE_THEME_MAX = 300, CAKE_NAME_MAX = 80;

// Date de demain à Dakar (Africa/Dakar), au format du champ date : "2026-11-18".
function cakeTomorrow(date = new Date()) {
  let y, m, d;
  try {
    const parts = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Dakar', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(date).forEach(p => { parts[p.type] = p.value; });
    y = +parts.year; m = +parts.month; d = +parts.day;
  } catch (e) { // fuseau indisponible : Dakar est à UTC+0 toute l'année
    y = date.getUTCFullYear(); m = date.getUTCMonth() + 1; d = date.getUTCDate();
  }
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

// "2026-11-22" → "Samedi 22 novembre 2026" ; chaîne vide si la date n'est pas valide.
function cakeDateLabel(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return '';
  const day = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (day.getUTCDate() !== +m[3] || day.getUTCMonth() !== +m[2] - 1) return ''; // ex. 31/02
  const txt = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(day);
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

const cakeClean = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();

// Erreurs des champs obligatoires. minDate : première date acceptée ("AAAA-MM-JJ", demain à Dakar).
// Renvoie { champ: message } ; un objet vide signifie que la demande peut partir.
function cakeErrors(req, minDate) {
  const err = {};
  if (!CAKE_OCCASIONS.includes(req.occasion)) err.occasion = "Choisissez l'occasion.";
  if (!req.date) err.date = 'Choisissez la date souhaitée.';
  else if (!cakeDateLabel(req.date) || req.date < minDate) err.date = 'Choisissez une date à partir de demain.';
  if (!CAKE_GUESTS.includes(req.guests)) err.guests = 'Indiquez le nombre de personnes.';
  const name = cakeClean(req.name);
  if (name.length < 2) err.name = 'Indiquez votre nom (2 caractères minimum).';
  else if (name.length > CAKE_NAME_MAX) err.name = `Votre nom ne doit pas dépasser ${CAKE_NAME_MAX} caractères.`;
  // Même règle que le panier : 9 à 15 chiffres une fois les espaces et signes retirés.
  const digits = cakeClean(req.phone).replace(/\D/g, '');
  if (!cakeClean(req.phone)) err.phone = 'Indiquez votre numéro de téléphone.';
  else if (digits.length < 9 || digits.length > 15) err.phone = 'Numéro incomplet : au moins 9 chiffres (ex. 77 123 45 67).';
  return err;
}

// req = { occasion, date: "AAAA-MM-JJ", guests, theme, name, phone }
// Renvoie le texte brut du message (non encodé), sans ligne vide ; la ligne « Thème / message » est omise si vide.
function buildCakeMessage(req) {
  const theme = cakeClean(req.theme).slice(0, CAKE_THEME_MAX);
  const lines = [
    'Bonjour Le Kadior, je souhaite un gâteau sur mesure :',
    `Occasion : ${cakeClean(req.occasion)}`,
    `Date souhaitée : ${cakeDateLabel(req.date) || cakeClean(req.date)}`,
    `Nombre de personnes : ${cakeClean(req.guests)}`
  ];
  if (theme) lines.push(`Thème / message : ${theme}`);
  lines.push(`Nom : ${cakeClean(req.name)}`, `Téléphone : ${cakeClean(req.phone)}`, "Je vous enverrai une photo d'inspiration ici si besoin.");
  return lines.join('\n');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAKE_OCCASIONS, CAKE_GUESTS, cakeTomorrow, cakeDateLabel, cakeErrors, buildCakeMessage };
}

// ---------- Partie 2 : formulaire de la page ----------
(function () {
  if (typeof document === 'undefined') return;
  const form = document.getElementById('cakeForm');
  if (!form) return;
  const number = typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : '221784666259';
  const el = name => form.elements[name];
  const sendBtn = form.querySelector('.cake-send'), missingBox = form.querySelector('.cake-missing');
  const successBox = form.querySelector('.cake-success'), countBox = form.querySelector('.cake-count');
  const LABELS = { occasion: 'occasion', date: 'date', guests: 'nombre de personnes', name: 'nom', phone: 'téléphone' };
  const touched = new Set();
  let minDate = cakeTomorrow();

  // Date minimale = demain à Dakar, recalculée quand on revient sur le champ (la page peut rester ouverte longtemps).
  const refreshMin = () => { minDate = cakeTomorrow(); el('date').min = minDate; };
  const request = () => ({ occasion: el('occasion').value, date: el('date').value, guests: el('guests').value, theme: el('theme').value, name: el('name').value, phone: el('phone').value });

  function validate() {
    const err = cakeErrors(request(), minDate);
    form.querySelectorAll('.cake-field[data-field]').forEach(f => {
      const key = f.dataset.field, box = f.querySelector('.field-error');
      if (!box) return;
      const show = touched.has(key) && !!err[key];
      f.classList.toggle('invalid', show);
      box.hidden = !show; box.textContent = show ? err[key] : '';
      f.querySelector('input, select').setAttribute('aria-invalid', String(show));
    });
    const missing = Object.keys(err).map(k => LABELS[k]);
    sendBtn.disabled = missing.length > 0;
    missingBox.textContent = missing.length ? `Pour envoyer, complétez : ${missing.join(', ')}.` : '';
    countBox.textContent = `${el('theme').value.length} / ${CAKE_THEME_MAX}`;
  }

  form.addEventListener('input', e => { if (e.target.name) touched.add(e.target.name); successBox.hidden = true; validate(); });
  form.addEventListener('focusout', e => { if (e.target.name) { touched.add(e.target.name); validate(); } });
  el('date').addEventListener('focus', () => { refreshMin(); validate(); });

  // Envoi : WhatsApp est ouvert directement pendant le clic (sinon le navigateur bloque la fenêtre).
  form.addEventListener('submit', e => {
    e.preventDefault();
    refreshMin(); validate();
    if (sendBtn.disabled) { Object.keys(LABELS).forEach(k => touched.add(k)); validate(); return; }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(buildCakeMessage(request()))}`;
    const win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch (err) { /* rien */ } }
    else location.href = url; // fenêtre bloquée : WhatsApp s'ouvre dans l'onglet courant
    successBox.hidden = false;
  });

  // Boutons « Demander un devis » du catalogue : l'occasion est présélectionnée si elle est indiquée.
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href="#gateau-sur-mesure"][data-occasion]');
    if (link && !el('occasion').value && CAKE_OCCASIONS.includes(link.dataset.occasion)) { el('occasion').value = link.dataset.occasion; touched.add('occasion'); validate(); }
  });

  refreshMin(); validate();
})();
