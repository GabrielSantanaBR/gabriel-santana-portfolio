(() => {
  'use strict';

  const form = document.getElementById('secure-contact-form');
  if (!form) return;

  const serviceField = document.getElementById('service');
  const messageField = document.getElementById('message');
  const methodField = document.getElementById('contact-method');
  const contactField = document.getElementById('contact-value');
  const status = document.getElementById('form-status');
  const submitButton = form.querySelector('button[type="submit"]');

  const serviceMap = Object.freeze({
    clientflow: 'Agenda / CRM de clientes',
    landing: 'Landing page comercial',
    site: 'Site institucional',
    'site-panel': 'Site com painel interno',
    finance: 'Sistema financeiro',
    spreadsheet: 'Planilha inteligente / automação',
    data: 'Dashboard / análise de dados',
    ai: 'IA / análise inteligente',
    api: 'API / integração',
    custom: 'MVP / sistema personalizado',
    other: 'Outro projeto'
  });

  const cleanText = (value, limit = 2500) => String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\s{3,}/g, ' ')
    .trim()
    .slice(0, limit);

  const params = new URLSearchParams(location.search);
  const mappedService = serviceMap[params.get('service')];
  if (mappedService && serviceField) serviceField.value = mappedService;

  const requestedProject = cleanText(params.get('project'), 80);
  if (requestedProject && messageField) {
    messageField.value = `Tenho interesse em um projeto semelhante ao ${requestedProject}. `;
  }

  const contactConfig = Object.freeze({
    'E-mail': { placeholder: 'seuemail@exemplo.com', inputMode: 'email', autocomplete: 'email' },
    'WhatsApp': { placeholder: '(DDD) 00000-0000', inputMode: 'tel', autocomplete: 'tel' },
    'Telefone': { placeholder: '(DDD) 00000-0000', inputMode: 'tel', autocomplete: 'tel' },
    'LinkedIn': { placeholder: 'linkedin.com/in/seu-perfil', inputMode: 'url', autocomplete: 'url' }
  });

  const syncContactField = () => {
    if (!methodField || !contactField) return;
    const config = contactConfig[methodField.value];
    contactField.placeholder = config?.placeholder || 'E-mail, número ou perfil';
    contactField.inputMode = config?.inputMode || 'text';
    contactField.autocomplete = config?.autocomplete || 'off';
    contactField.setCustomValidity('');
  };

  const validateContact = () => {
    if (!methodField || !contactField) return true;
    const value = cleanText(contactField.value, 120);
    let valid = value.length >= 5;

    if (methodField.value === 'E-mail') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
    } else if (methodField.value === 'WhatsApp' || methodField.value === 'Telefone') {
      valid = /^\+?[0-9()\s.-]{8,25}$/.test(value) && value.replace(/\D/g, '').length >= 8;
    } else if (methodField.value === 'LinkedIn') {
      valid = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-z0-9%._-]+\/?$/i.test(value);
    }

    contactField.setCustomValidity(valid ? '' : 'Confira o formato do contato informado.');
    return valid;
  };

  methodField?.addEventListener('change', syncContactField);
  contactField?.addEventListener('input', () => contactField.setCustomValidity(''));
  syncContactField();

  const normalizedPayload = () => {
    const data = new FormData(form);
    const payload = {};
    for (const [key, value] of data.entries()) {
      payload[key] = typeof value === 'string' ? cleanText(value, key === 'Descrição' ? 2500 : 160) : value;
    }
    return payload;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    validateContact();
    if (!form.reportValidity()) return;

    const lastAttempt = Number(sessionStorage.getItem('portfolio-contact-attempt') || 0);
    if (Date.now() - lastAttempt < 15000) {
      status.textContent = 'Aguarde alguns segundos antes de tentar enviar novamente.';
      status.classList.add('form-error');
      return;
    }

    const payload = normalizedPayload();
    if (payload.botcheck) return;

    const description = cleanText(payload['Descrição'], 2500);
    if (description.length < 30) {
      messageField.setCustomValidity('Descreva o projeto com pelo menos 30 caracteres.');
      messageField.reportValidity();
      return;
    }
    messageField.setCustomValidity('');

    sessionStorage.setItem('portfolio-contact-attempt', String(Date.now()));
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    status.textContent = 'Enviando seu briefing...';
    status.classList.remove('form-error');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        if (response.status === 429) throw new Error('RATE_LIMIT');
        throw new Error('SUBMIT_FAILED');
      }

      location.assign('thanks.html');
    } catch (error) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
      if (error.name === 'AbortError') {
        status.textContent = 'O envio demorou mais que o esperado. Verifique sua conexão e tente novamente.';
      } else if (error.message === 'RATE_LIMIT') {
        status.textContent = 'Muitas tentativas em pouco tempo. Aguarde um pouco e tente novamente.';
      } else {
        status.textContent = 'Não foi possível enviar agora. Tente novamente em alguns minutos.';
      }
      status.classList.add('form-error');
    } finally {
      clearTimeout(timeout);
    }
  });
})();
