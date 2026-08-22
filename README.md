# Gabriel Santana — Portfolio

Portfólio profissional com foco em **Dados, desenvolvimento de software, automação e Inteligência Artificial aplicada**.

Site público: **https://gabrielsantanabr.github.io/gabriel-santana-portfolio/**

## Projetos em destaque

- **[ClientFlow](https://github.com/GabrielSantanaBR/clientflow)** — produto demonstrável para agenda, clientes, serviços, orçamentos e atendimento de pequenos negócios.
- **[DecisionForge AI](https://github.com/GabrielSantanaBR/decisionforge-ai)** — decision intelligence para CSV/XLSX com data quality, anomalias, segmentação, driver analysis, forecasting e insights explicáveis.
- **[Curtailment Intelligence](https://github.com/GabrielSantanaBR/curtailment-intelligence)** — previsão, explicabilidade e otimização de cenários para curtailment em geração renovável.
- **[Finance Manager](https://github.com/GabrielSantanaBR/finance-manager)** — sistema financeiro genérico em Django com regras de negócio, permissões, relatórios e auditoria.
- **[Pricing & Sales Manager](https://github.com/GabrielSantanaBR/bakery-manager)** — case de precificação e análise comercial com custos, margem, vendas e dashboard.
- **[Institutional Site Template](https://github.com/GabrielSantanaBR/institutional-site-template)** — template institucional full-stack com conteúdo dinâmico e arquitetura administrativa.
- **[CSV Sales Analyzer](https://github.com/GabrielSantanaBR/csv-sales-analyzer)** — pipeline de análise de vendas com Python, Pandas, exportações e visualizações.
- **[RiftPilot](https://github.com/GabrielSantanaBR/riftpilot)** — assistente analítico em desenvolvimento com backend FastAPI e arquitetura para recomendações explicáveis.

## Direção visual

O site usa um design system próprio em verde escuro com referências de composição e interação estudadas em **Unlumen UI, GetLayers e MotionSites**. As referências são usadas como direção de design — hierarquia, profundidade, motion, bento layouts, navegação e atmosfera — sem copiar templates proprietários.

A implementação visual é dividida em:

- `styles.css`: estrutura e componentes-base;
- `backup-sites.css`: composição editorial/cinematográfica e acabamento inspirado nas referências salvas;
- `video-effects.css`: galaxy ambience, ripple, spotlight, marquee, tipografia e microinterações;
- `portfolio-proof.css`: seção de base profissional;
- `effects.js`: animações e interações feitas com **Web Animations API, IntersectionObserver e Canvas nativos**.

O runtime visual não depende mais de bibliotecas JavaScript externas. A implementação respeita `prefers-reduced-motion`, limita densidade/DPR do canvas, pausa o efeito ambiente quando a aba fica oculta e mantém o conteúdo essencial no HTML mesmo sem JavaScript.

## Critério do portfólio

Projetos derivados de trabalhos ou necessidades reais são publicados apenas em versões genéricas e anonimizadas. Exercícios de cursos, forks e repositórios de terceiros não são tratados como projetos principais.

## Tecnologias destacadas

Python, SQL, Django, FastAPI, PostgreSQL, SQLAlchemy, Pandas, scikit-learn, SciPy, Excel, OpenPyXL, JavaScript/TypeScript, React, Next.js, HTML e CSS.

## Segurança

O portfólio é estático e não possui banco de dados ou autenticação própria. A configuração inclui CSP restritiva com scripts locais, validação e normalização do formulário, honeypot, timeout, cooldown de envio, `credentials: omit`, `referrerPolicy: no-referrer`, 404 própria e `security.txt`.

O Web3Forms é a única conexão externa permitida na página de contato. Detalhes estão em [`SECURITY.md`](SECURITY.md).

## Publicação e validação

O site é publicado no GitHub Pages a partir da branch `main`. O workflow em `.github/workflows/pages.yml` valida sintaxe JavaScript, arquivos obrigatórios, referências locais, CSP, ausência de scripts/estilos inline, links externos seguros, sitemap, fluxo do formulário, padrões comuns de segredos e rotas dos projetos antes do deploy.

## SEO e descoberta

O repositório inclui `robots.txt`, `sitemap.xml`, metadados Open Graph na home e página 404 dedicada.

## Contato

- [GitHub](https://github.com/GabrielSantanaBR)
- [LinkedIn](https://www.linkedin.com/in/gabriel-santana-b3654622a/)
