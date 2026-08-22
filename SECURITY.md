# Security

This repository is a static portfolio published with GitHub Pages. It has no application database, server-side authentication or privileged backend exposed by the portfolio itself.

## Current controls

- Restrictive Content Security Policy on every public HTML page.
- JavaScript runtime restricted to same-origin files (`script-src 'self'`).
- No third-party animation runtime: visual motion uses native Web Animations API, IntersectionObserver and Canvas.
- Styles are same-origin only; inline `style` attributes are rejected by CI.
- Inline `<script>` blocks are rejected by CI.
- Object, frame, media and worker sources are disabled in the page CSP where not required.
- Contact form requests are restricted to `https://api.web3forms.com` only on the contact page.
- Form field length limits, browser validation, contact-format validation and honeypot anti-spam field.
- Contact payload normalization removes control characters from user-entered text.
- Contact submission uses a 12-second timeout, a short client-side cooldown, `credentials: 'omit'`, `cache: 'no-store'` and `referrerPolicy: 'no-referrer'`.
- External links opened in a new tab use `noopener noreferrer`.
- No sensitive API, database or authentication credentials should be committed to this repository.
- GitHub Actions validates JavaScript syntax, required files, local references, CSP directives, safe markup, project routes, sitemap metadata and common privileged-secret patterns before Pages deployment.
- Animation respects `prefers-reduced-motion`, limits canvas DPR/particle density and pauses the ambient canvas when the tab is hidden.
- A standard disclosure file is published at `/.well-known/security.txt`.

## About the Web3Forms access key

The access key used by the public contact form is a client-side form identifier and is necessarily delivered to the browser. It must not be treated as a privileged server secret. Privileged credentials, private tokens, passwords and backend keys must never be stored in this repository.

## Platform limitation

GitHub Pages is a static hosting platform and this repository cannot configure every HTTP response header directly. The portfolio therefore uses a CSP meta policy for supported directives and keeps the application surface intentionally small. If the site later moves behind a configurable reverse proxy/CDN, security headers such as `frame-ancestors`, HSTS and `X-Content-Type-Options` should be configured at the HTTP response layer.

## Reporting

If you find a security issue in the portfolio, avoid publishing sensitive exploit details in a public issue. Use the contact channel listed at `/.well-known/security.txt`.
