(() => {
  'use strict';

  const root = document.documentElement;
  const topbar = document.querySelector('.topbar');
  const progress = document.querySelector('.scroll-progress');
  const mobileButton = document.querySelector('.mobile-menu-button');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    if (progress) progress.style.setProperty('--scroll', `${pct}%`);
  };
  updateScroll();
  addEventListener('scroll', updateScroll, { passive: true });

  if (!reducedMotion) {
    addEventListener('pointermove', (event) => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    }, { passive: true });
  }

  if (mobileButton && topbar) {
    mobileButton.addEventListener('click', () => {
      const open = topbar.classList.toggle('open');
      mobileButton.setAttribute('aria-expanded', String(open));
      mobileButton.textContent = open ? '×' : '☰';
    });
    topbar.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
      topbar.classList.remove('open');
      mobileButton.setAttribute('aria-expanded', 'false');
      mobileButton.textContent = '☰';
    }));
  }

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-counter]').forEach((node) => {
    const target = Number(node.dataset.counter || 0);
    if (!Number.isFinite(target)) return;
    const suffix = node.dataset.suffix || '';
    const run = () => {
      if (reducedMotion) {
        node.textContent = `${target}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        node.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      observer.observe(node);
    } else run();
  });

  const filters = [...document.querySelectorAll('.repo-filter')];
  const repos = [...document.querySelectorAll('.repo-item')];
  const countNode = document.querySelector('.repo-count');
  const applyFilter = (filter) => {
    let visible = 0;
    repos.forEach((repo) => {
      const tags = `${repo.dataset.tags || ''} ${repo.dataset.kind || ''}`.split(/\s+/);
      const show = filter === 'all' || tags.includes(filter);
      repo.hidden = !show;
      if (show) visible += 1;
    });
    filters.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (countNode) countNode.textContent = `${visible} repositório${visible === 1 ? '' : 's'}`;
  };
  filters.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all')));
  if (filters.length) applyFilter('all');

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ry', `${x * 4.5}deg`);
        card.style.setProperty('--rx', `${y * -4.5}deg`);
        card.style.setProperty('--lift', '-4px');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--lift', '0px');
      });
    });

    document.querySelectorAll('.magnetic').forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        item.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });
      item.addEventListener('pointerleave', () => { item.style.transform = ''; });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
