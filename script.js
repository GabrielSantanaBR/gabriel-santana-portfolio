const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const projects = {
  finance: {
    title: 'Finance Manager', status: 'SISTEMA REAL → VERSÃO GENÉRICA', visual: 'finance-visual',
    visualHtml: '<div class="mini-sidebar"></div><div class="mini-main"><span></span><div class="mini-kpis"><i></i><i></i><i></i></div><div class="mini-chart"></div></div>',
    summary: 'Sistema web de gestão financeira para pequenas organizações e equipes, criado a partir de uma necessidade real e publicado em versão genérica.',
    problem: 'Controles financeiros descentralizados, aprovações manuais e dificuldade de consolidar receitas, despesas, comprovantes, contas e relatórios em um único fluxo.',
    solution: 'Aplicação Django com modelagem relacional, usuários com diferentes níveis de acesso, fluxo de aprovação, lançamentos recorrentes, dashboard e geração de relatórios.',
    features: ['Autenticação e permissões por perfil','Receitas, despesas e contas financeiras','Fluxo de aprovação e auditoria','Dashboards e relatórios','Exportação e automação de rotinas'],
    current: 'Versão pública genérica disponível como case de portfólio. A implementação original permanece separada e privada.',
    tech: ['Python','Django','PostgreSQL','Bootstrap','Chart.js'], repo: 'https://github.com/GabrielSantanaBR/finance-manager', service: 'finance'
  },
  pricing: {
    title: 'Pricing & Sales Manager', status: 'DADOS + NEGÓCIO REAL', visual: 'pricing-visual',
    visualHtml: '<div class="sheet-head"></div><div class="sheet-grid"></div><div class="sheet-chart"></div>',
    summary: 'Solução de precificação e análise comercial baseada em uma planilha operacional real, reconstruída com dados fictícios para apresentação pública.',
    problem: 'Custos de ingredientes, rendimento, margem, preço e vendas precisavam conversar entre si. Alterações de insumos afetavam vários produtos e a análise comercial exigia consolidação manual.',
    solution: 'Modelo centralizado de insumos e receitas com fórmulas encadeadas, precificação por margem, registro multicanal de vendas e dashboard com receita, custo, lucro e desempenho.',
    features: ['Custo unitário de insumos','Receitas e componentes reutilizáveis','Margem e preço sugerido','Vendas por canal','KPIs e dashboard comercial'],
    current: 'Demo pública com valores e produtos fictícios. O repositório também contém um protótipo Python que valida a estrutura do arquivo.',
    tech: ['Excel','Data Modeling','Pricing','Business Analytics','Python'], repo: 'https://github.com/GabrielSantanaBR/bakery-manager', service: 'spreadsheet'
  },
  institutional: {
    title: 'Institutional Site Template', status: 'FULL-STACK', visual: 'site-visual',
    visualHtml: '<div class="browser-bar"></div><div class="site-hero"></div><div class="site-cards"><i></i><i></i><i></i></div>',
    summary: 'Template institucional full-stack para empresas, organizações, associações e projetos que precisam de presença digital e conteúdo administrável.',
    problem: 'Sites institucionais frequentemente ficam dependentes do desenvolvedor para pequenas mudanças de conteúdo e perdem consistência conforme novas páginas são adicionadas.',
    solution: 'Arquitetura reutilizável com páginas públicas, conteúdo dinâmico, estrutura para área administrativa e formulário protegido.',
    features: ['Páginas institucionais responsivas','Conteúdo dinâmico','Estrutura administrativa','Formulário protegido','Base reutilizável para novos clientes'],
    current: 'Versão genérica pública criada a partir de um projeto real. Pode ser adaptada para diferentes segmentos.',
    tech: ['TypeScript','React','Next.js','Cloudflare D1'], repo: 'https://github.com/GabrielSantanaBR/institutional-site-template', service: 'site-panel'
  },
  csv: {
    title: 'CSV Sales Analyzer', status: 'ANÁLISE DE DADOS', visual: 'analytics-visual',
    visualHtml: '<div class="bars"><i></i><i></i><i></i><i></i><i></i></div><div class="analytics-list"><span></span><span></span><span></span></div>',
    summary: 'Pipeline em Python para transformar uma base CSV de vendas em métricas, rankings, relatórios e visualizações.',
    problem: 'Arquivos de vendas isolados dizem pouco sem tratamento. É necessário limpar dados, calcular indicadores e transformar linhas em respostas de negócio.',
    solution: 'Fluxo modular que lê CSV, valida dados, calcula métricas, cria rankings, exporta Excel/CSV e gera gráficos automaticamente.',
    features: ['Limpeza e validação','Faturamento e volume vendido','Ranking de produtos','Exportação Excel/CSV','Gráficos automáticos'],
    current: 'Projeto público funcional voltado a demonstrar fundamentos de análise de dados e automação em Python.',
    tech: ['Python','Pandas','Matplotlib','OpenPyXL'], repo: 'https://github.com/GabrielSantanaBR/csv-sales-analyzer', service: 'data'
  },
  api: {
    title: 'URL Shortener API', status: 'BACKEND', visual: 'api-visual',
    visualHtml: '<div class="api-method">POST</div><div class="api-line"></div><div class="api-code">{ /shorten }</div><div class="api-response"></div>',
    summary: 'API REST para criação e gerenciamento de URLs curtas com persistência, redirecionamento e contagem de acessos.',
    problem: 'Um serviço simples de encurtamento exige mais que gerar uma string: precisa validar entradas, persistir relações, resolver redirecionamentos e expor contratos claros.',
    solution: 'API em FastAPI com modelos Pydantic, armazenamento em SQLite, endpoints de criação, consulta, redirecionamento e exclusão, além de Swagger automático.',
    features: ['API REST','Validação com Pydantic','Persistência SQLite','Contagem de acessos','Documentação OpenAPI'],
    current: 'Projeto público de backend usado para demonstrar fundamentos de APIs e persistência.',
    tech: ['Python','FastAPI','SQLite','Pydantic','Uvicorn'], repo: 'https://github.com/GabrielSantanaBR/url-shortener-api', service: 'api'
  },
  riftpilot: {
    title: 'RiftPilot', status: 'EM DESENVOLVIMENTO', visual: 'rift-visual',
    visualHtml: '<div class="rift-map"></div><div class="rift-panel"><span></span><span></span><span></span></div><div class="rift-score">87</div>',
    summary: 'Assistente analítico para League of Legends pensado como aplicação desktop com serviço local de analytics e recomendações explicáveis.',
    problem: 'Durante uma partida há muitas decisões contextuais — matchup, itens, objetivos e rotações — e recomendações genéricas não consideram suficientemente o estado atual do jogo.',
    solution: 'Arquitetura incremental: primeiro modelar e normalizar o estado observável da partida, depois aplicar regras explicáveis e, futuramente, explorar modelos estatísticos onde fizer sentido.',
    features: ['Serviço local FastAPI','Modelos Pydantic','Testes e linting','Arquitetura documentada','Roadmap para analytics e recomendações'],
    current: 'Fundação técnica em andamento. O serviço de analytics possui health endpoint, testes automatizados e cobertura mínima configurada. Funcionalidades de recomendação ainda fazem parte do roadmap.',
    tech: ['Python 3.13','FastAPI','Pydantic','Pytest','Ruff','Analytics'], repo: 'https://github.com/GabrielSantanaBR/riftpilot', service: 'custom'
  }
};

const detail = document.getElementById('project-detail');
if (detail) {
  const id = new URLSearchParams(window.location.search).get('id') || 'finance';
  const p = projects[id] || projects.finance;
  document.title = `${p.title} — Gabriel Santana`;
  document.getElementById('project-title').textContent = p.title;
  document.getElementById('project-breadcrumb').textContent = p.title;
  document.getElementById('project-status').textContent = p.status;
  document.getElementById('project-summary').textContent = p.summary;
  document.getElementById('project-problem').textContent = p.problem;
  document.getElementById('project-solution').textContent = p.solution;
  document.getElementById('project-current').textContent = p.current;
  document.getElementById('project-repo').href = p.repo;
  document.getElementById('project-contact').href = `contact.html?service=${encodeURIComponent(p.service)}&project=${encodeURIComponent(p.title)}`;
  const visual = document.getElementById('project-visual');
  visual.classList.add(p.visual);
  visual.innerHTML = p.visualHtml;
  document.getElementById('project-tech').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');
  document.getElementById('project-features').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const serviceField = document.getElementById('service');
  const messageField = document.getElementById('message');
  if (params.get('service')) serviceField.value = params.get('service');
  if (params.get('project')) messageField.value = `Tenho interesse em conversar sobre um projeto semelhante ao ${params.get('project')}. `;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const labels = {
      site:'Site institucional','site-panel':'Site com painel interno',finance:'Sistema financeiro',spreadsheet:'Planilha inteligente / automação',data:'Dashboard / análise de dados',api:'API / integração',custom:'Sistema personalizado',other:'Outro projeto'
    };
    const parts = [
      `Olá, Gabriel! Meu nome é ${data.get('name')}.`,
      `Tenho interesse em: ${labels[data.get('service')] || data.get('service')}.`,
      data.get('company') ? `Empresa/organização: ${data.get('company')}.` : '',
      `Projeto: ${data.get('message')}`,
      data.get('budget') ? `Faixa de investimento: ${data.get('budget')}.` : ''
    ].filter(Boolean);
    const target = ['55','21','97391','0770'].join('');
    window.open(`https://wa.me/${target}?text=${encodeURIComponent(parts.join('\n\n'))}`, '_blank', 'noopener');
  });
}
