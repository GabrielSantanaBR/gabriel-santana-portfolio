# Gabriel Santana — Portfolio

Portfólio profissional com foco em **sistemas, dados, automação e Inteligência Artificial aplicada**.

Site público: **https://gabrielsantanabr.github.io/gabriel-santana-portfolio/**

## Posicionamento

> Transformo processos manuais em soluções digitais.

A vitrine prioriza **o problema resolvido e o resultado entregue**. Os nomes técnicos continuam visíveis como marca/projeto, mas a comunicação principal explica o que cada solução faz.

## Projetos selecionados

- **Agenda e CRM para Serviços — ClientFlow**: agenda, clientes, serviços, orçamentos e atendimento em um fluxo único.
- **Análise Inteligente de Dados — DecisionForge AI**: qualidade de dados, anomalias, segmentação, drivers, forecasting e insights explicáveis.
- **IA para Risco Energético — Curtailment Intelligence**: previsão, explicabilidade e otimização para curtailment em geração renovável.
- **Sistema de Gestão Financeira — Finance Manager**: receitas, despesas, aprovações, permissões, auditoria e relatórios.
- **Precificação e Análise de Vendas — Pricing & Sales Manager**: custos, rendimento, margem, preço e indicadores comerciais conectados.
- **Site Institucional com Painel — Institutional Site Template**: presença digital responsiva com conteúdo administrável.
- **Análise Automatizada de Vendas — CSV Sales Analyzer**: pipeline de limpeza, métricas, rankings, exportações e gráficos.
- **Assistente Analítico para League of Legends — RiftPilot**: projeto experimental de recomendações contextuais e explicáveis.

## Páginas próprias

Cada projeto possui uma URL independente, metadados próprios e uma experiência interativa com quatro visões:

1. **Visão geral** — problema e solução.
2. **Como funciona** — fluxo simplificado em três etapas.
3. **Tecnologia** — arquitetura e stack.
4. **Evolução** — próximos passos e possibilidades comerciais/técnicas.

As páginas também incluem preview visual do produto, CTA para contato, repositório e navegação para o próximo projeto.

## Estrutura visual

- `styles.css`: componentes e previews técnicos já existentes.
- `video-effects.css`: microinterações e acabamento visual.
- `portfolio-proof.css`: seção de base profissional da home.
- `identity.css`: **camada final de identidade clean**, responsável por cores, hierarquia, espaçamento, cards, preços, formulário e páginas de produto.
- `effects.js`: animações com APIs nativas do navegador.
- `product.js`: conteúdo e interações das páginas próprias.
- `script.js`: utilidades leves, filtros da home e compatibilidade com URLs antigas.

A identidade atual usa verde escuro, superfícies discretas, contraste controlado e menos efeitos competindo com o conteúdo. O motion respeita `prefers-reduced-motion` e não depende de bibliotecas JavaScript externas.

## Segurança

O portfólio é estático e mantém CSP restritiva, scripts locais, links externos protegidos, validação do formulário, honeypot, timeout e checagens automáticas antes do deploy. O Web3Forms é a única conexão externa permitida na página de contato.

Detalhes: [`SECURITY.md`](SECURITY.md).

## Publicação e validação

O GitHub Actions bloqueia o deploy se houver:

- JavaScript inválido;
- arquivo ou link local quebrado;
- IDs HTML duplicados;
- CSP inconsistente;
- script/estilo inline não permitido;
- página de produto ausente;
- retorno de links antigos `project.html?id=...` na home;
- sitemap desatualizado;
- fluxo de contato incompleto;
- padrões comuns de segredos privilegiados.

## SEO e compartilhamento

O repositório inclui `robots.txt`, `sitemap.xml`, canonical URLs, Open Graph, imagem social 1200×630, página 404 e compatibilidade para os antigos links `project.html?id=...`.

## Contato

- [Portfólio](https://gabrielsantanabr.github.io/gabriel-santana-portfolio/)
- [GitHub](https://github.com/GabrielSantanaBR)
- [LinkedIn](https://www.linkedin.com/in/gabriel-santana-b3654622a/)
