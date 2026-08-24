const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;
const desktopMotion = () => finePointer && innerWidth > 960;

const activeAnimations = new WeakMap();
const motionState = new WeakMap();

const animateElement = (element, keyframes, options = {}) => {
  if (!element || reduceMotion || typeof element.animate !== 'function') return null;
  return element.animate(keyframes, { fill: 'both', ...options });
};

const animateLatest = (element, keyframes, options = {}) => {
  if (!element || typeof element.animate !== 'function') return null;
  activeAnimations.get(element)?.cancel();
  const animation = element.animate(keyframes, { fill: 'forwards', ...options });
  activeAnimations.set(element, animation);
  return animation;
};

const targetBox = (container, target) => {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return {
    x: targetRect.left - containerRect.left + container.scrollLeft,
    y: targetRect.top - containerRect.top + container.scrollTop,
    width: targetRect.width,
    height: targetRect.height
  };
};

const movePill = (pill, container, target, duration = 240) => {
  if (!pill || !container || !target || reduceMotion || innerWidth <= 700) return;
  const next = targetBox(container, target);
  const previous = motionState.get(pill) || next;
  motionState.set(pill, next);
  pill.classList.add('visible');
  animateLatest(pill, [
    {
      transform: `translate(${previous.x}px,${previous.y}px)`,
      width: `${previous.width}px`,
      height: `${previous.height}px`,
      opacity: 1
    },
    {
      transform: `translate(${next.x}px,${next.y}px)`,
      width: `${next.width}px`,
      height: `${next.height}px`,
      opacity: 1
    }
  ], { duration, easing: 'cubic-bezier(.22,1,.36,1)' });
};

const progress = document.querySelector('.scroll-progress');
if (progress) {
  let ticking = false;
  let lastValue = -1;
  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const value = Math.min(1, Math.max(0, scrollY / max));
    if (Math.abs(value - lastValue) > 0.001 && typeof progress.animate === 'function') {
      lastValue = value;
      animateLatest(progress, [{ transform: `scaleX(${value})` }], { duration: 1, easing: 'linear' });
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(updateProgress), { passive: true });
  updateProgress();
}

/* Stable active-navigation pill. Disabled on narrow layouts to avoid horizontal-scroll jitter. */
const mainNav = document.querySelector('.topbar nav');
if (mainNav && !reduceMotion && innerWidth > 700) {
  const pill = document.createElement('span');
  pill.className = 'nav-motion-pill';
  pill.setAttribute('aria-hidden', 'true');
  mainNav.prepend(pill);

  const activeLink = () => mainNav.querySelector('a.active') || mainNav.querySelector('a');
  const restore = () => movePill(pill, mainNav, activeLink());
  requestAnimationFrame(restore);

  mainNav.addEventListener('pointerover', (event) => {
    const link = event.target.closest('a');
    if (link && mainNav.contains(link)) movePill(pill, mainNav, link, 190);
  }, { passive: true });
  mainNav.addEventListener('pointerleave', restore, { passive: true });
  mainNav.addEventListener('focusin', (event) => {
    const link = event.target.closest('a');
    if (link) movePill(pill, mainNav, link, 180);
  });
  mainNav.addEventListener('focusout', () => requestAnimationFrame(restore));
  mainNav.addEventListener('scroll', () => requestAnimationFrame(restore), { passive: true });
  addEventListener('resize', () => requestAnimationFrame(restore), { passive: true });
}

/* Stable project-filter pill. */
const filters = document.querySelector('.filters');
if (filters && !reduceMotion && innerWidth > 700) {
  const pill = document.createElement('span');
  pill.className = 'filter-motion-pill';
  pill.setAttribute('aria-hidden', 'true');
  filters.prepend(pill);

  const activeFilter = () => filters.querySelector('.filter-button.active') || filters.querySelector('.filter-button');
  const restore = () => movePill(pill, filters, activeFilter(), 200);
  requestAnimationFrame(restore);

  filters.addEventListener('pointerover', (event) => {
    const button = event.target.closest('.filter-button');
    if (button) movePill(pill, filters, button, 170);
  }, { passive: true });
  filters.addEventListener('pointerleave', restore, { passive: true });
  filters.addEventListener('focusin', (event) => {
    const button = event.target.closest('.filter-button');
    if (button) movePill(pill, filters, button, 170);
  });
  filters.addEventListener('click', () => requestAnimationFrame(restore));
  filters.addEventListener('scroll', () => requestAnimationFrame(restore), { passive: true });
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

  if (desktopMotion() && !reduceMotion) {
    let previous = { x: -360, y: -360 };
    surface.addEventListener('pointermove', (event) => {
      const rect = surface.getBoundingClientRect();
      const next = { x: event.clientX - rect.left - 180, y: event.clientY - rect.top - 180 };
      animateLatest(light, [
        { transform: `translate(${previous.x}px,${previous.y}px)` },
        { transform: `translate(${next.x}px,${next.y}px)` }
      ], { duration: 95, easing: 'linear' });
      previous = next;
    }, { passive: true });
  }
});

if (!reduceMotion) {
  const heroItems = [...document.querySelectorAll('.hero-copy-wrap > *, .hero-showcase')];
  heroItems.forEach((element, index) => {
    animateElement(element, [
      { opacity: 0, transform: 'translateY(16px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
    ], {
      duration: 560,
      delay: index * 62,
      easing: 'cubic-bezier(.22,1,.36,1)'
    });
  });

  /* Only hide elements that start below the viewport. This prevents first-paint flashes. */
  const revealSelectors = [
    '.section-head', '.filters', '.project-card', '.solution-card', '.profile-card', '.profile-proof-footer',
    '.process-grid article', '.final-cta', '.price-card', '.note-box',
    '.contact-copy', '.contact-form', '.project-hero', '.detail-card', '.thanks-card'
  ];
  const revealElements = [...document.querySelectorAll(revealSelectors.join(','))]
    .filter((element) => !element.closest('.hero'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top > innerHeight * 0.96) {
        element.classList.add('motion-reveal');
        observer.observe(element);
      }
    });
  }

  /* Keep the hero dimensional, but avoid aggressive perspective that can blur text. */
  const showcase = document.querySelector('.showcase-main');
  const showcaseParent = showcase?.closest('.hero-showcase');
  if (showcase && showcaseParent && desktopMotion()) {
    let current = 'perspective(1100px) rotateY(-3deg) rotateX(2deg) translateY(0)';
    showcaseParent.addEventListener('pointermove', (event) => {
      const rect = showcaseParent.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const next = `perspective(1100px) rotateY(${-3 + x * 2.8}deg) rotateX(${2 - y * 2.8}deg) translateY(${y * -2.5}px)`;
      animateLatest(showcase, [{ transform: current }, { transform: next }], { duration: 220, easing: 'ease-out' });
      current = next;
    }, { passive: true });
    showcaseParent.addEventListener('pointerleave', () => {
      const next = 'perspective(1100px) rotateY(-3deg) rotateX(2deg) translateY(0)';
      animateLatest(showcase, [{ transform: current }, { transform: next }], { duration: 300, easing: 'ease-out' });
      current = next;
    });
  }

  /* Magnetic buttons are intentionally subtle to keep text crisp. */
  document.querySelectorAll('.button,.card-button').forEach((button) => {
    if (!desktopMotion()) return;
    let current = { x: 0, y: 0 };
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const next = {
        x: (event.clientX - rect.left - rect.width / 2) * 0.035,
        y: (event.clientY - rect.top - rect.height / 2) * 0.045
      };
      animateLatest(button, [
        { transform: `translate(${current.x}px,${current.y}px)` },
        { transform: `translate(${next.x}px,${next.y}px)` }
      ], { duration: 130, easing: 'ease-out' });
      current = next;
    }, { passive: true });
    button.addEventListener('pointerleave', () => {
      animateLatest(button, [
        { transform: `translate(${current.x}px,${current.y}px)` },
        { transform: 'translate(0,0)' }
      ], { duration: 190, easing: 'ease-out' });
      current = { x: 0, y: 0 };
    });
  });
}

if (galaxyCanvas && !reduceMotion) {
  const ctx = galaxyCanvas.getContext('2d', { alpha: true, desynchronized: true });
  if (ctx) {
    let width = 1;
    let height = 1;
    let particles = [];
    let raf = 0;
    let lastFrame = 0;
    let running = false;
    let resizeQueued = false;

    const resize = () => {
      const rect = galaxyCanvas.getBoundingClientRect();
      const previousWidth = width;
      const previousHeight = height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      galaxyCanvas.width = Math.floor(width * dpr);
      galaxyCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(22, Math.min(48, Math.round(width / 23)));
      if (!particles.length) {
        particles = Array.from({ length: count }, (_, index) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.45 + Math.random() * 1.1,
          a: 0.13 + Math.random() * 0.39,
          vx: (0.018 + Math.random() * 0.042) * (index % 2 ? 1 : -1),
          vy: -0.008 - Math.random() * 0.021,
          phase: Math.random() * Math.PI * 2
        }));
      } else {
        const scaleX = previousWidth > 1 ? width / previousWidth : 1;
        const scaleY = previousHeight > 1 ? height / previousHeight : 1;
        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
        if (particles.length > count) particles.length = count;
        while (particles.length < count) {
          const index = particles.length;
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 0.45 + Math.random() * 1.1,
            a: 0.13 + Math.random() * 0.39,
            vx: (0.018 + Math.random() * 0.042) * (index % 2 ? 1 : -1),
            vy: -0.008 - Math.random() * 0.021,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const queueResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        resize();
      });
    };

    const draw = (time) => {
      if (!running) return;
      if (time - lastFrame >= 34) {
        lastFrame = time;
        ctx.clearRect(0, 0, width, height);
        for (const particle of particles) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.phase += 0.02;
          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
          if (particle.y < -4) particle.y = height + 4;
          const alpha = Math.max(0.02, particle.a * (0.74 + Math.sin(particle.phase) * 0.26));
          ctx.beginPath();
          ctx.fillStyle = `rgba(108,232,173,${alpha})`;
          ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if ('ResizeObserver' in window) new ResizeObserver(queueResize).observe(galaxyCanvas);
    else addEventListener('resize', queueResize, { passive: true });
    start();
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  }
}

if (hero && !reduceMotion && desktopMotion()) {
  let lastRipple = 0;
  hero.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a,button')) return;
    const now = performance.now();
    if (now - lastRipple < 200) return;
    lastRipple = now;

    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ring = document.createElement('span');
    ring.className = 'pointer-ripple';
    ring.setAttribute('aria-hidden', 'true');
    hero.appendChild(ring);

    const animation = ring.animate([
      { opacity: 0.64, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(.3)` },
      { opacity: 0, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(8.5)` }
    ], { duration: 760, easing: 'cubic-bezier(.2,.7,.2,1)' });
    animation.addEventListener('finish', () => ring.remove(), { once: true });
  });
}
