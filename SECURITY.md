# Security

This repository is a static portfolio published with GitHub Pages. It has no application database, server-side authentication or privileged backend exposed by the portfolio itself.

## Current controls

- Content Security Policy on public pages.
- External scripts restricted to the Motion CDN used by the animation layer.
- Contact form requests restricted to the Web3Forms endpoint.
- Form field length limits, browser validation and honeypot anti-spam field.
- Server-side rate-limit errors from the form provider are handled gracefully.
- No sensitive API, database or authentication credentials should be committed to this repository.
- GitHub Actions validates JavaScript syntax, required files, local links, project routes, inline style usage and common secret patterns before Pages deployment.
- Animation respects `prefers-reduced-motion` and the canvas effect pauses when the tab is hidden.

## About the Web3Forms access key

The access key used by the public contact form is a client-side form identifier and is necessarily delivered to the browser. It must not be treated as a privileged server secret. Privileged credentials, private tokens, passwords and backend keys must never be stored in this repository.

## Reporting

If you find a security issue in the portfolio, avoid publishing sensitive exploit details in a public issue. Contact the repository owner privately through the contact channel linked in the portfolio.
