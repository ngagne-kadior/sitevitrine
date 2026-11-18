const WHATSAPP_NUMBER = "221784666259";

// Photos des produits : chaque produit a un tableau `images` de 1 à 10 photos (la première s'affiche sur la carte).
// L'ancienne forme `image:"..."` (une seule photo) reste acceptée.
// Les fichiers introuvables sont ignorés automatiquement.
const MAX_IMAGES = 10;

const products = [
  {id:"baguette",name:"Baguette",category:"Pains",price:"100 FCFA",images:["images/produits/pains/camp baguette.png"],description:"Pain frais disponible tous les jours."},
  {id:"pain-sicap",name:"Pain Sicap",category:"Pains",price:"150 FCFA",images:["images/produits/pains/pain sicap.png"],description:"Pain Sicap frais."},
  {id:"pain-double-sicap",name:"Pain Double Sicap",category:"Pains",price:"200 FCFA",images:["images/produits/pains/Double sicap.png","images/produits/pains/double sicap 1.png"],description:"Disponible selon la production."},
  {id:"pain-diabetique",name:"Pain Diabétique",category:"Pains",price:"150 FCFA",images:["images/produits/pains/pain diabetique.png"],description:"Disponible tous les jours."},
  {id:"pain-thiere",galerie:true,accroche:"Cuit chaque jour dans notre fournil.",photoAlt:"Pains thiéré dorés alignés sur une étagère en bois",name:"Pain Thiéré",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain thiere.png"],description:"Disponible tous les jours."},
  {id:"pain-mais",name:"Pain Maïs",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain Mais.png"],description:"Disponible tous les jours."},
  {id:"pain-riche",galerie:true,accroche:"Doré et moelleux, disponible tous les jours.",photoAlt:"Pains riches dorés en vitrine",name:"Pain Riche",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain riche.png"],description:"Disponible tous les jours."},
  {id:"pain-sans-sel",name:"Pain Sans sel",category:"Pains",price:"150 FCFA",images:[],description:"Sur commande, par lot de 10 pièces."},
  {id:"pain-diabetique-sans-sel",name:"Pain Diabétique Sans sel",category:"Pains",price:"150 FCFA",images:["images/produits/pains/Pain Diabétique Sans sel.png","images/produits/pains/Pain Diabétique Sans sel1.png"],description:"Sur commande, par lot de 10 pièces."},
  {id:"croissant",galerie:true,accroche:"Feuilleté, doré et croustillant.",photoAlt:"Croissant pur beurre doré et feuilleté",name:"Croissant",category:"Viennoiseries",price:"500 FCFA",images:[
    "images/produits/viennoiseries/croissant beurre 1.jfif",
    "images/produits/viennoiseries/croissant beurre 2.jfif",
    "images/produits/viennoiseries/croissant beurre 3.jfif",
    "images/produits/viennoiseries/croissant beurre bicolore à la fraise.jfif"
  ],description:"Viennoiserie fraîche et croustillante."},
  {id:"pain-au-chocolat",galerie:true,accroche:"La viennoiserie gourmande par excellence.",photoAlt:"Trois pains au chocolat empilés",name:"Pain au chocolat",category:"Viennoiseries",price:"500 FCFA",images:["images/produits/viennoiseries/Pain au chocolat.jfif","images/produits/viennoiseries/Pain au chocolate 1.jfif"],description:"Une viennoiserie gourmande."},
  {id:"pain-aux-raisins",galerie:true,accroche:"Une spirale feuilletée aux raisins.",photoAlt:"Pains aux raisins en spirale, bien dorés",name:"Pain aux raisins",category:"Viennoiseries",price:"500 FCFA",images:["images/produits/viennoiseries/pain au raisin.jfif","images/produits/viennoiseries/pain raisin.jfif","images/produits/viennoiseries/Pain Aux Raisins.jfif"],description:"Disponible selon la production."},
  {id:"palmier",name:"Palmier",category:"Viennoiseries",price:"150 FCFA",images:["images/produits/viennoiseries/palmier.jfif","images/produits/viennoiseries/palmier1.jfif","images/produits/viennoiseries/palmier 2.jfif"],description:"Feuilleté croustillant et caramélisé."},
  {id:"pain-drops",name:"Pain drops",category:"Viennoiseries",price:"700 FCFA",images:["images/produits/viennoiseries/drops 1.jfif","images/produits/viennoiseries/drops2.jfif","images/produits/viennoiseries/drops.jfif"],description:"Disponible selon la production."},
  {id:"chausson-pomme",name:"Chausson pomme",category:"Viennoiseries",price:"500 FCFA",images:["images/produits/viennoiseries/chausson pomme.jfif"],description:"Chausson feuilleté aux pommes."},
  // Sans photo pour l'instant : le bloc de secours 🥐 s'affiche. Voir images/produits/LISEZMOI.txt pour en ajouter une.
  {id:"torsade",galerie:false,name:"Torsade",category:"Viennoiseries",price:"700 FCFA",images:[],description:"Disponible selon la production."},
  {id:"roche-coco",galerie:true,accroche:"Une douceur dorée à la noix de coco.",photoAlt:"Roches à la noix de coco dorées sur une assiette",name:"Roche coco",category:"Pâtisserie",price:"100 FCFA",images:["images/produits/patisserie/Macarons à la noix de coco dorés.png"],description:"Une douceur gourmande."},
  {id:"madeleine",name:"Madeleine",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/madeleine.jfif","images/produits/patisserie/Madeleine 3.jfif","images/produits/patisserie/madeleine 2.jfif"],description:"Moelleuse et savoureuse."},
  {id:"biscuits",galerie:true,accroche:"Des sablés gourmands à la confiture.",photoAlt:"Biscuits sablés à la confiture sur un plat",name:"Biscuits",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/Biscuits sablés à la confiture.png"],description:"Biscuits Le Kadior."},
  {id:"cookies",name:"Cookies",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/cookies 3.jfif","images/produits/patisserie/cookies 2.jfif","images/produits/patisserie/Cookies.jfif"],description:"Cookies gourmands."},
  {id:"gateau-d-anniversaire",name:"Gâteau d'anniversaire",category:"Gâteaux d'anniversaire",price:"À partir de 8 000 FCFA",images:[],description:"Gâteau sur commande.",note:"Délai, taille et parfum confirmés sur WhatsApp à la commande."},
  // `options` : les types de parts et leur prix. Le visiteur choisit un type dans la galerie,
  // le prix affiché et le message WhatsApp s'adaptent. Exemple :
  //   options:[{label:"Part chocolat",price:"1 000 FCFA"},{label:"Part fraisier",price:"1 500 FCFA"}]
  {id:"part-de-gateau",galerie:true,accroche:"Une part de douceur, selon les gâteaux du jour.",photoAlt:"Assortiment de parts de gâteaux au chocolat et aux fruits rouges",name:"Part de gâteau",category:"Gâteaux d'anniversaire",price:"À partir de 1 000 FCFA",options:[],images:[
    "images/produits/gateaux/part de gateaux 1.jfif",
    "images/produits/gateaux/part de gateaux 2.jfif",
    "images/produits/gateaux/part de gateaux 3.jfif",
    "images/produits/gateaux/part de gateaux 4.png",
    "images/produits/gateaux/part de gateaux 6.jfif",
    "images/produits/gateaux/part de gateaux 7.jfif"
  ],description:"Parts disponibles selon les gâteaux."},
  {id:"gateau-personnalise",devis:true,name:"Gâteau personnalisé",category:"Gâteaux d'anniversaire",price:"Sur devis",images:[],description:"Personnalisation sur commande."},
  {id:"gateau-evenementiel",devis:true,occasion:"Fête ou événement",name:"Gâteau événementiel",category:"Gâteaux d'anniversaire",price:"Sur devis",images:[],description:"Pour vos événements et célébrations."}
];

const productImages=p=>(Array.isArray(p.images)&&p.images.length?p.images:[p.image]).filter(Boolean).slice(0,MAX_IMAGES);
const productGrid=document.getElementById('productGrid');
const searchInput=document.getElementById('searchInput');
const emptyMessage=document.getElementById('emptyMessage');
let currentFilter='Tous';
// Commande : chaque carte reçoit un bloc `.cart-ctrl` (bouton « Ajouter au panier » ; la quantité se règle dans le panier), rempli par cart.js.
// Produits `devis: true` (gâteaux sur devis) : lien « Demander un devis » vers la section #gateau-sur-mesure (gateau.js) au lieu du panier.

// Image de secours (produit sans photo, ou photos introuvables) : bloc aux couleurs du site + emoji de la catégorie.
const CATEGORY_EMOJI={"Pains":"🥖","Viennoiseries":"🥐","Pâtisserie":"🥥","Gâteaux d'anniversaire":"🎂"};
const fallbackImage=p=>`<div class="product-image product-fallback" role="img" aria-label="${p.name} — photo à venir"><span aria-hidden="true">${CATEGORY_EMOJI[p.category]||'🍞'}</span></div>`;
productGrid.innerHTML=products.map(p=>`<article class="product-card">${productImages(p).length?`<div class="product-image hidden"><img data-src="${productImages(p)[0]}" alt="${p.name} — photo du produit Le Kadior"></div>`:fallbackImage(p)}<div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${p.price}</span></div>${p.note?`<p class="price-note">${p.note}</p>`:''}${p.devis?`<div class="cart-ctrl"><a class="add-btn devis-btn" href="#gateau-sur-mesure"${p.occasion?` data-occasion="${p.occasion}"`:''} aria-label="Demander un devis : ${p.name}"><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg><span>Demander un devis</span></a></div>`:`<div class="cart-ctrl" data-id="${p.id}"></div>`}</div></article>`).join('');
const cards=[...productGrid.children];
// Photo des cartes : on garde uniquement les fichiers de `images` qui existent vraiment.
// La première photo trouvée s'affiche sur la carte ; sans aucune photo, la carte reste sans image.
function loadImage(card){
  const img=card.querySelector('img[data-src]');if(!img)return;img.removeAttribute('data-src');
  const p=products[cards.indexOf(card)],box=img.parentElement;
  Promise.all(productImages(p).map(u=>new Promise(r=>{const i=new Image();i.onload=()=>r(u);i.onerror=()=>r(null);i.src=u}))).then(found=>{
    p.gallery=found.filter(Boolean);
    if(!p.gallery.length){box.outerHTML=fallbackImage(p);return}
    img.src=p.gallery[0];box.classList.remove('hidden');card.classList.add('has-gallery');
    box.tabIndex=0;box.setAttribute('role','button');box.setAttribute('aria-label',`Voir les photos : ${p.name}`);
    if(p.gallery.length>1)box.insertAdjacentHTML('beforeend',`<span class="photo-hint"><svg class="icon"><use href="#i-camera"/></svg>Voir les photos</span><span class="photo-count">${p.gallery.length} photos</span>`);
  });
}

// Galerie (lightbox) : une seule galerie pour tout le catalogue, alimentée par les photos du produit cliqué.
const lightbox=document.createElement('div');
lightbox.className='lightbox';lightbox.hidden=true;
lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Galerie photos');
lightbox.innerHTML=`<button class="lb-close" type="button" aria-label="Fermer la galerie">&times;</button><div class="lb-stage"><button class="lb-nav lb-prev" type="button" aria-label="Photo précédente"><svg class="icon"><use href="#i-arrow"/></svg></button><img class="lb-img" alt=""><button class="lb-nav lb-next" type="button" aria-label="Photo suivante"><svg class="icon"><use href="#i-arrow"/></svg></button></div><div class="lb-options" role="group" aria-label="Choisir un type"></div><div class="lb-bar"><div class="lb-caption"><strong></strong><span></span></div><span class="lb-counter"></span><button class="btn btn-gold lb-order" type="button"><svg class="icon" aria-hidden="true"><use href="#i-cart"/></svg><span>Ajouter au panier</span></button></div><div class="lb-thumbs"></div>`;
document.body.appendChild(lightbox);
const lbImg=lightbox.querySelector('.lb-img'),lbThumbs=lightbox.querySelector('.lb-thumbs'),lbCounter=lightbox.querySelector('.lb-counter'),lbStage=lightbox.querySelector('.lb-stage');
let lbProduct=null,lbIndex=0,lbLastFocus=null,lbOption=null;
const lbOptions=lightbox.querySelector('.lb-options');
// Types et prix d'un produit (champ `options`) : le choix met à jour le prix affiché et l'article ajouté au panier.
function selectOption(i){
  const opt=(lbProduct.options||[])[i];lbOption=opt||null;
  [...lbOptions.children].forEach((b,k)=>{b.classList.toggle('active',k===i);b.setAttribute('aria-pressed',String(k===i))});
  lightbox.querySelector('.lb-caption span').textContent=opt?opt.price:lbProduct.price;
}
function showPhoto(i){
  const g=lbProduct.gallery,n=g.length;lbIndex=(i+n)%n;
  lbCounter.textContent=`${lbIndex+1} / ${n}`;lbImg.alt=`${lbProduct.name} — photo ${lbIndex+1} sur ${n}`;
  [...lbThumbs.children].forEach((t,k)=>{const on=k===lbIndex;t.classList.toggle('active',on);t.setAttribute('aria-pressed',String(on));if(on&&t.scrollIntoView)t.scrollIntoView({block:'nearest',inline:'center'})});
  const url=g[lbIndex];if(lbImg.getAttribute('src')===url)return;
  lbImg.classList.add('is-changing');
  const next=new Image();next.onload=()=>{if(g[lbIndex]!==url)return;lbImg.src=url;lbImg.classList.remove('is-changing')};next.src=url;
}
function openGallery(p,start=0){
  if(!p||!p.gallery||!p.gallery.length)return;
  lbProduct=p;lbLastFocus=document.activeElement;const many=p.gallery.length>1;
  lightbox.querySelector('.lb-caption strong').textContent=p.name;
  lbOptions.innerHTML=(p.options||[]).map(o=>`<button class="lb-option" type="button" aria-pressed="false"><b>${o.label}</b><span>${o.price}</span></button>`).join('');lbOptions.hidden=!(p.options||[]).length;
  selectOption(-1);
  lightbox.classList.toggle('is-single',!many);
  lbThumbs.innerHTML=many?p.gallery.map((u,i)=>`<button class="lb-thumb" type="button" aria-label="Photo ${i+1} sur ${p.gallery.length}"><img src="${u}" alt=""></button>`).join(''):'';
  lbImg.removeAttribute('src');lbImg.alt=p.name;
  lightbox.hidden=false;document.body.classList.add('modal-open');
  showPhoto(start);lightbox.querySelector('.lb-close').focus();
}
function closeGallery(){if(lightbox.hidden)return;lightbox.hidden=true;document.body.classList.remove('modal-open');if(lbLastFocus)lbLastFocus.focus()}
lightbox.addEventListener('click',e=>{
  const thumb=e.target.closest('.lb-thumb');
  const option=e.target.closest('.lb-option');
  if(option)selectOption([...lbOptions.children].indexOf(option));
  else if(e.target.closest('.lb-order')){addToCart(lbProduct.id,1,lbOption);flashAdded(e.target.closest('.lb-order'))}
  else if(thumb)showPhoto([...lbThumbs.children].indexOf(thumb));
  else if(e.target.closest('.lb-prev'))showPhoto(lbIndex-1);
  else if(e.target.closest('.lb-next'))showPhoto(lbIndex+1);
  else if(e.target.closest('.lb-close')||e.target===lightbox||e.target===lbStage||e.target===lbThumbs||e.target===lbOptions)closeGallery();
});
document.addEventListener('keydown',e=>{
  if(lightbox.hidden)return;
  if(e.key==='Escape')closeGallery();
  else if(lbProduct.gallery.length>1&&e.key==='ArrowRight')showPhoto(lbIndex+1);
  else if(lbProduct.gallery.length>1&&e.key==='ArrowLeft')showPhoto(lbIndex-1);
});
let lbTouchX=null;
lbStage.addEventListener('touchstart',e=>{lbTouchX=e.changedTouches[0].clientX},{passive:true});
lbStage.addEventListener('touchend',e=>{if(lbTouchX===null)return;const dx=e.changedTouches[0].clientX-lbTouchX;lbTouchX=null;if(lbProduct.gallery.length>1&&Math.abs(dx)>45)showPhoto(lbIndex+(dx<0?1:-1))},{passive:true});
productGrid.addEventListener('click',e=>{const card=e.target.closest('.product-card.has-gallery');if(card&&e.target.closest('.product-image,h3'))openGallery(products[cards.indexOf(card)])});
productGrid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.product-image')){e.preventDefault();openGallery(products[cards.indexOf(e.target.closest('.product-card'))])}});
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.filter(e=>e.isIntersecting).forEach(e=>{io.unobserve(e.target);loadImage(e.target)}),{rootMargin:'300px'});cards.forEach(c=>io.observe(c))}else cards.forEach(loadImage);
// Recherche insensible aux accents et aux majuscules : « gateau » trouve « Gâteau », « diabetique » trouve « Diabétique ».
const normalize=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function renderProducts(){const q=normalize(searchInput.value.trim());let n=0;products.forEach((p,i)=>{const ok=(currentFilter==='Tous'||p.category===currentFilter)&&(!q||normalize(p.name).includes(q)||normalize(p.category).includes(q));cards[i].classList.toggle('hidden',!ok);if(ok)n++});emptyMessage.classList.toggle('hidden',n!==0)}
function setFilter(cat){currentFilter=cat;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===cat));renderProducts();document.getElementById('catalogue').scrollIntoView({behavior:'smooth',block:'start'})}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
// Une carte catégorie efface la recherche précédente : sinon un ancien mot-clé pouvait afficher « Aucun produit trouvé ».
document.querySelectorAll('.category-card').forEach(c=>c.addEventListener('click',()=>{searchInput.value='';setFilter(c.dataset.category)}));
searchInput.addEventListener('input',renderProducts);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('.header-search').addEventListener('click',()=>{location.hash='#catalogue';syncView();document.getElementById('catalogue').scrollIntoView({block:'start'});setTimeout(()=>searchInput.focus({preventScroll:true}),700)});
document.getElementById('year').textContent=new Date().getFullYear();
const header=document.getElementById('site-header');const links=[...document.querySelectorAll('.nav a')];window.addEventListener('scroll',()=>{header.classList.toggle('is-compact',scrollY>60);let current='';links.forEach(a=>{const s=document.querySelector(a.getAttribute('href'));if(s&&s.getClientRects().length&&s.getBoundingClientRect().top<140)current=a.getAttribute('href')});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current))},{passive:true});
renderProducts();

// Vue catalogue : sur l'accueil le catalogue complet est masqué ; il s'affiche seul quand l'adresse est #catalogue
// (bouton « Voir tout le catalogue », catégories, recherche), et l'accueil revient avec n'importe quel autre lien.
let homeScroll=0;
function syncView(){
  const open=location.hash==='#catalogue',was=document.body.classList.contains('view-catalogue');
  if(open===was)return;
  if(open)homeScroll=scrollY;
  document.body.classList.toggle('view-catalogue',open);
  const target=open?null:document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(target)target.scrollIntoView({behavior:'instant',block:'start'});
  else scrollTo({top:open?0:homeScroll,behavior:'instant'});
  dispatchEvent(new Event('scroll'));
}
addEventListener('hashchange',syncView);
syncView();
document.querySelector('#produits-phares .heading-with-action .btn').addEventListener('click',()=>{searchInput.value='';setFilter('Tous')});

// Carousel des produits phares : défilement natif (tactile) + flèches précédent / suivant.
const carousel=document.querySelector('.featured-carousel'),track=carousel.querySelector('.featured-grid'),prevBtn=carousel.querySelector('.carousel-prev'),nextBtn=carousel.querySelector('.carousel-next');
function updateCarousel(){const max=track.scrollWidth-track.clientWidth;carousel.classList.toggle('is-static',max<=2);prevBtn.disabled=track.scrollLeft<=2;nextBtn.disabled=track.scrollLeft>=max-2}
const slide=dir=>track.scrollBy({left:dir*(track.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap)),behavior:'smooth'});
prevBtn.addEventListener('click',()=>slide(-1));nextBtn.addEventListener('click',()=>slide(1));
track.addEventListener('scroll',updateCarousel,{passive:true});addEventListener('resize',updateCarousel);
updateCarousel();

// Carte de localisation : centrée sur la position GPS exacte de la boulangerie (attributs data-lat / data-lng).
// Sans Leaflet (hors ligne), la fiche « Le Kadior » d'origine reste affichée à la place.
const mapEl=document.getElementById('kadiorMap');
if(mapEl&&window.L){
  const pos=[parseFloat(mapEl.dataset.lat),parseFloat(mapEl.dataset.lng)];
  mapEl.innerHTML='';
  const map=L.map(mapEl,{center:pos,zoom:17,scrollWheelZoom:false,dragging:!L.Browser.mobile});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(map);
  const pin=L.divIcon({className:'map-pin',html:'<svg viewBox="0 0 32 42" aria-hidden="true"><path d="M16 1C7.7 1 1 7.6 1 15.8 1 26.6 16 41 16 41s15-14.4 15-25.2C31 7.6 24.3 1 16 1z"/><circle cx="16" cy="16" r="5.5"/></svg>',iconSize:[32,42],iconAnchor:[16,41]});
  L.marker(pos,{icon:pin,alt:'Le Kadior',keyboard:false}).addTo(map).bindTooltip('<strong>Le Kadior</strong><small>Route de l\'Hôpital, en face Mbour FM</small>',{permanent:true,direction:'top',offset:[0,-44],className:'map-label'});
  // La section peut être masquée (vue catalogue) ou redimensionnée : la carte se recale sur le marqueur.
  if('ResizeObserver' in window)new ResizeObserver(()=>{map.invalidateSize();map.setView(pos,map.getZoom(),{animate:false})}).observe(mapEl);
}

// Mini-carte du footer : même position GPS exacte ; un clic sur la carte ouvre l'itinéraire Google Maps.
const miniEl=document.getElementById('kadiorMiniMap');
if(miniEl&&window.L){
  const pos=[parseFloat(miniEl.dataset.lat),parseFloat(miniEl.dataset.lng)],route=miniEl.parentElement.querySelector('.mini-map-link').href;
  miniEl.innerHTML='';
  const mini=L.map(miniEl,{center:pos,zoom:16,zoomControl:false,scrollWheelZoom:false,doubleClickZoom:false,keyboard:false,dragging:!L.Browser.mobile});
  mini.attributionControl.setPrefix(false);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(mini);
  const pin=L.divIcon({className:'map-pin map-pin-mini',html:'<svg viewBox="0 0 32 42" aria-hidden="true"><path d="M16 1C7.7 1 1 7.6 1 15.8 1 26.6 16 41 16 41s15-14.4 15-25.2C31 7.6 24.3 1 16 1z"/><circle cx="16" cy="16" r="5.5"/></svg>',iconSize:[22,29],iconAnchor:[11,28]});
  L.marker(pos,{icon:pin,alt:'Le Kadior',keyboard:false}).addTo(mini).bindTooltip('Le Kadior — Mbour',{permanent:true,direction:'top',offset:[0,-30],className:'map-label map-label-mini'});
  mini.on('click',()=>window.open(route,'_blank','noopener'));
  if('ResizeObserver' in window)new ResizeObserver(()=>{mini.invalidateSize();mini.setView(pos,mini.getZoom(),{animate:false})}).observe(miniEl);
}

// Diaporama « Notre univers en images » : construit uniquement à partir du tableau `products`.
// Un produit y figure s'il est marqué `galerie: true` et s'il a au moins une photo (8 au maximum).
// Nom, prix, catégorie, photo et id viennent du catalogue : un changement de prix s'y reflète aussitôt.
// `accroche` (ligne en italique) et `photoAlt` (description de la photo) sont facultatifs.
const UNIVERS_MAX = 8, UNIVERS_DELAY = 5000;
const univers = document.querySelector('.univers-slider');
if (univers) {
  const items = products.filter(p => p.galerie === true && productImages(p).length).slice(0, UNIVERS_MAX);
  const counter = univers.querySelector('.univers-counter');
  if (!items.length) univers.closest('section').hidden = true;
  univers.querySelector('.univers-prev').insertAdjacentHTML('beforebegin', items.map((p, i) => `<article class="univers-slide" role="group" aria-roledescription="diapositive" aria-label="${i + 1} sur ${items.length} : ${p.name}"><div class="univers-photo"><img ${i <= 1 || i === items.length - 1 ? 'src' : 'data-src'}="${productImages(p)[0]}" alt="${p.photoAlt || p.name}, Le Kadior, Mbour" width="800" height="600" decoding="async"></div><div class="univers-text"><span class="univers-eyebrow">${p.category.replace(" d'anniversaire", '')}</span><h3>${p.name}</h3><strong class="univers-price">${p.price}</strong>${p.accroche ? `<p>${p.accroche}</p>` : ''}<div class="cart-ctrl" data-id="${p.id}"></div></div></article>`).join(''));
  counter.querySelector('.univers-total').textContent = items.length;
  const slides = [...univers.querySelectorAll('.univers-slide')];
  // Images : la première, la suivante et la précédente sont chargées tout de suite (src) ; les autres (data-src)
  // sont préchauffées en arrière-plan une fois la page chargée, ou dès qu'on s'en approche.
  // Une image en échec reste invisible : ni icône cassée ni texte alternatif, seulement le fond brun.
  const loadSlide = i => { const img = slides[(i + slides.length) % slides.length].querySelector('img[data-src]'); if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); } };
  slides.forEach(sl => {
    const img = sl.querySelector('img'), ok = () => img.classList.add('is-loaded'), ko = () => img.classList.add('is-broken');
    img.addEventListener('load', ok); img.addEventListener('error', ko);
    if (img.getAttribute('src') && img.complete) (img.naturalWidth ? ok : ko)();
  });
  const warmAll = () => slides.forEach((sl, i) => loadSlide(i));
  const whenIdle = cb => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 3000 }) : setTimeout(cb, 1200));
  if (document.readyState === 'complete') whenIdle(warmAll); else addEventListener('load', () => whenIdle(warmAll));
  let current = 0;
  function show(i, announce) {
    const n = (i + slides.length) % slides.length;
    loadSlide(n); loadSlide(n + 1); loadSlide(n - 1);
    slides.forEach((s, k) => {
      s.classList.toggle('is-prev', k === current && k !== n);
      s.classList.toggle('is-active', k === n);
      s.setAttribute('aria-hidden', String(k !== n));
      s.inert = k !== n; // le bouton d'une diapositive cachée n'est pas atteignable au clavier
    });
    // Annonce aux lecteurs d'écran seulement quand l'utilisateur change lui-même de diapositive.
    counter.setAttribute('aria-live', announce ? 'polite' : 'off');
    counter.querySelector('.univers-current').textContent = n + 1;
    current = n;
  }

  // Lecture automatique : arrêtée au survol, au toucher, quand un élément du diaporama a le focus,
  // quand l'onglet est caché, et jamais si l'utilisateur préfère réduire les animations.
  const reduced = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const state = { hover: false, focus: false, touched: false };
  let timer = null;
  const canPlay = () => slides.length > 1 && !reduced.matches && !document.hidden && !state.hover && !state.focus && !state.touched;
  function sync() {
    clearInterval(timer); timer = null;
    if (canPlay()) timer = setInterval(() => show(current + 1, false), UNIVERS_DELAY);
    univers.classList.toggle('is-playing', !!timer);
  }
  const go = i => { show(i, true); sync(); };
  univers.querySelector('.univers-prev').addEventListener('click', () => go(current - 1));
  univers.querySelector('.univers-next').addEventListener('click', () => go(current + 1));
  univers.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(current + (e.key === 'ArrowRight' ? 1 : -1)); }
  });
  univers.addEventListener('mouseenter', () => { state.hover = true; sync(); });
  univers.addEventListener('mouseleave', () => { state.hover = false; sync(); });
  univers.addEventListener('focusin', () => { state.focus = true; sync(); });
  univers.addEventListener('focusout', e => { if (!univers.contains(e.relatedTarget)) { state.focus = false; sync(); } });
  document.addEventListener('visibilitychange', sync);
  if (reduced.addEventListener) reduced.addEventListener('change', sync);
  // Balayage tactile : un toucher arrête la lecture automatique ; un glissement de plus de 45 px change de diapositive.
  let startX = null, startY = null;
  univers.addEventListener('touchstart', e => { state.touched = true; sync(); startX = e.changedTouches[0].clientX; startY = e.changedTouches[0].clientY; }, { passive: true });
  univers.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY; startX = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  show(0, false); sync();
}

// Bouton WhatsApp flottant : masqué pendant la saisie (clavier ouvert), pour ne jamais recouvrir un champ.
// Deux signaux : le focus dans un champ de saisie, et la hauteur visible réduite par le clavier (visualViewport).
(function(){
  const isField = el => !!(el && el.matches && el.matches('input:not([type="radio"]):not([type="checkbox"]):not([type="button"]):not([type="submit"]), select, textarea'));
  let focused = false, keyboard = false;
  const apply = () => document.body.classList.toggle('is-typing', focused || keyboard);
  document.addEventListener('focusin', e => { focused = isField(e.target); apply(); });
  document.addEventListener('focusout', e => { focused = isField(e.relatedTarget); apply(); });
  const vv = window.visualViewport;
  if (vv) vv.addEventListener('resize', () => { keyboard = vv.height < window.innerHeight - 150; apply(); });
})();
