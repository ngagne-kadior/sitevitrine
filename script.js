const WHATSAPP_NUMBER = "221784666259"; // Numéro WhatsApp officiel du Kadior (+221 78 466 62 59).

const products = [
  {name:"Baguette", category:"Pains", price:"100 FCFA", image:"images/produits/pains/baguette.jpg", description:"Pain frais disponible tous les jours."},
  {name:"Pain Sicap", category:"Pains", price:"150 FCFA", image:"images/produits/pains/pain-sicap.jpg", description:"Pain Sicap frais."},
  {name:"Pain Double Sicap", category:"Pains", price:"200 FCFA", image:"images/produits/pains/pain-double-sicap.jpg", description:"Disponible selon la production."},
  {name:"Pain Diabétique", category:"Pains", price:"150 FCFA", image:"images/produits/pains/pain-diabetique.jpg", description:"Disponible tous les jours."},
  {name:"Pain Thiéré", category:"Pains", price:"100 FCFA", image:"images/produits/pains/pain-thiere.jpg", description:"Disponible tous les jours."},
  {name:"Pain Maïs", category:"Pains", price:"100 FCFA", image:"images/produits/pains/pain-mais.jpg", description:"Disponible tous les jours."},
  {name:"Pain Riche", category:"Pains", price:"100 FCFA", image:"images/produits/pains/pain-riche.jpg", description:"Disponible tous les jours."},
  {name:"Pain Sans sel", category:"Pains", price:"150 FCFA", image:"images/produits/pains/pain-sans-sel.jpg", description:"Sur commande, par lot de 10 pièces."},
  {name:"Pain Diabétique Sans sel", category:"Pains", price:"150 FCFA", image:"images/produits/pains/pain-diabetique-sans-sel.jpg", description:"Sur commande, par lot de 10 pièces."},

  {name:"Croissant", category:"Viennoiseries", price:"500 FCFA", image:"images/produits/viennoiseries/croissant.jpg", description:"Viennoiserie fraîche et croustillante."},
  {name:"Pain au chocolat", category:"Viennoiseries", price:"500 FCFA", image:"images/produits/viennoiseries/pain-chocolat.jpg", description:"Une viennoiserie gourmande."},
  {name:"Brioche", category:"Viennoiseries", price:"500 FCFA", image:"images/produits/viennoiseries/brioche.jpg", description:"Brioche moelleuse."},
  {name:"Pain aux raisins", category:"Viennoiseries", price:"Prix sur demande", image:"images/produits/viennoiseries/pain-raisins.jpg", description:"Disponible selon la production."},

  {name:"Roche coco", category:"Pâtisserie", price:"500 FCFA", image:"images/produits/patisserie/roche-coco.jpg", description:"Une douceur gourmande."},
  {name:"Madeleine", category:"Pâtisserie", price:"Prix sur demande", image:"images/produits/patisserie/madeleine.jpg", description:"Moelleuse et savoureuse."},
  {name:"Biscuits", category:"Pâtisserie", price:"Prix sur demande", image:"images/produits/patisserie/biscuits.jpg", description:"Biscuits Le Kadior."},
  {name:"Cookies", category:"Pâtisserie", price:"Prix sur demande", image:"images/produits/patisserie/cookies.jpg", description:"Cookies gourmands."},
  {name:"Tarte", category:"Pâtisserie", price:"Prix sur demande", image:"images/produits/patisserie/tarte.jpg", description:"Tarte selon disponibilité."},
  {name:"Dessert", category:"Pâtisserie", price:"Prix sur demande", image:"images/produits/patisserie/dessert.jpg", description:"Dessert selon disponibilité."},

  {name:"Gâteau d'anniversaire", category:"Gâteaux d'anniversaire", price:"À partir de 8 000 FCFA", image:"images/produits/gateaux/gateau-anniversaire.jpg", description:"Gâteau sur commande."},
  {name:"Part de gâteau", category:"Gâteaux d'anniversaire", price:"Prix sur demande", image:"images/produits/gateaux/part-gateau.jpg", description:"Parts disponibles selon les gâteaux."},
  {name:"Gâteau personnalisé", category:"Gâteaux d'anniversaire", price:"Sur devis", image:"images/produits/gateaux/gateau-personnalise.jpg", description:"Personnalisation sur commande."},
  {name:"Gâteau événementiel", category:"Gâteaux d'anniversaire", price:"Sur devis", image:"images/produits/gateaux/gateau-evenementiel.jpg", description:"Pour vos événements et célébrations."}
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
let currentFilter = "Tous";

function whatsappLink(product) {
  const message = `Bonjour Le Kadior, je souhaite commander : ${product.name}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter(product => {
    const matchesCategory = currentFilter === "Tous" || product.category === currentFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <span class="product-placeholder" aria-hidden="true">
          <span class="product-placeholder-mark">LK</span>
          <span class="product-placeholder-name">${product.name}</span>
        </span>
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.remove()"
        >
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="price">${product.price}</span>
          <a class="order-btn" href="${whatsappLink(product)}" target="_blank" rel="noopener">
            Commander
          </a>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.classList.toggle("hidden", filtered.length !== 0);
}

// Sélectionne une catégorie : met à jour le filtre actif puis réaffiche les produits
// (la recherche en cours reste appliquée à l'intérieur de la catégorie).
function setFilter(category) {
  currentFilter = category;

  document.querySelectorAll(".filter").forEach(btn => {
    const isActive = btn.dataset.filter === category;
    btn.classList.toggle("active", isActive);
    if (isActive) revealFilter(btn);
  });

  renderProducts();
}

// Sur téléphone, la barre de filtres défile horizontalement :
// on ramène le filtre actif dans la zone visible (sans toucher au défilement de la page).
function revealFilter(button) {
  const bar = button.parentElement;
  if (bar.scrollWidth <= bar.clientWidth) return;
  const offset = button.getBoundingClientRect().left - bar.getBoundingClientRect().left;
  bar.scrollTo({ left: bar.scrollLeft + offset - (bar.clientWidth - button.offsetWidth) / 2, behavior: "smooth" });
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

// Le lien href="#produits" de la carte fait défiler la page vers le catalogue.
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => setFilter(card.dataset.category));
});

// Liens « Nos produits » du footer : même comportement que les cartes catégories.
document.querySelectorAll("[data-footer-filter]").forEach(link => {
  link.addEventListener("click", () => setFilter(link.dataset.footerFilter));
});

searchInput.addEventListener("input", renderProducts);

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".nav").classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();

// En-tête : version compacte dès qu'on défile, et mise en évidence du lien de la section affichée
// (la cible du menu la plus proche parmi celles déjà passées sous l'en-tête).
(function () {
  const header = document.querySelector(".header");
  const links = Array.from(document.querySelectorAll(".nav a"));
  const targets = links.map(link => document.querySelector(link.getAttribute("href")));

  function updateActiveLink() {
    header.classList.toggle("is-compact", window.scrollY > 60);

    const limit = 140;
    let active = 0;
    let closest = -Infinity;
    targets.forEach((section, i) => {
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      if (top <= limit && top > closest) { closest = top; active = i; }
    });
    links.forEach((link, i) => {
      link.classList.toggle("is-active", i === active);
      if (i === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
})();
