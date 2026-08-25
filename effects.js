(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const canAnimate = typeof Element.prototype.animate === 'function';
  const desktopMotion = () => finePointer && innerWidth > 960 && !reduceMotion;
  const activeAnimations = new WeakMap();
  const motionState = new WeakMap();

  const animateLatest = (element, keyframes, options = {}) => {
    if (!element || !canAnimate || reduceMotion) return null;
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

  const movePill = (pill, container, target, duration = 210) => {
    if (!pill || !container || !target || reduceMotion || innerWidth <= 700) return;
    const next = targetBox(container, target);
    const previous = motionState.get(pill) || next;
    motionState.set(pill, next);
    pill.classList.add('visible');
    animateLatest(pill, [
      { transform: `translate(${previous.x}px,${previous.y}px)`, width: `${previous.width}px`, height: `${previous.height}px`, opacity: 1 },
      { transform: `translate(${next.x}px,${next.y}px)`, width: `${next.width}px`, height: `${next.height}px`, opacity: 1 }
    ], { duration, easing: 'cubic-bezier(.22,1,.36,1)' });
  };

  /* Scroll progress */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    addEventListener('resize', () => requestAnimationFrame(update), { passive: true });
    update();
  }

  /* Navigation pill */
  const mainNav = document.querySelector('.topbar nav');
  if (mainNav && !reduceMotion && innerWidth > 700) {
    const pill = document.createElement('span');
    pill.className = 'nav-motion-pill';
    pill.setAttribute('aria-hidden', 'true');
    mainNav.prepend(pill);
    const active = () => mainNav.querySelector('a.active') || mainNav.querySelector('a');
    const restore = () => movePill(pill, mainNav, active());
    requestAnimationFrame(restore);
    mainNav.addEventListener('pointerover', (event) => {
      const link = event.target.closest('a');
      if (link && mainNav.contains(link)) movePill(pill, mainNav, link, 175);
    }, { passive: true });
    mainNav.addEventListener('pointerleave', restore, { passive: true });
    mainNav.addEventListener('focusin', (event) => {
      const link = event.target.closest('a');
      if (link) movePill(pill, mainNav, link, 170);
    });
    mainNav.addEventListener('focusout', () => requestAnimationFrame(restore));
    addEventListener('resize', () => requestAnimationFrame(restore), { passive: true });
  }

  /* Product filters pill */
  const filters = document.querySelector('.filters');
  if (filters && !reduceMotion && innerWidth > 700) {
    const pill = document.createElement('span');
    pill.className = 'filter-motion-pill';
    pill.setAttribute('aria-hidden', 'true');
    filters.prepend(pill);
    const active = () => filters.querySelector('.filter-button.active') || filters.querySelector('.filter-button');
    const restore = () => movePill(pill, filters, active(), 190);
    requestAnimationFrame(restore);
    filters.addEventListener('pointerover', (event) => {
      const button = event.target.closest('.filter-button');
      if (button) movePill(pill, filters, button, 160);
    }, { passive: true });
    filters.addEventListener('pointerleave', restore, { passive: true });
    filters.addEventListener('focusin', (event) => {
      const button = event.target.closest('.filter-button');
      if (button) movePill(pill, filters, button, 160);
    });
    filters.addEventListener('click', () => requestAnimationFrame(restore));
    addEventListener('resize', () => requestAnimationFrame(restore), { passive: true });
  }

  /* Hero ambience */
  const hero = document.querySelector('.hero');
  let galaxyCanvas = hero?.querySelector('.video-galaxy') || null;
  if (hero && !galaxyCanvas) {
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
  }

  /* Technology marquee */
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

  /* Pointer spotlights */
  document.querySelectorAll('.project-card,.solution-card,.profile-card,.price-card,.detail-card,.contact-form,.showcase-main').forEach((surface) => {
    let light = surface.querySelector(':scope > .interaction-spotlight');
    if (!light) {
      light = document.createElement('span');
      light.className = 'interaction-spotlight';
      light.setAttribute('aria-hidden', 'true');
      surface.prepend(light);
    }
    if (!desktopMotion()) return;
    surface.addEventListener('pointermove', (event) => {
      const rect = surface.getBoundingClientRect();
      const x = event.clientX - rect.left - 175;
      const y = event.clientY - rect.top - 175;
      light.style.transform = `translate(${x}px,${y}px)`;
    }, { passive: true });
  });

  if (!reduceMotion && canAnimate) {
    /* Stable hero entrance: never hides or blurs already-painted content. */
    document.querySelectorAll('.hero-copy-wrap > *, .hero-showcase').forEach((element, index) => {
      element.animate([
        { opacity: 1, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 420, delay: index * 48, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
    });

    /* Small 3D response only on large fine-pointer screens. */
    const showcase = document.querySelector('.showcase-main');
    const showcaseParent = showcase?.closest('.hero-showcase');
    if (showcase && showcaseParent && desktopMotion()) {
      let current = 'perspective(1100px) rotateY(-2.4deg) rotateX(1.6deg) translateY(0)';
      showcaseParent.addEventListener('pointermove', (event) => {
        const rect = showcaseParent.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const next = `perspective(1100px) rotateY(${-2.4 + x * 2.2}deg) rotateX(${1.6 - y * 2.2}deg) translateY(${y * -2}px)`;
        animateLatest(showcase, [{ transform: current }, { transform: next }], { duration: 210, easing: 'ease-out' });
        current = next;
      }, { passive: true });
      showcaseParent.addEventListener('pointerleave', () => {
        const next = 'perspective(1100px) rotateY(-2.4deg) rotateX(1.6deg) translateY(0)';
        animateLatest(showcase, [{ transform: current }, { transform: next }], { duration: 270, easing: 'ease-out' });
        current = next;
      });
    }

    /* Subtle button magnetism. */
    if (desktopMotion()) {
      document.querySelectorAll('.button,.card-button').forEach((button) => {
        button.addEventListener('pointermove', (event) => {
          const rect = button.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.025;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.03;
          animateLatest(button, [{ transform: `translate(${x}px,${y}px)` }], { duration: 110, easing: 'ease-out' });
        }, { passive: true });
        button.addEventListener('pointerleave', () => animateLatest(button, [{ transform: 'translate(0,0)' }], { duration: 160, easing: 'ease-out' }));
      });
    }
  }

  /* Low-cost galaxy canvas */
  if (galaxyCanvas && !reduceMotion) {
    const ctx = galaxyCanvas.getContext('2d', { alpha: true, desynchronized: true });
    if (ctx) {
      let width = 1;
      let height = 1;
      let particles = [];
      let raf = 0;
      let running = false;
      let lastFrame = 0;
      let resizeQueued = false;

      const makeParticle = (index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: .45 + Math.random() * 1.05,
        a: .12 + Math.random() * .34,
        vx: (.016 + Math.random() * .038) * (index % 2 ? 1 : -1),
        vy: -.007 - Math.random() * .018,
        phase: Math.random() * Math.PI * 2
      });

      const resize = () => {
        const rect = galaxyCanvas.getBoundingClientRect();
        const oldW = width;
        const oldH = height;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        galaxyCanvas.width = Math.floor(width * dpr);
        galaxyCanvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.max(20, Math.min(42, Math.round(width / 26)));
        if (!particles.length) particles = Array.from({ length: count }, (_, i) => makeParticle(i));
        else {
          const sx = oldW > 1 ? width / oldW : 1;
          const sy = oldH > 1 ? height / oldH : 1;
          particles.forEach((p) => { p.x *= sx; p.y *= sy; });
          particles.length = Math.min(particles.length, count);
          while (particles.length < count) particles.push(makeParticle(particles.length));
        }
      };

      const queueResize = () => {
        if (resizeQueued) return;
        resizeQueued = true;
        requestAnimationFrame(() => { resizeQueued = false; resize(); });
      };

      const draw = (time) => {
        if (!running) return;
        if (time - lastFrame >= 36) {
          lastFrame = time;
          ctx.clearRect(0, 0, width, height);
          for (const p of particles) {
            p.x += p.vx; p.y += p.vy; p.phase += .018;
            if (p.x < -4) p.x = width + 4;
            if (p.x > width + 4) p.x = -4;
            if (p.y < -4) p.y = height + 4;
            const alpha = Math.max(.02, p.a * (.76 + Math.sin(p.phase) * .24));
            ctx.beginPath();
            ctx.fillStyle = `rgba(108,232,173,${alpha})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        raf = requestAnimationFrame(draw);
      };

      const start = () => { if (!running && !document.hidden) { running = true; raf = requestAnimationFrame(draw); } };
      const stop = () => { running = false; cancelAnimationFrame(raf); };

      resize();
      if ('ResizeObserver' in window) new ResizeObserver(queueResize).observe(galaxyCanvas);
      else addEventListener('resize', queueResize, { passive: true });
      start();
      document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    }
  }

  /* Click ripple only where it does not compete with controls. */
  if (hero && desktopMotion() && canAnimate) {
    let lastRipple = 0;
    hero.addEventListener('pointerdown', (event) => {
      if (event.target.closest('a,button')) return;
      const now = performance.now();
      if (now - lastRipple < 220) return;
      lastRipple = now;
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const ring = document.createElement('span');
      ring.className = 'pointer-ripple';
      ring.setAttribute('aria-hidden', 'true');
      hero.appendChild(ring);
      const animation = ring.animate([
        { opacity: .58, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(.3)` },
        { opacity: 0, transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(8)` }
      ], { duration: 720, easing: 'cubic-bezier(.2,.7,.2,1)' });
      animation.addEventListener('finish', () => ring.remove(), { once: true });
    });
  }
})();
