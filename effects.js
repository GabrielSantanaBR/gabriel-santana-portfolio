import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@13.1.0/+esm";

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.scroll-progress');

if (progress) {
  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = `scaleX(${value})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
}

if (!reduceMotion) {
  const heroItems = document.querySelectorAll('.hero-copy-wrap > *, .hero-showcase');
  if (heroItems.length) {
    animate(heroItems, { opacity: [0, 1], y: [20, 0] }, {
      duration: .68,
      delay: stagger(.075),
      ease: [0.22, 1, 0.36, 1]
    });
  }

  const revealSelectors = [
    '.section-head', '.filters', '.project-card', '.solution-card',
    '.process-grid article', '.final-cta', '.price-card', '.note-box',
    '.contact-copy', '.contact-form', '.project-hero', '.detail-card', '.thanks-card'
  ];

  document.querySelectorAll(revealSelectors.join(',')).forEach((element) => {
    if (element.closest('.hero')) return;
    animate(element, { opacity: 0, y: 22 }, { duration: 0 });
    inView(element, () => {
      animate(element, { opacity: 1, y: 0 }, {
        duration: .55,
        ease: [0.22, 1, 0.36, 1]
      });
    }, { margin: '-8% 0px -8% 0px', amount: .08 });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    const visual = card.querySelector('.project-visual');
    if (!visual) return;
    card.addEventListener('mouseenter', () => animate(visual, { scale: 1.012 }, { duration: .24 }));
    card.addEventListener('mouseleave', () => animate(visual, { scale: 1 }, { duration: .28 }));
  });

  const showcase = document.querySelector('.showcase-main');
  if (showcase && window.matchMedia('(pointer:fine)').matches) {
    const parent = showcase.closest('.hero-showcase');
    parent?.addEventListener('pointermove', (event) => {
      const rect = parent.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      animate(showcase, { rotateY: -5 + x * 4, rotateX: 3 - y * 4, y: y * -4 }, { duration: .35 });
    });
    parent?.addEventListener('pointerleave', () => animate(showcase, { rotateY: -5, rotateX: 3, y: 0 }, { duration: .45 }));
  }
}
