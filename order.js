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

// Lien WhatsApp complet avec le message encodé.
function buildWhatsappUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fixedPrice, formatFCFA, orderTotals, buildOrderMessage, buildWhatsappUrl };
}
