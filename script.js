const enhancementStyles = document.createElement('link');
enhancementStyles.rel = 'stylesheet';
enhancementStyles.href = 'enhancements.css';
document.head.appendChild(enhancementStyles);

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const projects = {
  finance: {
    title: 'Finance Manager', status: 'SISTEMA REAL → VERSÃO GENÉRICA', visual: 'finance-visual',
    visualHtml: '<div class="ui-window"><div class="ui-top"><b>Finance Manager</b><span>Dashboard</span></div><div class="ui-body"><aside><i></i><i></i><i></i><i></i></aside><section><div class="ui-kpis"><div><small>Receitas</small><strong>R$ 18,4k</strong></div><div><small>Despesas</small><strong>R$ 11,2k</strong></div><div><small>Saldo</small><strong>R$ 7,2k</strong></div></div><div class="ui-chart"><span></span></div></section></div></div>',
    summary: 'Sistema web de gestão financeira para pequenas organizações e equipes, criado a partir de uma necessidade real e publicado em versão genérica.',
    problem: 'Controles financeiros descentralizados, aprovações manuais e dificuldade de consolidar receitas, despesas, comprovantes, contas e relatórios em um único fluxo.',
    solution: 'Aplicação Django com modelagem relacional, usuários com diferentes níveis de acesso, fluxo de aprovação, lançamentos recorrentes, dashboard e geração de relatórios.',
    features: ['Autenticação e permissões por perfil','Receitas, despesas e contas financeiras','Fluxo de aprovação e auditoria','Dashboards e relatórios','Exportação e automação de rotinas'],
    current: 'Versão pública genérica disponível como case de portfólio. A implementação original permanece separada e privada.',
    tech: ['Python','Django','PostgreSQL','Bootstrap','Chart.js'], repo: 'https://github.com/GabrielSantanaBR/finance-manager', service: 'finance'
  },
  pricing: {
    title: 'Pricing & Sales Manager', status: 'DADOS + NEGÓCIO REAL', visual: 'pricing-visual',
    visualHtml: '<div class="sheet-preview"><div class="sheet-title"><b>Pricing & Sales</b><span>Dashboard comercial</span></div><div class="sheet-metrics"><div><small>Receita</small><strong>R$ 8.960</strong></div><div><small>Lucro</small><strong>R$ 3.210</strong></div><div><small>Margem</small><strong>35,8%</strong></div></div><div class="sheet-table"><span>Produto</span><span>Custo</span><span>Preço</span><span>Margem</span><i></i><i></i><i></i><i></i></div></div>',
    summary: 'Solução de precificação e análise comercial baseada em uma planilha operacional real, reconstruída com dados fictícios para apresentação pública.',
    problem: 'Custos de ingredientes, rendimento, margem, preço e vendas precisavam conversar entre si. Alterações de insumos afetavam vários produtos e a análise comercial exigia consolidação manual.',
    solution: 'Modelo centralizado de insumos e receitas com fórmulas encadeadas, precificação por margem, registro multicanal de vendas e dashboard com receita, custo, lucro e desempenho.',
    features: ['Custo unitário de insumos','Receitas e componentes reutilizáveis','Margem e preço sugerido','Vendas por canal','KPIs e dashboard comercial'],
    current: 'Demo pública com valores e produtos fictícios. O repositório também contém um protótipo Python que valida a estrutura do arquivo.',
    tech: ['Excel','Data Modeling','Pricing','Business Analytics','Python'], repo: 'https://github.com/GabrielSantanaBR/bakery-manager', service: 'spreadsheet'
  },
  institutional: {
    title: 'Institutional Site Template', status: 'FULL-STACK', visual: 'site-visual',
    visualHtml: '<div class="browser-preview"><div class="browser-toolbar"><i></i><i></i><i></i><span>nexa.example</span></div><div class="browser-content"><small>SOLUÇÕES DIGITAIS</small><strong>Presença institucional com conteúdo administrável.</strong><div class="browser-actions"><i></i><i></i></div><div class="browser-cards"><span></span><span></span><span></span></div></div></div>',
    summary: 'Template institucional full-stack para empresas, organizações, associações e projetos que precisam de presença digital e conteúdo administrável.',
    problem: 'Sites institucionais frequentemente ficam dependentes do desenvolvedor para pequenas mudanças de conteúdo e perdem consistência conforme novas páginas são adicionadas.',
    solution: 'Arquitetura reutilizável com páginas públicas, conteúdo dinâmico, estrutura para área administrativa e formulário protegido.',
    features: ['Páginas institucionais responsivas','Conteúdo dinâmico','Estrutura administrativa','Formulário protegido','Base reutilizável para novos clientes'],
    current: 'Versão genérica pública criada a partir de um projeto real. Pode ser adaptada para diferentes segmentos.',
    tech: ['TypeScript','React','Next.js','Cloudflare D1'], repo: 'https://github.com/GabrielSantanaBR/institutional-site-template', service: 'site-panel'
  },
  csv: {
    title: 'CSV Sales Analyzer', status: 'ANÁLISE DE DADOS', visual: 'analytics-visual',
    visualHtml: '<div class="analytics-preview"><div class="analytics-title"><b>Sales Analysis</b><span>Resumo de desempenho</span></div><div class="analytics-bars"><i></i><i></i><i></i><i></i><i></i></div><div class="analytics-ranking"><small>Top produtos</small><span>1. Produto B</span><span>2. Produto D</span><span>3. Produto A</span></div></div>',
    summary: 'Pipeline em Python para transformar uma base CSV de vendas em métricas, rankings, relatórios e visualizações.',
    problem: 'Arquivos de vendas isolados dizem pouco sem tratamento. É necessário limpar dados, calcular indicadores e transformar linhas em respostas de negócio.',
    solution: 'Fluxo modular que lê CSV, valida dados, calcula métricas, cria rankings, exporta Excel/CSV e gera gráficos automaticamente.',
    features: ['Limpeza e validação','Faturamento e volume vendido','Ranking de produtos','Exportação Excel/CSV','Gráficos automáticos'],
    current: 'Projeto público funcional voltado a demonstrar fundamentos de análise de dados e automação em Python.',
    tech: ['Python','Pandas','Matplotlib','OpenPyXL'], repo: 'https://github.com/GabrielSantanaBR/csv-sales-analyzer', service: 'data'
  },
  api: {
    title: 'URL Shortener API', status: 'BACKEND', visual: 'api-visual',
    visualHtml: '<div class="api-preview"><div class="api-header"><b>API / docs</b><span>OpenAPI</span></div><div class="endpoint"><strong>POST</strong><code>/shorten</code></div><pre>{ "url": "https://example.com" }\n→ { "code": "a8F2k" }</pre><div class="endpoint get"><strong>GET</strong><code>/r/{code}</code></div></div>',
    summary: 'API REST para criação e gerenciamento de URLs curtas com persistência, redirecionamento e contagem de acessos.',
    problem: 'Um serviço simples de encurtamento exige mais que gerar uma string: precisa validar entradas, persistir relações, resolver redirecionamentos e expor contratos claros.',
    solution: 'API em FastAPI com modelos Pydantic, armazenamento em SQLite, endpoints de criação, consulta, redirecionamento e exclusão, além de Swagger automático.',
    features: ['API REST','Validação com Pydantic','Persistência SQLite','Contagem de acessos','Documentação OpenAPI'],
    current: 'Projeto público de backend usado para demonstrar fundamentos de APIs e persistência.',
    tech: ['Python','FastAPI','SQLite','Pydantic','Uvicorn'], repo: 'https://github.com/GabrielSantanaBR/url-shortener-api', service: 'api'
  },
  riftpilot: {
    title: 'RiftPilot', status: 'EM DESENVOLVIMENTO', visual: 'rift-visual',
    visualHtml: '<div class="rift-preview"><div class="rift-head"><b>RiftPilot</b><span>Live analytics</span></div><div class="rift-body"><div class="rift-map-real"><i></i><i></i><i></i></div><div class="rift-insights"><small>Recomendação atual</small><strong>Priorize objetivo</strong><span>Risco calculado: médio</span><span>Build: adaptação defensiva</span></div></div></div>',
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
  visual.innerHTML = p.visualHtml + '<span class="visual-caption">Representação baseada nas funções do projeto</span>';
  document.getElementById('project-tech').replaceChildren(...p.tech.map(t => { const span = document.createElement('span'); span.textContent = t; return span; }));
  document.getElementById('project-features').replaceChildren(...p.features.map(f => { const li = document.createElement('li'); li.textContent = f; return li; }));
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const serviceField = document.getElementById('service');
  const messageField = document.getElementById('message');
  const serviceMap = {site:'Site institucional','site-panel':'Site com painel interno',finance:'Sistema financeiro',spreadsheet:'Planilha inteligente / automação',data:'Dashboard / análise de dados',api:'API / integração',custom:'Sistema personalizado',other:'Outro projeto'};
  if (serviceMap[params.get('service')]) serviceField.value = serviceMap[params.get('service')];
  if (params.get('project')) messageField.value = `Tenho interesse em um projeto semelhante ao ${params.get('project')}. `;
  const method = document.getElementById('contact-method');
  const value = document.getElementById('contact-value');
  method.addEventListener('change', () => {
    const placeholders = {'E-mail':'seuemail@exemplo.com','WhatsApp':'(DDD) 00000-0000','Telefone':'(DDD) 00000-0000','LinkedIn':'linkedin.com/in/seu-perfil'};
    value.placeholder = placeholders[method.value] || 'E-mail, número ou perfil';
  });
}
