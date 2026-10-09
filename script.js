// ============================================================
// 1. ANIMATION "MACHINE À ÉCRIRE" dans le terminal du hero
//    On affiche le texte lettre par lettre, comme si quelqu'un
//    tapait en direct dans un terminal.
// ============================================================
function typeEffect(element, text, speed = 45) {
  let i = 0;
  element.textContent = '';
  function step() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}

// On respecte les utilisateurs qui préfèrent moins d'animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const typedNameEl = document.getElementById('typed-name');
if (typedNameEl) {
  if (prefersReducedMotion) {
    typedNameEl.textContent = 'leon-besset';
  } else {
    typeEffect(typedNameEl, 'leon-besset', 70);
  }
}

// ============================================================
// 2. MENU MOBILE (burger)
//    Au clic sur le bouton burger, on ajoute/enlève une classe
//    CSS qui affiche ou masque les liens de navigation.
// ============================================================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.navbar__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('navbar__links--open');
  });

  // Ferme le menu automatiquement quand on clique sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('navbar__links--open');
    });
  });
}

// ============================================================
// 3. ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL
//    Les barres ne se remplissent que quand elles apparaissent
//    à l'écran (Intersection Observer = "surveille si un élément
//    est visible dans la fenêtre du navigateur").
// ============================================================
const skillBars = document.querySelectorAll('.skill-bar__fill');

if (skillBars.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        // Force le navigateur à "relire" le style avant de relancer l'animation
        void entry.target.offsetWidth;
        entry.target.style.animation = 'grow 1.2s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => observer.observe(bar));
}
