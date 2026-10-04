// Galerie Le Kadior : apparition progressive + visionneuse (lightbox), sans bibliothèque.
// Fichier indépendant : ne touche pas au catalogue (script.js).
(function () {
  const mosaic = document.querySelector("#galerie .gallery-mosaic");
  const lightbox = document.getElementById("galleryLightbox");
  if (!mosaic || !lightbox) return;

  const triggers = Array.from(mosaic.querySelectorAll(".gallery-trigger"));
  const lbImg = lightbox.querySelector(".lightbox-img");
  const lbTitle = lightbox.querySelector(".lightbox-title");
  const lbCount = lightbox.querySelector(".lightbox-count");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");

  let photos = [];      // boutons dont la photo existe
  let current = 0;
  let lastFocus = null;
  let closeTimer = null;

  // Une photo absente : le bouton est désactivé et l'emplacement garde son visuel crème/marron.
  function markMissing(trigger) {
    trigger.disabled = true;
    const img = trigger.querySelector("img");
    if (img) img.remove();
  }

  function availablePhotos() {
    return triggers.filter(t => !t.disabled && t.querySelector("img"));
  }

  function show(index) {
    current = (index + photos.length) % photos.length;
    const img = photos[current].querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = img.alt;
    lbCount.textContent = `${current + 1} / ${photos.length}`;
    lightbox.classList.toggle("is-single", photos.length < 2);
  }

  function open(trigger) {
    photos = availablePhotos();
    const index = photos.indexOf(trigger);
    if (index === -1) return;

    clearTimeout(closeTimer);
    lastFocus = trigger;
    show(index);

    // Bloque le défilement de la page sans décaler la mise en page
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = scrollbar + "px";
    document.documentElement.classList.add("lightbox-open");

    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    btnClose.focus({ preventScroll: true });
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    if (lightbox.hidden) return;
    lightbox.classList.remove("is-open");
    document.removeEventListener("keydown", onKeydown);
    closeTimer = setTimeout(() => {
      lightbox.hidden = true;
      lbImg.removeAttribute("src");
      document.documentElement.classList.remove("lightbox-open");
      document.body.style.paddingRight = "";
    }, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function onKeydown(event) {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    else if (event.key === "ArrowLeft" && photos.length > 1) show(current - 1);
    else if (event.key === "ArrowRight" && photos.length > 1) show(current + 1);
    else if (event.key === "Tab") {
      // Garde le focus à l'intérieur de la visionneuse
      const focusables = [btnClose, btnPrev, btnNext].filter(b => b.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      else if (!focusables.includes(document.activeElement)) { event.preventDefault(); first.focus(); }
    }
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => open(trigger));
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => show(current - 1));
  btnNext.addEventListener("click", () => show(current + 1));

  // Clic en dehors de la photo (fond sombre) : fermeture
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-figure")) close();
  });

  // Si une photo ne se charge pas dans la visionneuse, on l'écarte proprement
  lbImg.addEventListener("error", () => {
    if (!lbImg.getAttribute("src") || !photos[current]) return;
    markMissing(photos[current]);
    photos = availablePhotos();
    if (photos.length) show(Math.min(current, photos.length - 1));
    else close();
  });

  // Balayage gauche / droite sur écran tactile
  let touchX = null;
  lightbox.addEventListener("touchstart", event => { touchX = event.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", event => {
    if (touchX === null || photos.length < 2) return;
    const dx = event.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });

  // Apparition progressive des photos à l'entrée dans l'écran
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const items = Array.from(mosaic.querySelectorAll(".gallery-item"));
    mosaic.classList.add("is-reveal");
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, k) => {
        entry.target.style.transitionDelay = `${k * 80}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(item => observer.observe(item));
  }
})();
