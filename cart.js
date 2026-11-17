// ===== PANIER : une seule commande WhatsApp pour tous les produits =====
// Dépend de : order.js (buildOrderMessage, fixedPrice, formatFCFA, orderTotals, buildWhatsappUrl)
// et script.js (products, WHATSAPP_NUMBER). Chargé après ces deux fichiers.
const CART_KEY = 'lekadior-panier-v1';
const MAX_QTY = 50; // quantité maximale par ligne (un panier déjà enregistré au-delà est ramené à 50)
const productById = id => products.find(p => p.id === id);
const lineKey = (id, option) => id + (option ? '::' + option.label : '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- Données du panier (localStorage, chaque accès protégé) ----------
// Une ligne = { id, qty, option } ; option = { label, price } ou null (types de parts, voir `options` dans script.js).
function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(data)) return [];
    return data
      .filter(l => l && productById(l.id) && Number.isInteger(l.qty) && l.qty > 0)
      .map(l => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY), option: l.option && l.option.label ? { label: String(l.option.label), price: String(l.option.price || '') } : null }));
  } catch (e) { return []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* stockage indisponible : le panier reste en mémoire */ }
}
let cart = loadCart();

// Vue d'une ligne : nom affiché, libellé de prix et prix fixe éventuel.
function lineView(l) {
  const p = productById(l.id), priceLabel = l.option ? l.option.price : p.price;
  return { name: p.name + (l.option ? ' — ' + l.option.label : ''), priceLabel, unitPrice: fixedPrice(priceLabel), qty: l.qty };
}

// Point d'entrée unique utilisé par toutes les cartes (catalogue, produits phares, encarts, galerie).
function addToCart(id, qty = 1, option = null) {
  if (!productById(id)) return;
  qty = Math.max(1, Math.floor(qty) || 1);
  const key = lineKey(id, option), line = cart.find(l => lineKey(l.id, l.option) === key);
  if (line) line.qty = Math.min(MAX_QTY, line.qty + qty);
  else cart.push({ id, qty: Math.min(MAX_QTY, qty), option: option ? { label: option.label, price: option.price } : null });
  saveCart(); renderCart(); bumpFab();
}
// Quantité d'une ligne du panneau : toujours entre 1 et MAX_QTY (retirer une ligne passe par removeLine).
function setLineQty(index, qty) {
  if (!cart[index]) return;
  cart[index].qty = Math.min(MAX_QTY, Math.max(1, qty));
  saveCart(); renderCart();
}
function removeLine(index) {
  if (!cart[index]) return;
  cart.splice(index, 1);
  saveCart(); renderCart();
}
function clearCart() { cart = []; saveCart(); renderCart(); }

// ---------- Bouton « Ajouter au panier » des cartes (la quantité se règle dans le panneau) ----------
document.querySelectorAll('.cart-ctrl[data-id]').forEach(box => {
  const p = productById(box.dataset.id);
  if (!p) { box.remove(); return; }
  box.innerHTML = `<button class="add-btn" type="button" aria-label="Ajouter au panier : ${esc(p.name)}"><svg class="icon" aria-hidden="true"><use href="#i-cart"/></svg><span>Ajouter au panier</span></button>`;
});
// Un clic = 1 unité de plus (le panier ne s'ouvre pas tout seul ; le badge se met à jour aussitôt).
document.addEventListener('click', e => {
  const add = e.target.closest('.cart-ctrl[data-id] .add-btn');
  if (!add) return;
  addToCart(add.closest('.cart-ctrl').dataset.id, 1);
  flashAdded(add);
});
// Retour visuel bref sur le bouton cliqué.
function flashAdded(btn) {
  const label = btn.querySelector('span');
  if (!label) return;
  if (!btn.dataset.label) btn.dataset.label = label.textContent;
  clearTimeout(btn._flash);
  btn.classList.add('is-added'); label.textContent = 'Ajouté ✓';
  btn._flash = setTimeout(() => { btn.classList.remove('is-added'); label.textContent = btn.dataset.label; }, 1500);
}

// ---------- Bouton flottant et panneau ----------
const DELIVERY_NOTE = 'Livraison à Mbour et environs. Tarif et délai confirmés sur WhatsApp selon votre adresse.';
document.body.insertAdjacentHTML('beforeend', `
<button class="cart-fab" type="button" aria-haspopup="dialog" hidden><svg class="icon" aria-hidden="true"><use href="#i-cart"/></svg><span>Mon panier (<b class="cart-count">0</b>)</span></button>
<div class="cart-overlay" hidden></div>
<aside class="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle" hidden>
  <div class="cart-head"><h2 id="cartTitle">Mon panier</h2><button class="cart-close" type="button" aria-label="Fermer le panier">&times;</button></div>
  <div class="cart-scroll">
    <div class="cart-success" role="status" hidden><b>✅ Votre commande est prête dans WhatsApp.</b><span>Vérifiez le message puis appuyez sur Envoyer dans WhatsApp pour nous la transmettre.</span></div>
    <p class="cart-empty">Votre panier est vide. Ajoutez des produits depuis le catalogue.</p>
    <ul class="cart-lines"></ul>
    <div class="cart-summary"><div class="cart-total"><span>Total (prix fixes)</span><strong></strong></div><p class="cart-unpriced" hidden>Les articles marqués « prix à confirmer » seront chiffrés sur WhatsApp.</p></div>
    <form class="cart-form" novalidate>
      <fieldset class="cart-mode"><legend>Mode de réception</legend>
        <label><input type="radio" name="mode" value="retrait" checked><span>Retrait en boutique</span></label>
        <label><input type="radio" name="mode" value="livraison"><span>Livraison à domicile</span></label>
      </fieldset>
      <label class="rf-field cart-field" data-field="address" hidden><span>Adresse de livraison <em>*</em></span><input type="text" name="address" autocomplete="street-address" placeholder="Quartier, rue, point de repère"><small class="field-error" hidden></small></label>
      <fieldset class="cart-when"><legend>Heure souhaitée <small>(facultatif)</small></legend>
        <div class="cart-when-grid">
          <label class="rf-field cart-field"><span>Jour</span><select name="day"></select></label>
          <label class="rf-field cart-field"><span>Heure</span><select name="slot"></select></label>
        </div>
      </fieldset>
      <label class="rf-field cart-field" data-field="name"><span>Nom <em>*</em></span><input type="text" name="name" autocomplete="name"><small class="field-error" hidden></small></label>
      <label class="rf-field cart-field" data-field="phone"><span>Téléphone <em>*</em></span><input type="tel" name="phone" autocomplete="tel" placeholder="Ex. 77 123 45 67"><small class="field-error" hidden></small></label>
      <button class="btn cart-send" type="submit" disabled><svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg>Envoyer ma commande sur WhatsApp</button>
      <p class="cart-missing" aria-live="polite"></p>
      <p class="cart-note">${DELIVERY_NOTE}</p>
    </form>
  </div>
</aside>`);
const fab = document.querySelector('.cart-fab'), overlay = document.querySelector('.cart-overlay'), panel = document.querySelector('.cart-panel');
const linesBox = panel.querySelector('.cart-lines'), form = panel.querySelector('.cart-form'), sendBtn = panel.querySelector('.cart-send');
const successBox = panel.querySelector('.cart-success');
let lastFocus = null;

function openCart() {
  lastFocus = document.activeElement;
  fillSchedule({ day: form.elements.day.value, slot: form.elements.slot.value }); // créneaux recalculés à chaque ouverture
  panel.hidden = false; overlay.hidden = false; document.body.classList.add('modal-open', 'cart-open');
  panel.querySelector('.cart-close').focus();
}
function closeCart() {
  if (panel.hidden) return;
  panel.hidden = true; overlay.hidden = true; document.body.classList.remove('modal-open', 'cart-open');
  successBox.hidden = true;
  if (lastFocus && document.contains(lastFocus) && !lastFocus.hidden) lastFocus.focus();
}
function bumpFab() { fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump'); }
fab.addEventListener('click', openCart);
overlay.addEventListener('click', closeCart);
panel.querySelector('.cart-close').addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closeCart(); });

// Lignes du panier : − / + (de 1 à MAX_QTY) et suppression.
// Sélecteur de quantité : uniquement dans le panneau du panier.
const qtyHTML = (val, name) => `<div class="qty" role="group" aria-label="Quantité : ${esc(name)}"><button class="qty-btn" type="button" data-step="-1" aria-label="Diminuer la quantité"${val <= 1 ? ' disabled' : ''}>−</button><span class="qty-val" aria-live="polite">${val}</span><button class="qty-btn" type="button" data-step="1" aria-label="Augmenter la quantité"${val >= MAX_QTY ? ' disabled' : ''}>+</button></div>`;
linesBox.addEventListener('click', e => {
  const li = e.target.closest('.cart-line'); if (!li) return;
  const i = Number(li.dataset.index), step = e.target.closest('.qty-btn');
  if (step) {
    const stepIndex = [...li.querySelectorAll('.qty-btn')].indexOf(step);
    setLineQty(i, cart[i].qty + Number(step.dataset.step));
    // Le panneau est redessiné : on garde le focus sur le même bouton (ou son voisin s'il vient d'être désactivé).
    const btns = linesBox.querySelectorAll(`.cart-line[data-index="${i}"] .qty-btn`);
    const next = btns[stepIndex] && !btns[stepIndex].disabled ? btns[stepIndex] : btns[1 - stepIndex];
    if (next) next.focus();
  } else if (e.target.closest('.cart-remove')) removeLine(i);
});

function renderCart() {
  const views = cart.map(lineView), count = views.reduce((n, v) => n + v.qty, 0);
  fab.hidden = count === 0;
  fab.querySelector('.cart-count').textContent = count;
  fab.setAttribute('aria-label', `Mon panier : ${count} article${count > 1 ? 's' : ''}`);
  panel.querySelector('.cart-empty').hidden = count > 0;
  panel.querySelector('.cart-summary').hidden = count === 0;
  linesBox.innerHTML = views.map((v, i) => {
    const fixed = typeof v.unitPrice === 'number';
    return `<li class="cart-line" data-index="${i}"><div class="cart-line-info"><b>${esc(v.name)}</b><small>${fixed ? formatFCFA(v.unitPrice) + ' l’unité' : 'Prix à confirmer'}</small></div>${qtyHTML(v.qty, v.name)}${fixed ? `<strong class="cart-line-sum">${formatFCFA(v.unitPrice * v.qty)}</strong>` : ''}<button class="cart-remove" type="button" aria-label="Supprimer ${esc(v.name)}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button></li>`;
  }).join('');
  const t = orderTotals(views);
  panel.querySelector('.cart-total strong').textContent = t.hasFixed ? formatFCFA(t.total) : 'prix à confirmer';
  panel.querySelector('.cart-unpriced').hidden = !(t.hasFixed && t.hasUnpriced);
  validate();
}

// ---------- Formulaire : validation en direct ----------
const touched = new Set();
const val = name => form.elements[name].value.trim();
const mode = () => form.elements.mode.value;
function fieldErrors() {
  const err = {};
  if (mode() === 'livraison' && val('address').length < 4) err.address = 'Indiquez votre adresse de livraison (quartier, rue, point de repère).';
  if (val('name').length < 2) err.name = 'Indiquez votre nom.';
  const digits = val('phone').replace(/\D/g, '');
  if (!val('phone')) err.phone = 'Indiquez votre numéro de téléphone.';
  else if (digits.length < 9 || digits.length > 15) err.phone = 'Numéro incomplet : au moins 9 chiffres (ex. 77 123 45 67).';
  return err;
}
const FIELD_NAMES = { address: 'adresse', name: 'nom', phone: 'téléphone' };
function validate() {
  const err = fieldErrors();
  panel.querySelectorAll('.cart-field[data-field]').forEach(f => {
    const key = f.dataset.field, box = f.querySelector('.field-error');
    if (!box) return;
    const show = touched.has(key) && err[key] && !f.hidden;
    f.classList.toggle('invalid', !!show);
    box.hidden = !show; box.textContent = show ? err[key] : '';
    f.querySelector('input').setAttribute('aria-invalid', String(!!show));
  });
  const empty = cart.length === 0, missing = Object.keys(err).map(k => FIELD_NAMES[k]);
  sendBtn.disabled = empty || missing.length > 0;
  panel.querySelector('.cart-missing').textContent = empty ? 'Ajoutez au moins un produit pour commander.'
    : missing.length ? `Pour envoyer, complétez : ${missing.join(', ')}.` : '';
}
function showAddress() {
  const delivery = mode() === 'livraison';
  panel.querySelector('[data-field="address"]').hidden = !delivery; form.elements.address.required = delivery;
}
form.addEventListener('input', e => {
  if (e.target.name === 'mode') showAddress();
  else if (e.target.name === 'day') fillSlots(currentDays.find(d => d.value === e.target.value), form.elements.slot.value);
  else if (e.target.name) touched.add(e.target.name);
  successBox.hidden = true;
  validate();
  saveDraft();
});
form.addEventListener('focusout', e => { if (e.target.name && e.target.name !== 'mode') { touched.add(e.target.name); validate(); } });

// ---------- Jour et heure souhaités (listes déroulantes, heure de Dakar : voir order.js) ----------
let currentDays = [];
const SLOT_GROUPS = [['Matin (06h00 - 14h00)', MORNING_SLOTS], ['Soir (16h00 - 23h00)', EVENING_SLOTS]];
// Reconstruit la liste des jours ; garde le jour et l'heure voulus s'ils sont encore proposés, sinon « Peu importe ».
function fillSchedule(want = {}) {
  currentDays = scheduleDays(new Date());
  const daySel = form.elements.day, matched = currentDays.find(d => d.value === want.day);
  daySel.innerHTML = currentDays.map(d => `<option value="${d.value}">${esc(d.label)}</option>`).join('');
  daySel.value = (matched || currentDays[0]).value;
  fillSlots(matched || currentDays[0], matched ? want.slot : '');
}
function fillSlots(day, wantSlot) {
  const slotSel = form.elements.slot;
  if (!day) { slotSel.innerHTML = '<option value="">Peu importe</option>'; return; }
  slotSel.innerHTML = '<option value="">Peu importe</option>' + SLOT_GROUPS.map(([label, slots]) => {
    const opts = slots.filter(s => day.slots.includes(s));
    return opts.length ? `<optgroup label="${label}">${opts.map(s => `<option value="${s}">${formatSlot(s)}</option>`).join('')}</optgroup>` : '';
  }).join('');
  slotSel.value = scheduleText(currentDays, day.value, wantSlot) ? String(wantSlot) : '';
}

// ---------- Brouillon du formulaire (localStorage, chaque accès protégé) ----------
const DRAFT_KEY = 'lekadior-commande-v1';
function saveDraft() {
  const draft = { mode: mode(), address: form.elements.address.value, name: form.elements.name.value, phone: form.elements.phone.value, day: form.elements.day.value, slot: form.elements.slot.value };
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch (e) { /* stockage indisponible : rien n'est conservé */ }
}
function loadDraft() {
  let draft = {};
  try { draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {}; } catch (e) { draft = {}; }
  if (typeof draft !== 'object') draft = {};
  if (draft.mode === 'livraison' || draft.mode === 'retrait') form.querySelector(`input[name="mode"][value="${draft.mode}"]`).checked = true;
  for (const k of ['address', 'name', 'phone']) if (typeof draft[k] === 'string') form.elements[k].value = draft[k].slice(0, 200);
  showAddress();
  // Créneau passé ou invalide → « Peu importe » (géré par fillSchedule).
  fillSchedule({ day: typeof draft.day === 'string' ? draft.day : '', slot: typeof draft.slot === 'string' ? draft.slot : '' });
}

// ---------- Envoi ----------
function currentOrder() {
  return {
    items: cart.map(lineView).map(v => ({ name: v.name, qty: v.qty, unitPrice: v.unitPrice })),
    mode: mode(), address: mode() === 'livraison' ? val('address') : '',
    time: scheduleText(currentDays, form.elements.day.value, form.elements.slot.value), name: val('name'), phone: val('phone')
  };
}
// Envoi de la commande. Pour l'instant : ouvre seulement WhatsApp avec le message prérempli.
// Plus tard : enregistrer la commande dans une base de données ICI, avant l'ouverture de WhatsApp.
// Attention : window.open doit être appelé directement pendant le clic (pas après un `await`),
// sinon le navigateur bloque la fenêtre. Ouvrir WhatsApp d'abord, puis enregistrer, ou enregistrer sans attendre.
function submitOrder(order) {
  const url = buildWhatsappUrl(WHATSAPP_NUMBER, buildOrderMessage(order));
  const win = window.open(url, '_blank');
  if (win) { try { win.opener = null; } catch (e) { /* rien */ } }
  else location.href = url; // fenêtre bloquée : on ouvre WhatsApp dans l'onglet courant
  return true;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  validate();
  if (sendBtn.disabled) return;
  if (submitOrder(currentOrder())) {
    clearCart();
    form.reset(); touched.clear();
    showAddress(); fillSchedule();
    validate(); saveDraft();
    successBox.hidden = false;
    panel.querySelector('.cart-scroll').scrollTop = 0;
  }
});

loadDraft();
renderCart();
