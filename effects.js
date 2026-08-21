import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@13.1.0/+esm";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer:fine)").matches;

/* Load optional visual layers. The base site stays usable without them. */
for (const href of ["video-effects.css", "portfolio-proof.css"]) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

const progress = document.querySelector(".scroll-progress");
if (progress) {
  let ticking = false;
  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
}

/* ReactBits-inspired ambience, reimplemented natively for the static portfolio. */
const hero = document.querySelector(".hero");
let galaxyCanvas = null;

if (hero && !hero.querySelector(".video-galaxy")) {
  galaxyCanvas = document.createElement("canvas");
  galaxyCanvas.className = "video-galaxy";
  galaxyCanvas.setAttribute("aria-hidden", "true");

  const grid = document.createElement("div");
  grid.className = "video-grid-field";
  grid.setAttribute("aria-hidden", "true");

  const rippleField = document.createElement("div");
  rippleField.className = "video-ripple-field";
  rippleField.setAttribute("aria-hidden", "true");
  rippleField.innerHTML = "<i></i><i></i><i></i>";

  hero.prepend(rippleField);
  hero.prepend(grid);
  hero.prepend(galaxyCanvas);
} else {
  galaxyCanvas = hero?.querySelector(".video-galaxy") || null;
}

/* Seamless technology marquee while preserving the original semantic content. */
const trustStrip = document.querySelector(".trust-strip");
if (trustStrip && !trustStrip.classList.contains("video-marquee")) {
  const track = document.createElement("div");
  track.className = "video-marquee-track";
  const originalNodes = [...trustStrip.children].map((node) => node.cloneNode(true));
  originalNodes.forEach((node) => track.appendChild(node));
  originalNodes.forEach((node) => {
    const clone = node.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  trustStrip.replaceChildren(track);
  trustStrip.classList.add("video-marquee");
}

/* A compact professional-proof block adds context without diluting the project showcase. */
const servicesSection = document.querySelector(".services-section");
const processSection = document.querySelector(".process-section");
if (servicesSection && processSection && !document.querySelector(".profile-proof")) {
  const profile = document.createElement("section");
  profile.className = "section profile-proof";
  profile.setAttribute("aria-labelledby", "profile-proof-title");
  profile.innerHTML = `
    <div class="section-head">
      <div><p class="eyebrow">BASE PROFISSIONAL</p><h2 id="profile-proof-title">Projetos fortes precisam de <span>fundamento.</span></h2></div>
      <p>Minha base combina dados, desenvolvimento de software, experiência com processos reais e raciocínio quantitativo.</p>
    </div>
    <div class="profile-proof-grid">
      <article class="profile-card"><span>01</span><h3>Dados & IA</h3><p>Formação complementar em Engenharia de Dados, SQL e Análise de Dados, aplicada em projetos de previsão, anomalias, segmentação e decisão.</p><div class="profile-tags"><span>Python</span><span>SQL</span><span>ML</span><span>Pandas</span></div></article>
      <article class="profile-card"><span>02</span><h3>Software & produto</h3><p>Construção de APIs, sistemas web, bancos de dados e interfaces responsivas com foco em regras de negócio e uso real.</p><div class="profile-tags"><span>Django</span><span>FastAPI</span><span>PostgreSQL</span><span>Web</span></div></article>
      <article class="profile-card"><span>03</span><h3>Raciocínio quantitativo</h3><p>Histórico de premiações em competições de matemática, trazendo disciplina analítica para modelagem, métricas e resolução de problemas.</p><div class="profile-tags"><span>Modelagem</span><span>Lógica</span><span>Métricas</span></div></article>
      <article class="profile-card"><span>04</span><h3>Operação real</h3><p>Experiência profissional com organização de dados, documentos e processos, além de soluções construídas para pequenos negócios e organizações.</p><div class="profile-tags"><span>Processos</span><span>Dados</span><span>Automação</span></div></article>
    </div>
    <div class="profile-proof-footer"><p>Os projetos destacados são os mais relevantes. Repositórios de estudo e experimentos ficam no GitHub sem competir com os cases principais.</p><a class="button secondary" href="https://github.com/GabrielSantanaBR" target="_blank" rel="noreferrer">Ver GitHub completo <span>↗</span></a></div>`;
  processSection.parentNode.insertBefore(profile, processSection);
}

/* Pointer-following spotlight surfaces. */
const spotlightTargets = document.querySelectorAll(".project-card,.solution-card,.profile-card,.price-card,.detail-card,.contact-form,.showcase-main");
spotlightTargets.forEach((surface) => {
  if (!surface.querySelector(":scope > .interaction-spotlight")) {
    const light = document.createElement("span");
    light.className = "interaction-spotlight";
    light.setAttribute("aria-hidden", "true");
    surface.prepend(light);
  }
  if (finePointer) {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      surface.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  }
});

/* Motion entrance and scroll reveals. */
if (!reduceMotion) {
  const heroItems = document.querySelectorAll(".hero-copy-wrap > *, .hero-showcase");
  if (heroItems.length) {
    animate(heroItems, { opacity: [0, 1], y: [22, 0], filter: ["blur(7px)", "blur(0px)"] }, {
      duration: .68,
      delay: stagger(.075),
      ease: [0.22, 1, 0.36, 1]
    });
  }

  const revealSelectors = [
    ".section-head", ".filters", ".project-card", ".solution-card", ".profile-card", ".profile-proof-footer",
    ".process-grid article", ".final-cta", ".price-card", ".note-box",
    ".contact-copy", ".contact-form", ".project-hero", ".detail-card", ".thanks-card"
  ];

  document.querySelectorAll(revealSelectors.join(",")).forEach((element) => {
    if (element.closest(".hero")) return;
    animate(element, { opacity: 0, y: 23 }, { duration: 0 });
    inView(element, () => {
      animate(element, { opacity: 1, y: 0 }, {
        duration: .56,
        ease: [0.22, 1, 0.36, 1]
      });
    }, { margin: "-7% 0px -8% 0px", amount: .08 });
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    const visual = card.querySelector(".project-visual");
    if (!visual) return;
    card.addEventListener("mouseenter", () => animate(visual, { scale: 1.013 }, { duration: .24 }));
    card.addEventListener("mouseleave", () => animate(visual, { scale: 1 }, { duration: .28 }));
  });

  const showcase = document.querySelector(".showcase-main");
  const showcaseParent = showcase?.closest(".hero-showcase");
  if (showcase && showcaseParent && finePointer) {
    showcaseParent.addEventListener("pointermove", (event) => {
      const rect = showcaseParent.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      animate(showcase, { rotateY: -5 + x * 5, rotateX: 3 - y * 5, y: y * -5 }, { duration: .3 });
    });
    showcaseParent.addEventListener("pointerleave", () => {
      animate(showcase, { rotateY: -5, rotateX: 3, y: 0 }, { duration: .42 });
    });
  }

  document.querySelectorAll(".button,.card-button").forEach((button) => {
    if (!finePointer) return;
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .11;
      animate(button, { x, y }, { duration: .16 });
    });
    button.addEventListener("pointerleave", () => animate(button, { x: 0, y: 0 }, { duration: .25 }));
  });
}

/* Lightweight galaxy: capped particle count/DPR and paused in hidden tabs. */
if (galaxyCanvas && !reduceMotion) {
  const ctx = galaxyCanvas.getContext("2d", { alpha: true });
  if (ctx) {
    let width = 1;
    let height = 1;
    let particles = [];
    let raf = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = galaxyCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      galaxyCanvas.width = Math.floor(width * dpr);
      galaxyCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(64, Math.round(width / 18)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: .45 + Math.random() * 1.25,
        a: .16 + Math.random() * .48,
        vx: (.025 + Math.random() * .065) * (index % 2 ? 1 : -1),
        vy: -.012 - Math.random() * .03,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time) => {
      if (time - lastFrame < 30) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += .024;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        const alpha = Math.max(.025, p.a * (.72 + Math.sin(p.phase) * .28));
        ctx.beginPath();
        ctx.fillStyle = `rgba(108,232,173,${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(galaxyCanvas);
    else addEventListener("resize", resize, { passive: true });
    raf = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    });
  }
}

/* Ripple feedback inspired by the Ripple Distortion reference. */
if (hero && !reduceMotion && finePointer) {
  let lastRipple = 0;
  hero.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a,button")) return;
    const now = performance.now();
    if (now - lastRipple < 180) return;
    lastRipple = now;
    const rect = hero.getBoundingClientRect();
    const ring = document.createElement("span");
    ring.className = "pointer-ripple";
    ring.style.left = `${event.clientX - rect.left}px`;
    ring.style.top = `${event.clientY - rect.top}px`;
    hero.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove(), { once: true });
  });
}
