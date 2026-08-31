(() => {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Keep the legacy prices.html URL for compatibility, but present it as Services everywhere. */
  document.querySelectorAll('a[href="prices.html"]').forEach((link) => {
    if ((link.textContent || '').trim().toLowerCase() === 'preços') {
      link.textContent = 'Serviços';
    }
  });

  /* The services page has an isolated layout so global portfolio CSS cannot distort it. */
  if (document.querySelector('.pricing-page') && !document.querySelector('link[href="pricing.css"]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'pricing.css';
    document.head.appendChild(stylesheet);
  }

  const filters = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.project-card[data-category]')];
  if (filters.length && cards.length) {
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';
        filters.forEach((item) => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        cards.forEach((card) => {
          const categories = (card.dataset.category || '').split(/\s+/);
          card.hidden = filter !== 'all' && !categories.includes(filter);
        });
      });
    });
  }

  const legacy = document.querySelector('[data-legacy-project]');
  if (legacy) {
    const routes = Object.freeze({
      clientflow: 'clientflow.html',
      decisionforge: 'decisionforge-ai.html',
      curtailment: 'curtailment-intelligence.html',
      finance: 'gestao-financeira.html',
      pricing: 'precificacao-vendas.html',
      institutional: 'site-institucional-painel.html',
      csv: 'analise-vendas.html',
      riftpilot: 'riftpilot.html'
    });
    const id = new URLSearchParams(location.search).get('id');
    const target = routes[id] || 'index.html#projetos';
    const link = document.getElementById('legacy-project-link');
    if (link) link.href = target;
    const message = document.getElementById('legacy-project-message');
    if (message) message.textContent = id && routes[id] ? 'Esse projeto agora tem uma página própria.' : 'Escolha um projeto na nova vitrine.';
    if (id && routes[id]) location.replace(target);
  }
})();
