const WHATSAPP_NUMBER = "221784666259";

// Photos des produits : chaque produit a un tableau `images` de 1 à 10 photos (la première s'affiche sur la carte).
// L'ancienne forme `image:"..."` (une seule photo) reste acceptée.
// Les fichiers introuvables sont ignorés automatiquement.
const MAX_IMAGES = 10;

const products = [
  {name:"Baguette",category:"Pains",price:"100 FCFA",images:[],description:"Pain frais disponible tous les jours."},
  {name:"Pain Sicap",category:"Pains",price:"150 FCFA",images:[],description:"Pain Sicap frais."},
  {name:"Pain Double Sicap",category:"Pains",price:"200 FCFA",images:[],description:"Disponible selon la production."},
  {name:"Pain Diabétique",category:"Pains",price:"150 FCFA",images:["images/produits/pains/pain diabetique.png"],description:"Disponible tous les jours."},
  {name:"Pain Thiéré",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain thiere.png"],description:"Disponible tous les jours."},
  {name:"Pain Maïs",category:"Pains",price:"100 FCFA",images:["images/produits/pains/pain Mais.png"],description:"Disponible tous les jours."},
  {name:"Pain Riche",category:"Pains",price:"100 FCFA",images:[],description:"Disponible tous les jours."},
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
document.querySelector('.header-search').addEventListener('click',()=>{document.getElementById('catalogue').scrollIntoView({behavior:'smooth',block:'start'});searchInput.focus({preventScroll:true})});
document.getElementById('year').textContent=new Date().getFullYear();
const header=document.getElementById('site-header');const links=[...document.querySelectorAll('.nav a')];window.addEventListener('scroll',()=>{header.classList.toggle('is-compact',scrollY>60);let current='';links.forEach(a=>{const s=document.querySelector(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<140)current=a.getAttribute('href')});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current))},{passive:true});
renderProducts();
