const WHATSAPP_NUMBER = "221784666259";

// Photos des produits : chaque produit a un tableau `images` de 1 à 10 photos (la première s'affiche sur la carte).
// L'ancienne forme `image:"..."` (une seule photo) reste acceptée.
// Les fichiers introuvables sont ignorés automatiquement.
const MAX_IMAGES = 10;

const products = [
  {name:"Baguette",category:"Pains",price:"100 FCFA",images:["images/produits/pains/camp baguette.png"],description:"Pain frais disponible tous les jours."},
  {name:"Pain Sicap",category:"Pains",price:"150 FCFA",images:["images/produits/pains/pain sicap.png"],description:"Pain Sicap frais."},
  {name:"Pain Double Sicap",category:"Pains",price:"200 FCFA",images:[],description:"Disponible selon la production."},
  {name:"Pain Diabétique",category:"Pains",price:"150 FCFA",images:["images/produits/pains/pain diabetique.png"],description:"Disponible tous les jours."},
  {name:"Pain Thiéré",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain thiere.png"],description:"Disponible tous les jours."},
  {name:"Pain Maïs",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain Mais.png"],description:"Disponible tous les jours."},
  {name:"Pain Riche",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain riche.png"],description:"Disponible tous les jours."},
  {name:"Pain Sans sel",category:"Pains",price:"150 FCFA",images:[],description:"Sur commande, par lot de 10 pièces."},
  {name:"Pain Diabétique Sans sel",category:"Pains",price:"150 FCFA",images:[],description:"Sur commande, par lot de 10 pièces."},
  {name:"Croissant",category:"Viennoiseries",price:"500 FCFA",images:[
    "images/produits/viennoiseries/croissant beurre 1.jfif",
    "images/produits/viennoiseries/croissant beurre 2.jfif",
    "images/produits/viennoiseries/croissant beurre 3.jfif",
    "images/produits/viennoiseries/croissant beurre bicolore à la fraise.jfif"
  ],description:"Viennoiserie fraîche et croustillante."},
  {name:"Pain au chocolat",category:"Viennoiseries",price:"500 FCFA",images:["images/produits/viennoiseries/Pain au chocolat.jfif","images/produits/viennoiseries/Pain au chocolate 1.jfif"],description:"Une viennoiserie gourmande."},
  {name:"Pain aux raisins",category:"Viennoiseries",price:"Prix sur demande",images:["images/produits/viennoiseries/pain au raisin.jfif","images/produits/viennoiseries/pain raisin.jfif","images/produits/viennoiseries/Pain Aux Raisins.jfif"],description:"Disponible selon la production."},
  {name:"Palmier",category:"Viennoiseries",price:"150 FCFA",images:["images/produits/viennoiseries/palmier.jfif","images/produits/viennoiseries/palmier1.jfif","images/produits/viennoiseries/palmier 2.jfif"],description:"Feuilleté croustillant et caramélisé."},
  {name:"Pain drops",category:"Viennoiseries",price:"700 FCFA",images:["images/produits/viennoiseries/drops 1.jfif","images/produits/viennoiseries/drops2.jfif","images/produits/viennoiseries/drops.jfif"],description:"Disponible selon la production."},
  {name:"Chausson pomme",category:"Viennoiseries",price:"500 FCFA",images:["images/produits/viennoiseries/chausson pomme.jfif"],description:"Chausson feuilleté aux pommes."},
  {name:"Roche coco",category:"Pâtisserie",price:"100 FCFA",images:["images/produits/patisserie/Macarons à la noix de coco dorés.png"],description:"Une douceur gourmande."},
  {name:"Madeleine",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/madeleine.jfif","images/produits/patisserie/Madeleine 3.jfif","images/produits/patisserie/madeleine 2.jfif"],description:"Moelleuse et savoureuse."},
  {name:"Biscuits",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/Biscuits sablés à la confiture.png"],description:"Biscuits Le Kadior."},
  {name:"Cookies",category:"Pâtisserie",price:"Prix sur demande",images:["images/produits/patisserie/cookies 3.jfif","images/produits/patisserie/cookies 2.jfif","images/produits/patisserie/Cookies.jfif"],description:"Cookies gourmands."},
  {name:"Gâteau d'anniversaire",category:"Gâteaux d'anniversaire",price:"À partir de 8 000 FCFA",images:[
    "images/produits/gateaux/gateau-anniversaire-2.jpg",
    "images/produits/gateaux/gateau-anniversaire-3.jpg",
    "images/produits/gateaux/gateau-anniversaire-4.jpg",
    "images/produits/gateaux/gateau-anniversaire-5.jpg"
  ],description:"Gâteau sur commande."},
  // `options` : les types de parts et leur prix. Le visiteur choisit un type dans la galerie,
  // le prix affiché et le message WhatsApp s'adaptent. Exemple :
  //   options:[{label:"Part chocolat",price:"1 000 FCFA"},{label:"Part fraisier",price:"1 500 FCFA"}]
  {name:"Part de gâteau",category:"Gâteaux d'anniversaire",price:"À partir de 1 000 FCFA",options:[],images:[
    "images/produits/gateaux/part de gateaux 1.jfif",
    "images/produits/gateaux/part de gateaux 2.jfif",
    "images/produits/gateaux/part de gateaux 3.jfif",
    "images/produits/gateaux/part de gateaux 4.png",
    "images/produits/gateaux/part de gateaux 6.jfif",
    "images/produits/gateaux/part de gateaux 7.jfif"
  ],description:"Parts disponibles selon les gâteaux."},
  {name:"Gâteau personnalisé",category:"Gâteaux d'anniversaire",price:"Sur devis",images:[
    "images/produits/gateaux/Gateau personnalisé.jpg"
  ],description:"Personnalisation sur commande."},
  {name:"Gâteau événementiel",category:"Gâteaux d'anniversaire",price:"Sur devis",images:[],description:"Pour vos événements et célébrations."}
];

const productImages=p=>(Array.isArray(p.images)&&p.images.length?p.images:[p.image]).filter(Boolean).slice(0,MAX_IMAGES);
const productGrid=document.getElementById('productGrid');
const searchInput=document.getElementById('searchInput');
const emptyMessage=document.getElementById('emptyMessage');
let currentFilter='Tous';
const whatsappLink=(p,opt)=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour Le Kadior, je souhaite commander : ${p.name}${opt?` — ${opt.label} (${opt.price})`:''}.`)}`;

productGrid.innerHTML=products.map(p=>`<article class="product-card">${productImages(p).length?`<div class="product-image hidden"><img data-src="${productImages(p)[0]}" alt="${p.name}"></div>`:''}<div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${p.price}</span><a class="order-btn" href="${whatsappLink(p)}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-whatsapp"/></svg>Commander</a></div></div></article>`).join('');
const cards=[...productGrid.children];
// Photo des cartes : on garde uniquement les fichiers de `images` qui existent vraiment.
// La première photo trouvée s'affiche sur la carte ; sans aucune photo, la carte reste sans image.
function loadImage(card){
  const img=card.querySelector('img[data-src]');if(!img)return;img.removeAttribute('data-src');
  const p=products[cards.indexOf(card)],box=img.parentElement;
  Promise.all(productImages(p).map(u=>new Promise(r=>{const i=new Image();i.onload=()=>r(u);i.onerror=()=>r(null);i.src=u}))).then(found=>{
    p.gallery=found.filter(Boolean);
    if(!p.gallery.length){box.remove();return}
    img.src=p.gallery[0];box.classList.remove('hidden');card.classList.add('has-gallery');
    box.tabIndex=0;box.setAttribute('role','button');box.setAttribute('aria-label',`Voir les photos : ${p.name}`);
    if(p.gallery.length>1)box.insertAdjacentHTML('beforeend',`<span class="photo-hint"><svg class="icon"><use href="#i-camera"/></svg>Voir les photos</span><span class="photo-count">${p.gallery.length} photos</span>`);
  });
}

// Galerie (lightbox) : une seule galerie pour tout le catalogue, alimentée par les photos du produit cliqué.
const lightbox=document.createElement('div');
lightbox.className='lightbox';lightbox.hidden=true;
lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Galerie photos');
lightbox.innerHTML=`<button class="lb-close" type="button" aria-label="Fermer la galerie">&times;</button><div class="lb-stage"><button class="lb-nav lb-prev" type="button" aria-label="Photo précédente"><svg class="icon"><use href="#i-arrow"/></svg></button><img class="lb-img" alt=""><button class="lb-nav lb-next" type="button" aria-label="Photo suivante"><svg class="icon"><use href="#i-arrow"/></svg></button></div><div class="lb-options" role="group" aria-label="Choisir un type"></div><div class="lb-bar"><div class="lb-caption"><strong></strong><span></span></div><span class="lb-counter"></span><a class="btn btn-gold lb-order" target="_blank" rel="noopener"><svg class="icon"><use href="#i-whatsapp"/></svg>Commander</a></div><div class="lb-thumbs"></div>`;
document.body.appendChild(lightbox);
const lbImg=lightbox.querySelector('.lb-img'),lbThumbs=lightbox.querySelector('.lb-thumbs'),lbCounter=lightbox.querySelector('.lb-counter'),lbStage=lightbox.querySelector('.lb-stage');
let lbProduct=null,lbIndex=0,lbLastFocus=null;
const lbOptions=lightbox.querySelector('.lb-options');
// Types et prix d'un produit (champ `options`) : le choix met à jour le prix affiché et le message WhatsApp.
function selectOption(i){
  const opt=(lbProduct.options||[])[i];
  [...lbOptions.children].forEach((b,k)=>{b.classList.toggle('active',k===i);b.setAttribute('aria-pressed',String(k===i))});
  lightbox.querySelector('.lb-caption span').textContent=opt?opt.price:lbProduct.price;
  lightbox.querySelector('.lb-order').href=whatsappLink(lbProduct,opt);
}
function showPhoto(i){
  const g=lbProduct.gallery,n=g.length;lbIndex=(i+n)%n;
  lbCounter.textContent=`${lbIndex+1} / ${n}`;
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
function renderProducts(){const q=searchInput.value.trim().toLowerCase();let n=0;products.forEach((p,i)=>{const ok=(currentFilter==='Tous'||p.category===currentFilter)&&(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));cards[i].classList.toggle('hidden',!ok);if(ok)n++});emptyMessage.classList.toggle('hidden',n!==0)}
function setFilter(cat){currentFilter=cat;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===cat));renderProducts();document.getElementById('catalogue').scrollIntoView({behavior:'smooth',block:'start'})}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
document.querySelectorAll('.category-card').forEach(c=>c.addEventListener('click',()=>setFilter(c.dataset.category)));
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
document.querySelector('#produits-phares .heading-with-action .btn').addEventListener('click',()=>setFilter('Tous'));

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

// Diaporama « Notre univers en images » : uniquement des photos de produits réels du catalogue.
// Chaque entrée = [nom du produit dans `products`, photo]. Sans photo indiquée, c'est la première photo du produit.
// Nom, prix et description sont repris du catalogue ; un produit introuvable ou sans photo est ignoré.
const universSlides=[
  ["Baguette","images/produits/pains/camp baguette.png"],
  ["Pain Sicap","images/produits/pains/pain sicap.png"],
  ["Pain Thiéré"],
  ["Pain Diabétique"],
  ["Pain Maïs"],
  ["Pain Riche","images/produits/pains/pain riche.png"],
  ["Croissant"],
  ["Pain au chocolat"],
  ["Pain aux raisins"],
  ["Palmier"],
  ["Pain drops"],
  ["Chausson pomme"],
  ["Roche coco"],
  ["Madeleine"],
  ["Biscuits"],
  ["Cookies"],
  ["Part de gâteau","images/produits/gateaux/part de gateaux 4.png"],
  ["Gâteau d'anniversaire"],
  ["Gâteau personnalisé"]
];
const univers=document.querySelector('.univers-slider');
if(univers){
  // 4 s d'affichage par photo + 0,7 s de transition (même durée que dans style.css).
  const DELAY=4000+700,dotsBox=univers.querySelector('.univers-dots');
  const items=universSlides.map(([name,photo])=>{const p=products.find(x=>x.name===name);return p&&{p,photo:photo||productImages(p)[0]}}).filter(s=>s&&s.photo);
  univers.querySelector('.univers-prev').insertAdjacentHTML('beforebegin',items.map(({p,photo})=>`<article class="univers-slide"><div class="univers-photo"><img data-src="${photo}" alt="${p.name}"></div><div class="univers-text"><span class="univers-eyebrow">${p.category.replace(" d'anniversaire",'')}</span><h3>${p.name}</h3><strong class="univers-price">${p.price}</strong><p>${p.description}</p></div></article>`).join(''));
  dotsBox.innerHTML=items.map(({p})=>`<button class="univers-dot" type="button" aria-label="Voir : ${p.name}"></button>`).join('');
  const slides=[...univers.querySelectorAll('.univers-slide')],dots=[...dotsBox.children];let current=0,timer=null,paused=false;
  // Les photos ne sont chargées qu'à l'approche de leur slide (l'active et la suivante).
  const load=i=>{const img=slides[(i+slides.length)%slides.length].querySelector('img[data-src]');if(img){img.src=img.dataset.src;img.removeAttribute('data-src')}};
  function show(i){
    const n=(i+slides.length)%slides.length;
    load(n);load(n+1);load(n-1);
    slides.forEach((s,k)=>{s.classList.toggle('is-prev',k===current&&k!==n);s.classList.toggle('is-active',k===n);s.setAttribute('aria-hidden',String(k!==n))});
    dots.forEach((d,k)=>{d.classList.toggle('active',k===n);d.setAttribute('aria-current',String(k===n))});
    current=n;
  }
  const stop=()=>{clearInterval(timer);timer=null};
  const play=()=>{stop();if(!paused&&!document.hidden)timer=setInterval(()=>show(current+1),DELAY)};
  const go=i=>{show(i);play()};
  univers.querySelector('.univers-prev').addEventListener('click',()=>go(current-1));
  univers.querySelector('.univers-next').addEventListener('click',()=>go(current+1));
  dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
  univers.addEventListener('mouseenter',()=>{paused=true;stop()});
  univers.addEventListener('mouseleave',()=>{paused=false;play()});
  document.addEventListener('visibilitychange',play);
  let startX=null;
  univers.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});
  univers.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;startX=null;if(Math.abs(dx)>45)go(current+(dx<0?1:-1))},{passive:true});
  show(0);play();
}
