const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;

const animateElement = (element, keyframes, options = {}) => {
  if (!element || reduceMotion || typeof element.animate !== 'function') return null;
  return element.animate(keyframes, { fill: 'both', ...options });
};

const activeAnimations = new WeakMap();
const animateLatest = (element, keyframes, options = {}) => {
  if (!element || typeof element.animate !== 'function') return null;
  activeAnimations.get(element)?.cancel();
  const animation = element.animate(keyframes, { fill: 'forwards', ...options });
  activeAnimations.set(element, animation);
  return animation;
};

const movePill = (pill, container, target, duration = 260) => {
  if (!pill || !container || !target || reduceMotion) return;
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  pill.classList.add('visible');
  animateLatest(pill, [{
    transform: `translate(${targetRect.left - containerRect.left}px,${targetRect.top - containerRect.top}px)`,
    width: `${targetRect.width}px`,
    height: `${targetRect.height}px`,
    opacity: 1
  }], { duration, easing: 'cubic-bezier(.22,1,.36,1)' });
};

const progress = document.querySelector('.scroll-progress');
if (progress) {
  let ticking = false;
  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const value = Math.min(1, scrollY / max);
    if (typeof progress.animate === 'function') {
      animateLatest(progress, [{ transform: `scaleX(${value})` }], { duration: 1 });
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
}

/* Unlumen-inspired active navigation pill, implemented without a framework. */
const mainNav = document.querySelector('.topbar nav');
if (mainNav && !reduceMotion) {
  const pill = document.createElement('span');
  pill.className = 'nav-motion-pill';
  pill.setAttribute('aria-hidden', 'true');
  mainNav.prepend(pill);

  const activeLink = () => mainNav.querySelector('a.active') || mainNav.querySelector('a');
  const restore = () => movePill(pill, mainNav, activeLink());
  requestAnimationFrame(restore);

  mainNav.addEventListener('pointerover', (event) => {
    const link = event.target.closest('a');
    if (link && mainNav.contains(link)) movePill(pill, mainNav, link, 220);
  }, { passive: true });
  mainNav.addEventListener('pointerleave', restore, { passive: true });
  mainNav.addEventListener('focusin', (event) => {
    const link = event.target.closest('a');
    if (link) movePill(pill, mainNav, link, 200);
  });
  mainNav.addEventListener('focusout', () => requestAnimationFrame(restore));
  addEventListener('resize', () => requestAnimationFrame(restore), { passive: true });
}

/* Motion-tabs style project filters. */
const filters = document.querySelector('.filters');
if (filters && !reduceMotion) {
  const pill = document.createElement('span');
  pill.className = 'filter-motion-pill';
  pill.setAttribute('aria-hidden', 'true');
  filters.prepend(pill);

  const activeFilter = () => filters.querySelector('.filter-button.active') || filters.querySelector('.filter-button');
  const restore = () => movePill(pill, filters, activeFilter(), 220);
  requestAnimationFrame(restore);

  filters.addEventListener('pointerover', (event) => {
    const button = event.target.closest('.filter-button');
    if (button) movePill(pill, filters, button, 180);
  }, { passive: true });
  filters.addEventListener('pointerleave', restore, { passive: true });
  filters.addEventListener('focusin', (event) => {
    const button = event.target.closest('.filter-button');
    if (button) movePill(pill, filters, button, 180);
  });
  filters.addEventListener('click', () => requestAnimationFrame(restore));
  addEventListener('resize', () => requestAnimationFrame(restore), { passive: true });
}

const hero = document.querySelector('.hero');
let galaxyCanvas = null;

if (hero && !hero.querySelector('.video-galaxy')) {
  galaxyCanvas = document.createElement('canvas');
  galaxyCanvas.className = 'video-galaxy';
  galaxyCanvas.setAttribute('aria-hidden', 'true');

  const grid = document.createElement('div');
  grid.className = 'video-grid-field';
  grid.setAttribute('aria-hidden', 'true');

  const rippleField = document.createElement('div');
  rippleField.className = 'video-ripple-field';
  rippleField.setAttribute('aria-hidden', 'true');
  rippleField.replaceChildren(...Array.from({ length: 3 }, () => document.createElement('i')));

  hero.prepend(rippleField);
  hero.prepend(grid);
  hero.prepend(galaxyCanvas);
} else {
  galaxyCanvas = hero?.querySelector('.video-galaxy') || null;
}

const trustStrip = document.querySelector('.trust-strip');
if (trustStrip && !trustStrip.classList.contains('video-marquee')) {
  const track = document.createElement('div');
  track.className = 'video-marquee-track';
  const originals = [...trustStrip.children].map((node) => node.cloneNode(true));
  originals.forEach((node) => track.appendChild(node));
  originals.forEach((node) => {
    const clone = node.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  trustStrip.replaceChildren(track);
  trustStrip.classList.add('video-marquee');
}

const spotlightTargets = document.querySelectorAll('.project-card,.solution-card,.profile-card,.price-card,.detail-card,.contact-form,.showcase-main');
spotlightTargets.forEach((surface) => {
  let light = surface.querySelector(':scope > .interaction-spotlight');
  if (!light) {
    light = document.createElement('span');
    light.className = 'interaction-spotlight';
    light.setAttribute('aria-hidden', 'true');
    surface.prepend(light);
  }

  if (finePointer && !reduceMotion) {
    surface.addEventListener('pointermove', (event) => {
      const rect = surface.getBoundingClientRect();
      const x = event.clientX - rect.left - 180;
      const y = event.clientY - rect.top - 180;
      animateLatest(light, [{ transform: `translate(${x}px, ${y}px)` }], { duration: 90, easing: 'linear' });
    }, { passive: true });
  }
});

if (!reduceMotion) {
  const heroItems = [...document.querySelectorAll('.hero-copy-wrap > *, .hero-showcase')];
  heroItems.forEach((element, index) => {
    animateElement(element, [
      { opacity: 0, transform: 'translateY(22px)', filter: 'blur(7px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
    ], {
      duration: 680,
      delay: index * 75,
      easing: 'cubic-bezier(.22,1,.36,1)'
    });
  });

  const revealSelectors = [
    '.section-head', '.filters', '.project-card', '.solution-card', '.profile-card', '.profile-proof-footer',
    '.process-grid article', '.final-cta', '.price-card', '.note-box',
    '.contact-copy', '.contact-form', '.project-hero', '.detail-card', '.thanks-card'
  ];
  const revealElements = [...document.querySelectorAll(revealSelectors.join(','))].filter((element) => !element.closest('.hero'));

  if ('IntersectionObserver' in window) {
    revealElements.forEach((element) => element.classList.add('motion-reveal'));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    revealElements.forEach((element) => observer.observe(element));
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    const visual = card.querySelector('.project-visual');
    if (!visual || !finePointer) return;
    card.addEventListener('mouseenter', () => animateLatest(visual, [{ transform: 'scale(1.013)' }], { duration: 240, easing: 'ease-out' }));
    card.addEventListener('mouseleave', () => animateLatest(visual, [{ transform: 'scale(1)' }], { duration: 280, easing: 'ease-out' }));
  });

  const showcase = document.querySelector('.showcase-main');
  const showcaseParent = showcase?.closest('.hero-showcase');
  if (showcase && showcaseParent && finePointer) {
    showcaseParent.addEventListener('pointermove', (event) => {
      const rect = showcaseParent.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      animateLatest(showcase, [{ transform: `perspective(1100px) rotateY(${-5 + x * 5}deg) rotateX(${3 - y * 5}deg) translateY(${y * -5}px)` }], { duration: 300, easing: 'ease-out' });
    }, { passive: true });
    showcaseParent.addEventListener('pointerleave', () => {
      animateLatest(showcase, [{ transform: 'perspective(1100px) rotateY(-5deg) rotateX(3deg) translateY(0)' }], { duration: 420, easing: 'ease-out' });
    });
  }

  document.querySelectorAll('.button,.card-button').forEach((button) => {
    if (!finePointer) return;
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.11;
      animateLatest(button, [{ transform: `translate(${x}px, ${y}px)` }], { duration: 160, easing: 'ease-out' });
    }, { passive: true });
    button.addEventListener('pointerleave', () => animateLatest(button, [{ transform: 'translate(0,0)' }], { duration: 250, easing: 'ease-out' }));
  });
}

if (galaxyCanvas && !reduceMotion) {
  const ctx = galaxyCanvas.getContext('2d', { alpha: true });
  if (ctx) {
    let width = 1;
    let height = 1;
    let particles = [];
    let raf = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = galaxyCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      galaxyCanvas.width = Math.floor(width * dpr);
      galaxyCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(56, Math.round(width / 20)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.45 + Math.random() * 1.2,
        a: 0.14 + Math.random() * 0.44,
        vx: (0.02 + Math.random() * 0.05) * (index % 2 ? 1 : -1),
        vy: -0.01 - Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time) => {
      if (time - lastFrame < 32) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.022;
        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        const alpha = Math.max(0.02, particle.a * (0.72 + Math.sin(particle.phase) * 0.28));
        ctx.beginPath();
        ctx.fillStyle = `rgba(108,232,173,${alpha})`;
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(galaxyCanvas);
    else addEventListener('resize', resize, { passive: true });
    raf = requestAnimationFrame(draw);
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    });
  }
}

if (hero && !reduceMotion && finePointer) {
  let lastRipple = 0;
  hero.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a,button')) return;
    const now = performance.now();
    if (now - lastRipple < 180) return;
    lastRipple = now;

    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ring = document.createElement('span');
    ring.className = 'pointer-ripple';
    ring.setAttribute('aria-hidden', 'true');
    hero.appendChild(ring);

    const animation = ring.animate([
      { opacity: 0.72, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(.3)` },
      { opacity: 0, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(10)` }
    ], { duration: 900, easing: 'cubic-bezier(.2,.7,.2,1)' });
    animation.addEventListener('finish', () => ring.remove(), { once: true });
  });
}
