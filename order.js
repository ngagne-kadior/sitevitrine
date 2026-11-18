// ===== COMMANDE : fonctions pures (aucun accès à la page) =====
// Utilisables dans le navigateur (variables globales) et dans Node (module.exports) pour les tests.

// Prix fixe d'un produit : "150 FCFA" → 150. "Sur devis", "Prix sur demande", "À partir de 8 000 FCFA" → null.
// Seuls les prix fixes comptent dans le total.
function fixedPrice(priceLabel) {
  const m = String(priceLabel || '').trim().match(/^(\d[\d\s]*)\s*FCFA$/i);
  return m ? Number(m[1].replace(/\D/g, '')) : null;
}

// 1800 → "1 800 FCFA" (espace simple comme séparateur des milliers, lisible dans WhatsApp).
function formatFCFA(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
}

// Total des seuls articles à prix fixe, et indication de la présence d'articles à prix à confirmer.
function orderTotals(items) {
  let total = 0, hasFixed = false, hasUnpriced = false;
  items.forEach(it => {
    if (typeof it.unitPrice === 'number') { total += it.unitPrice * it.qty; hasFixed = true; }
    else hasUnpriced = true;
  });
  return { total, hasFixed, hasUnpriced };
}

// order = {
//   items: [{ name, qty, unitPrice }]   unitPrice : nombre (prix fixe) ou null (prix à confirmer)
//   mode: 'retrait' | 'livraison', address, time, name, phone
// }
// Renvoie le texte brut du message (non encodé). Aucune ligne n'est écrite pour un champ vide.
function buildOrderMessage(order) {
  const clean = v => String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
  const items = (order.items || []).filter(it => it && it.qty > 0);
  const lines = ['Bonjour Le Kadior, je souhaite commander :'];
  items.forEach(it => {
    const price = typeof it.unitPrice === 'number' ? formatFCFA(it.unitPrice) : 'prix à confirmer';
    lines.push(`- ${it.qty} x ${clean(it.name)} (${price})`);
  });
  const { total, hasFixed } = orderTotals(items);
  if (hasFixed) lines.push(`Total (prix fixes) : ${formatFCFA(total)}`);
  if (order.mode === 'livraison') {
    lines.push('Mode : Livraison à domicile');
    if (clean(order.address)) lines.push(`Adresse : ${clean(order.address)}`);
  } else {
    lines.push('Mode : Retrait en boutique');
  }
  if (clean(order.time)) lines.push(`Heure souhaitée : ${clean(order.time)}`);
  if (clean(order.name)) lines.push(`Nom : ${clean(order.name)}`);
  if (clean(order.phone)) lines.push(`Téléphone : ${clean(order.phone)}`);
  return lines.join('\n');
}

// ===== JOUR ET HEURE SOUHAITÉS (heure de Dakar) =====
// Créneaux de 30 minutes dans les horaires d'ouverture, exprimés en minutes depuis minuit.
// Les plages viennent de HORAIRES (horaires.js, chargé avant ce fichier) : matin 06h00 → 14h00, soir 16h00 → 23h00.
const SHOP_HOURS = typeof HORAIRES !== 'undefined' ? HORAIRES : require('./horaires.js').HORAIRES;
const [MORNING_SLOTS, EVENING_SLOTS] = SHOP_HOURS.plages.map(p => {
  const [dh, dm] = p.debut.split(':').map(Number), [fh, fm] = p.fin.split(':').map(Number), slots = [];
  for (let m = dh * 60 + dm; m <= fh * 60 + fm; m += 30) slots.push(m);
  return slots;
});
const ALL_SLOTS = MORNING_SLOTS.concat(EVENING_SLOTS);
const SLOT_MARGIN = 30; // pour aujourd'hui : on masque les créneaux passés et ceux des 30 prochaines minutes

// 390 → "06h30"
function formatSlot(minutes) {
  return String(Math.floor(minutes / 60)).padStart(2, '0') + 'h' + String(minutes % 60).padStart(2, '0');
}

// Date et heure actuelles à Dakar (Africa/Dakar), quelle que soit l'heure réglée sur l'appareil.
function dakarNow(date = new Date()) {
  try {
    const parts = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: SHOP_HOURS.fuseau, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date).forEach(p => { parts[p.type] = p.value; });
    return { y: +parts.year, m: +parts.month, d: +parts.day, minutes: (+parts.hour % 24) * 60 + +parts.minute };
  } catch (e) {
    // Fuseau indisponible : Dakar est à UTC+0 toute l'année, sans heure d'été.
    return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate(), minutes: date.getUTCHours() * 60 + date.getUTCMinutes() };
  }
}

// Liste des jours proposés : Aujourd'hui, Demain, puis les 5 jours suivants ("Jeudi 20/11").
// Chaque jour : { value: "2026-11-20" (date absolue, sauvegardable), label, slots: [minutes…] }.
// Aujourd'hui n'apparaît que s'il reste au moins un créneau à plus de 30 minutes.
function scheduleDays(date = new Date()) {
  const now = dakarNow(date), days = [];
  const weekday = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', timeZone: 'UTC' });
  for (let i = 0; i < 7; i++) {
    const day = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const dd = String(day.getUTCDate()).padStart(2, '0'), mm = String(day.getUTCMonth() + 1).padStart(2, '0');
    const name = weekday.format(day);
    const label = i === 0 ? "Aujourd'hui" : i === 1 ? 'Demain' : `${name.charAt(0).toUpperCase()}${name.slice(1)} ${dd}/${mm}`;
    const slots = i === 0 ? ALL_SLOTS.filter(s => s > now.minutes + SLOT_MARGIN) : ALL_SLOTS.slice();
    if (slots.length) days.push({ value: `${day.getUTCFullYear()}-${mm}-${dd}`, label, slots });
  }
  return days;
}

// Texte envoyé dans le champ `time` de la commande : "Aujourd'hui à 18h30", "Jeudi 20/11 à 07h00".
// Vide si l'heure est « Peu importe » ou si le créneau n'est plus proposé.
function scheduleText(days, dayValue, slot) {
  const day = days.find(d => d.value === dayValue), minutes = slot === '' || slot == null ? NaN : Number(slot);
  if (!day || !day.slots.includes(minutes)) return '';
  return `${day.label} à ${formatSlot(minutes)}`;
}

// Lien WhatsApp complet avec le message encodé.
function buildWhatsappUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fixedPrice, formatFCFA, orderTotals, buildOrderMessage, buildWhatsappUrl, MORNING_SLOTS, EVENING_SLOTS, formatSlot, dakarNow, scheduleDays, scheduleText };
}
