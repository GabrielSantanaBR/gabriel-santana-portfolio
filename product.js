(() => {
  'use strict';

  const page = document.querySelector('[data-product-page]');
  if (!page) return;

  const id = page.dataset.product;
  const products = {
    clientflow: {
      brand:'ClientFlow', category:'Produto comercial', title:'Agenda e CRM para negócios de serviços',
      problem:'Horários, clientes, serviços, orçamentos e mensagens costumam ficar espalhados entre WhatsApp, agenda e anotações. Isso aumenta retrabalho e dificulta acompanhar a operação.',
      solution:'Uma interface única para organizar agenda, clientes, serviços, orçamentos e comunicação, com uma página pública de agendamento e estrutura preparada para evoluir para uma operação multiusuário.',
      features:['Agenda com status de atendimento','Cadastro de clientes e histórico','Serviços, duração e valores','Orçamentos e follow-up','Mensagens prontas para WhatsApp','Página pública de agendamento','Experiência responsiva e PWA'],
      flow:[['Receber','O cliente solicita um horário pela página pública ou atendimento.'],['Organizar','Agenda, cliente e serviço ficam registrados em um único fluxo.'],['Acompanhar','A operação acompanha status, orçamento e comunicação sem perder contexto.']],
      tech:['JavaScript','Responsive UI','PWA','LocalStorage','CRM','Scheduling'],
      architecture:'A demonstração pública é deliberadamente estática e usa armazenamento local para permitir teste imediato. A versão comercial pode receber autenticação, banco persistente, equipe, pagamentos e integrações oficiais.',
      evolution:'Próximas evoluções comerciais: múltiplos profissionais, permissões, banco PostgreSQL/Supabase, pagamentos, lembretes automáticos e WhatsApp Business API.',
      repo:'https://github.com/GabrielSantanaBR/clientflow', demo:'https://gabrielsantanabr.github.io/clientflow/', service:'clientflow', next:['decisionforge-ai.html','Análise Inteligente de Dados'], demoType:'clientflow'
    },
    decisionforge: {
      brand:'DecisionForge AI', category:'Dados & IA', title:'Análise inteligente de dados para apoiar decisões',
      problem:'Uma planilha pode mostrar números, mas não necessariamente revela dados inconsistentes, anomalias, grupos, variáveis que mais influenciam o resultado ou o que tende a acontecer depois.',
      solution:'Um pipeline que recebe CSV/XLSX, avalia a qualidade da base, detecta anomalias, segmenta registros, identifica drivers, gera previsão e transforma o resultado em uma leitura executiva explicável.',
      features:['Leitura de CSV e XLSX','Data Quality Engine','Isolation Forest para anomalias','K-Means com seleção por silhouette','Driver analysis com Mutual Information','Forecasting com Random Forest','Insights explicáveis','API, Docker, testes e CI'],
      flow:[['Diagnosticar','A base é validada e recebe uma leitura de qualidade antes dos modelos.'],['Modelar','Anomalias, segmentos, drivers e previsão são calculados por módulos independentes.'],['Explicar','Os resultados são convertidos em sinais e recomendações legíveis para decisão.']],
      tech:['Python','FastAPI','Pandas','scikit-learn','OpenPyXL','Docker'],
      architecture:'A inteligência principal roda localmente e não depende de uma API paga. O projeto separa ingestão, qualidade, modelagem, explicação e API para facilitar testes e evolução.',
      evolution:'Pode evoluir para modelos específicos por segmento, experiment tracking, autenticação, persistência de análises e conectores para bancos e sistemas empresariais.',
      repo:'https://github.com/GabrielSantanaBR/decisionforge-ai', demo:null, service:'ai', next:['curtailment-intelligence.html','IA para Risco Energético'], demoType:'decision'
    },
    curtailment: {
      brand:'Curtailment Intelligence', category:'IA + Energia', title:'Previsão de risco e otimização para energia renovável',
      problem:'Restrições de geração eólica e solar exigem antecipar risco, estimar energia potencialmente restringida e comparar respostas possíveis sob limites técnicos.',
      solution:'Uma plataforma de apoio à decisão que combina classificação, regressão, explicabilidade, otimização linear e cálculo de impacto para analisar cenários de curtailment.',
      features:['Predição de risco de curtailment','Estimativa de energia restringida','PR-AUC, ROC-AUC, F1 e calibração','Explicação dos principais drivers','Otimização de bateria/carga flexível','Impacto em MWh e valor preservado','Adapter para dados do ONS','Docker, testes e CI'],
      flow:[['Antecipar','O modelo estima a probabilidade e intensidade do risco no horizonte analisado.'],['Entender','A camada de explicabilidade mostra quais variáveis estão pressionando o cenário.'],['Otimizar','Um modelo linear compara ações possíveis e estima energia/valor preservados.']],
      tech:['Python','FastAPI','SQLAlchemy','scikit-learn','SciPy','PostgreSQL'],
      architecture:'O projeto separa dados, modelos de previsão, explicabilidade, persistência e otimização. Dados sintéticos são explicitamente diferenciados de medições reais.',
      evolution:'A evolução natural é ampliar a integração com dados oficiais, calibrar modelos com séries reais, testar estratégias operacionais e acompanhar performance ao longo do tempo.',
      repo:'https://github.com/GabrielSantanaBR/curtailment-intelligence', demo:null, service:'ai', next:['gestao-financeira.html','Sistema de Gestão Financeira'], demoType:'curtailment'
    },
    finance: {
      brand:'Finance Manager', category:'Sistema web', title:'Sistema de gestão financeira para equipes e organizações',
      problem:'Receitas, despesas, comprovantes, aprovações e contas perdem rastreabilidade quando são controlados em arquivos e conversas separados.',
      solution:'Uma aplicação web com usuários, permissões, lançamentos, aprovações, auditoria, dashboard e relatórios em um fluxo centralizado.',
      features:['Autenticação e perfis de acesso','Receitas, despesas e contas','Fluxo de aprovação','Auditoria e histórico','Dashboard por período','Relatórios e exportações','Rotinas recorrentes'],
      flow:[['Registrar','O usuário lança receitas ou despesas seguindo as regras da organização.'],['Aprovar','Perfis autorizados revisam e aprovam o movimento quando necessário.'],['Consolidar','Dashboard, relatórios e auditoria usam a mesma base de dados.']],
      tech:['Python','Django','PostgreSQL','Bootstrap','Chart.js'],
      architecture:'Aplicação Django com banco relacional e regras de acesso por perfil. A versão pública é genérica e não expõe informações de operações reais.',
      evolution:'Pode receber centros de custo, conciliação, integrações bancárias, anexos em storage, notificações e módulos específicos para cada operação.',
      repo:'https://github.com/GabrielSantanaBR/finance-manager', demo:null, service:'finance', next:['precificacao-vendas.html','Precificação e Análise de Vendas'], demoType:'finance'
    },
    pricing: {
      brand:'Pricing & Sales Manager', category:'Dados + negócio', title:'Precificação e análise de vendas em uma única solução',
      problem:'Custo, rendimento, margem, preço e vendas deixam de conversar quando cada cálculo vive em uma planilha ou anotação diferente.',
      solution:'Um modelo centralizado para cadastrar insumos e receitas, calcular custo e preço, registrar vendas e acompanhar os indicadores comerciais mais importantes.',
      features:['Custos unitários e insumos','Receitas e componentes reutilizáveis','Margem e preço sugerido','Vendas por canal','KPIs comerciais','Dashboard de acompanhamento'],
      flow:[['Calcular','Custos e rendimento alimentam automaticamente a precificação.'],['Vender','As vendas registradas usam os produtos e preços da mesma base.'],['Analisar','Receita, lucro e margem ficam disponíveis em uma visão consolidada.']],
      tech:['Excel','Data Modeling','Business Analytics','Python'],
      architecture:'A versão de portfólio usa produtos e valores fictícios, preservando o raciocínio de modelagem sem expor dados de uma operação real.',
      evolution:'Pode evoluir para aplicação web, múltiplos usuários, importação automática de compras, integração com vendas e análises de mix e rentabilidade.',
      repo:'https://github.com/GabrielSantanaBR/bakery-manager', demo:null, service:'spreadsheet', next:['site-institucional-painel.html','Site Institucional com Painel'], demoType:'pricing'
    },
    institutional: {
      brand:'Institutional Site Template', category:'Web + painel', title:'Site institucional com conteúdo administrável',
      problem:'Um site perde valor quando qualquer alteração simples depende do desenvolvedor ou quando novos conteúdos quebram o padrão visual.',
      solution:'Uma base institucional responsiva com conteúdo dinâmico, painel interno e estrutura reutilizável para diferentes segmentos.',
      features:['Páginas institucionais responsivas','Conteúdo dinâmico','Área administrativa','Formulário protegido','Estrutura reutilizável','Base para agenda, galeria e publicações'],
      flow:[['Publicar','A organização mantém a presença institucional com uma estrutura profissional.'],['Atualizar','Conteúdos recorrentes podem ser alterados pela área administrativa.'],['Evoluir','Novos módulos entram sem reconstruir a base do site.']],
      tech:['TypeScript','React','Next.js','Cloudflare D1'],
      architecture:'O projeto separa experiência pública e gestão de conteúdo. A versão pública é genérica e serve como base demonstrável para personalizações.',
      evolution:'Pode receber autenticação avançada, mídia em storage, analytics, agenda, integrações, múltiplos editores e módulos específicos.',
      repo:'https://github.com/GabrielSantanaBR/institutional-site-template', demo:null, service:'site-panel', next:['analise-vendas.html','Análise Automatizada de Vendas'], demoType:'institutional'
    },
    csv: {
      brand:'CSV Sales Analyzer', category:'Análise de dados', title:'Análise automatizada de vendas a partir de CSV',
      problem:'Um arquivo de vendas isolado não oferece decisão pronta: é preciso validar, limpar, calcular métricas, ordenar produtos e transformar números em leitura.',
      solution:'Um pipeline em Python que recebe CSV, trata a base, calcula métricas, exporta resultados e gera visualizações automaticamente.',
      features:['Limpeza e validação','Faturamento e volume vendido','Ranking de produtos','Exportação Excel/CSV','Gráficos automáticos','Fluxo reproduzível'],
      flow:[['Ler','O arquivo entra no pipeline com validação e normalização.'],['Calcular','Métricas e rankings são produzidos de forma reproduzível.'],['Entregar','Resultados podem ser exportados e visualizados sem refazer o processo manualmente.']],
      tech:['Python','Pandas','Matplotlib','OpenPyXL'],
      architecture:'Projeto modular de análise de dados com separação entre entrada, tratamento, métricas, exportação e visualização.',
      evolution:'Pode receber banco de dados, interface web, agendamento de cargas, comparação temporal e integração com fontes externas.',
      repo:'https://github.com/GabrielSantanaBR/csv-sales-analyzer', demo:null, service:'data', next:['riftpilot.html','Assistente Analítico para League of Legends'], demoType:'csv'
    },
    riftpilot: {
      brand:'RiftPilot', category:'Analytics experimental', title:'Assistente analítico para League of Legends',
      problem:'Itens, objetivos, rotações e risco mudam com o estado da partida. Recomendações genéricas ignoram contexto e podem ser difíceis de justificar.',
      solution:'Uma arquitetura incremental para normalizar informações observáveis da partida e gerar recomendações explicáveis antes de incorporar modelos mais complexos.',
      features:['Serviço local FastAPI','Modelos Pydantic','Regras explicáveis','Testes e linting','Arquitetura documentada','Roadmap de analytics'],
      flow:[['Observar','O estado disponível é normalizado em uma representação consistente.'],['Interpretar','Regras e sinais avaliam risco, objetivos e alternativas.'],['Recomendar','A saída explica a sugestão em vez de retornar apenas uma resposta opaca.']],
      tech:['Python 3.13','FastAPI','Pydantic','Pytest','Ruff'],
      architecture:'O projeto está em construção e prioriza uma base simples, testável e explicável antes de adicionar captura de dados ou modelos estatísticos.',
      evolution:'Próximos passos incluem mais regras contextuais, histórico de partidas, avaliação quantitativa e integração com fontes de dados permitidas.',
      repo:'https://github.com/GabrielSantanaBR/riftpilot', demo:null, service:'custom', next:['clientflow.html','Agenda e CRM para Serviços'], demoType:'riftpilot'
    }
  };

  const product = products[id];
  if (!product) return;

  const byId = (name) => document.getElementById(name);
  byId('product-problem').textContent = product.problem;
  byId('product-solution').textContent = product.solution;
  byId('product-architecture').textContent = product.architecture;
  byId('product-evolution').textContent = product.evolution;

  const featureList = byId('product-features');
  featureList.replaceChildren(...product.features.map((item) => {
    const li = document.createElement('li'); li.textContent = item; return li;
  }));

  const flow = byId('product-flow');
  flow.replaceChildren(...product.flow.map(([title, text], index) => {
    const article = document.createElement('article'); article.className = 'flow-step';
    const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2,'0');
    const strong = document.createElement('strong'); strong.textContent = title;
    const p = document.createElement('p'); p.textContent = text;
    article.append(number,strong,p); return article;
  }));

  const tech = byId('product-tech');
  tech.replaceChildren(...product.tech.map((item) => {
    const span = document.createElement('span'); span.textContent = item; return span;
  }));

  const repo = byId('product-repo'); repo.href = product.repo;
  const demo = byId('product-demo-link');
  if (product.demo) { demo.href = product.demo; demo.hidden = false; } else demo.hidden = true;
  byId('product-contact').href = `contact.html?service=${encodeURIComponent(product.service)}&project=${encodeURIComponent(product.title)}`;
  byId('product-next-link').href = product.next[0];
  byId('product-next-title').textContent = product.next[1];

  const renderDemo = () => {
    const target = byId('product-live-demo');
    const toolbar = (name, label) => `<div class="demo-window"><div class="demo-toolbar"><span class="demo-dots"><i></i><i></i><i></i></span><b>${name}</b><span>${label}</span></div><div class="demo-body">`;
    const close = '</div></div>';
    const demos = {
      clientflow: `${toolbar('Agenda & CRM','hoje')}<div class="demo-kpis"><div><small>ATENDIMENTOS</small><strong>4</strong><span>3 confirmados</span></div><div><small>RECEITA</small><strong>R$ 335</strong><span>estimada</span></div><div><small>CLIENTES</small><strong>5</strong><span>ativos</span></div></div><div class="demo-list"><div><small>09:30</small><b>Lucas Almeida · Corte premium</b><span class="demo-status">Confirmado</span></div><div><small>11:00</small><b>Rafael Costa · Pacote completo</b><span class="demo-status">Confirmado</span></div><div><small>14:30</small><b>Bruno Martins · Consultoria</b><span class="demo-status">Pendente</span></div></div>${close}`,
      decision: `${toolbar('Análise inteligente','dataset atual')}<div class="demo-score"><div><small>QUALIDADE DOS DADOS</small><strong>94.8</strong><span>/100</span></div><div><small>SINAIS PRIORITÁRIOS</small><strong>7</strong><span>3 críticos</span></div></div><div class="demo-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>${close}`,
      curtailment: `${toolbar('Risco energético','próximas 6h')}<div class="demo-score"><div><small>RISCO</small><strong>72%</strong><span>elevado</span></div><div><small>ENERGIA EM RISCO</small><strong>18.4</strong><span>MWh</span></div></div><div class="demo-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>${close}`,
      finance: `${toolbar('Gestão financeira','visão mensal')}<div class="demo-kpis"><div><small>RECEITAS</small><strong>R$ 18,4k</strong><span>mês</span></div><div><small>DESPESAS</small><strong>R$ 11,2k</strong><span>mês</span></div><div><small>SALDO</small><strong>R$ 7,2k</strong><span>positivo</span></div></div><div class="demo-list"><div><small>Hoje</small><b>3 lançamentos aguardando revisão</b><span class="demo-status">Revisar</span></div><div><small>Mês</small><b>42 movimentos consolidados</b><span class="demo-status">OK</span></div></div>${close}`,
      pricing: `${toolbar('Precificação & vendas','resumo comercial')}<div class="demo-kpis"><div><small>RECEITA</small><strong>R$ 8.960</strong><span>período</span></div><div><small>LUCRO</small><strong>R$ 3.210</strong><span>estimado</span></div><div><small>MARGEM</small><strong>35,8%</strong><span>média</span></div></div><div class="demo-list"><div><small>A</small><b>Produto A · custo R$ 4,20</b><span class="demo-status">53%</span></div><div><small>B</small><b>Produto B · custo R$ 22,80</b><span class="demo-status">52%</span></div></div>${close}`,
      institutional: `${toolbar('Site + painel','conteúdo')}<div class="demo-score"><div><small>PÁGINAS</small><strong>6</strong><span>publicadas</span></div><div><small>CONTEÚDOS</small><strong>18</strong><span>administráveis</span></div></div><div class="demo-list"><div><small>Home</small><b>Apresentação institucional</b><span class="demo-status">Online</span></div><div><small>Agenda</small><b>Conteúdo atualizado pelo painel</b><span class="demo-status">Editável</span></div><div><small>Contato</small><b>Formulário protegido</b><span class="demo-status">Ativo</span></div></div>${close}`,
      csv: `${toolbar('Análise de vendas','CSV processado')}<div class="demo-kpis"><div><small>REGISTROS</small><strong>1.284</strong><span>válidos</span></div><div><small>FATURAMENTO</small><strong>R$ 47k</strong><span>calculado</span></div><div><small>PRODUTOS</small><strong>32</strong><span>ranqueados</span></div></div><div class="demo-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>${close}`,
      riftpilot: `${toolbar('Assistente analítico','estado atual')}<div class="demo-score"><div><small>RISCO</small><strong>Médio</strong><span>objetivo próximo</span></div><div><small>PRIORIDADE</small><strong>Visão</strong><span>antes da luta</span></div></div><div class="demo-list"><div><small>01</small><b>Evitar contestar sem visão lateral</b><span class="demo-status">Macro</span></div><div><small>02</small><b>Preservar recurso para o objetivo</b><span class="demo-status">Plano</span></div></div>${close}`
    };
    target.innerHTML = demos[product.demoType];
  };
  renderDemo();

  const tabs = [...document.querySelectorAll('.product-tab')];
  const panels = [...document.querySelectorAll('.product-panel')];
  const activate = (name) => {
    tabs.forEach((tab) => { const active = tab.dataset.tab === name; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); });
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === name));
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab.dataset.tab)));
})();
