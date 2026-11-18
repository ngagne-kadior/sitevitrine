// Tests de getStatutBoutique (horaires.js). Lancer : node tests/horaires.test.js
// Dakar est à UTC+0 : 2026-11-18T13:35:00Z = 13h35 à Dakar.
const { getStatutBoutique, HORAIRES } = require('../horaires.js');
const { MORNING_SLOTS, EVENING_SLOTS } = require('../order.js');

const cas = [
  ['05:30', 'ferme', 'Fermé · ouvre à 06h00'],
  ['06:00', 'ouvert', "Ouvert · jusqu'à 14h00"],
  ['13:35', 'ferme_bientot', 'Ouvert · ferme dans 25 min'],
  ['14:00', 'ferme', 'Fermé · réouverture à 16h00'],
  ['15:59', 'ferme', 'Fermé · réouverture à 16h00'],
  ['16:00', 'ouvert', "Ouvert · jusqu'à 23h00"],
  ['22:40', 'ferme_bientot', 'Ouvert · ferme dans 20 min'],
  ['23:00', 'ferme', 'Fermé · ouvre demain à 06h00'],
  ['23:30', 'ferme', 'Fermé · ouvre demain à 06h00'],
  ['00:15', 'ferme', 'Fermé · ouvre à 06h00']
];

let echecs = 0;
function verifier(nom, attendu, obtenu) {
  const ok = attendu.etat === obtenu.etat && attendu.message === obtenu.message;
  if (!ok) echecs++;
  console.log(`${ok ? 'OK   ' : 'ÉCHEC'} ${nom.padEnd(26)} attendu: ${attendu.etat} « ${attendu.message} »  |  obtenu: ${obtenu.etat} « ${obtenu.message} »`);
}

for (const [h, etat, message] of cas) {
  verifier(h, { etat, message }, getStatutBoutique(new Date(`2026-11-18T${h}:00Z`)));
}

// Jour de fermeture exceptionnelle (liste passée en paramètre, comme FERMETURES_EXCEPTIONNELLES).
verifier('2026-12-25 10:00 (fermé)', { etat: 'ferme', message: "Fermé aujourd'hui · réouverture demain à 06h00" },
  getStatutBoutique(new Date('2026-12-25T10:00:00Z'), HORAIRES, ['2026-12-25']));
// Veille d'un jour fermé, après 23h00 : on saute le jour fermé.
verifier('2026-12-24 23:30 (veille)', { etat: 'ferme', message: 'Fermé · ouvre le samedi 26 décembre à 06h00' },
  getStatutBoutique(new Date('2026-12-24T23:30:00Z'), HORAIRES, ['2026-12-25']));

// Les créneaux du panier n'ont pas changé (anciennes valeurs écrites en dur).
const ancien = (a, b) => { const r = []; for (let m = a; m <= b; m += 30) r.push(m); return r; };
const memes = JSON.stringify(MORNING_SLOTS) === JSON.stringify(ancien(360, 840)) && JSON.stringify(EVENING_SLOTS) === JSON.stringify(ancien(960, 1380));
if (!memes) echecs++;
console.log(`${memes ? 'OK   ' : 'ÉCHEC'} créneaux du panier identiques (06h00→14h00, 16h00→23h00 par 30 min)`);

console.log(echecs ? `\n${echecs} échec(s)` : '\nTous les tests passent.');
process.exitCode = echecs ? 1 : 0;
