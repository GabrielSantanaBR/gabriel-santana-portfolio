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

O site usa um design system próprio em verde escuro, layout responsivo e microinterações. A camada `video-effects.css` / `effects.js` aplica padrões inspirados em bibliotecas modernas de UI animada — como ambiente tipo galaxy, ripple feedback, spotlight em cards, marquee, tipografia com brilho e microinterações magnéticas — sem transformar o portfólio em uma aplicação React ou adicionar um runtime pesado.

A animação estrutural utiliza **Motion**, carregado em versão fixada por CDN. A implementação respeita `prefers-reduced-motion`, limita a densidade/DPR do canvas, pausa o efeito ambiente quando a aba fica oculta e mantém o conteúdo navegável caso a camada de animação não carregue.

## Critério do portfólio

Projetos derivados de trabalhos ou necessidades reais são publicados apenas em versões genéricas e anonimizadas. Exercícios de cursos, forks e repositórios de terceiros não são tratados como projetos principais.

## Tecnologias destacadas

Python, SQL, Django, FastAPI, PostgreSQL, SQLAlchemy, Pandas, scikit-learn, SciPy, Excel, OpenPyXL, JavaScript/TypeScript, React, Next.js, HTML e CSS.

## Segurança

O portfólio é estático e não possui banco de dados ou autenticação própria. A configuração inclui Content Security Policy, validação do formulário, honeypot, tratamento de rate limit e verificações automáticas para referências quebradas, estilos inline e padrões comuns de segredos commitados. Detalhes estão em [`SECURITY.md`](SECURITY.md).

## Publicação e validação

O site é publicado no GitHub Pages a partir da branch `main`. O workflow em `.github/workflows/pages.yml` valida sintaxe JavaScript, arquivos obrigatórios, referências locais, camada visual, padrões de segurança e rotas dos projetos antes do deploy.

## Contato

- [GitHub](https://github.com/GabrielSantanaBR)
- [LinkedIn](https://www.linkedin.com/in/gabriel-santana-b3654622a/)
