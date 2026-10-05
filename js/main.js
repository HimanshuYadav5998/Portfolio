/* =============================================================
   js/main.js — Portfolio Interactions
   Requires: data/skills.js and data/projects.js loaded first.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderSkills();
  renderProjects();
  initAnimations();
  initContactForm();
  fetchCodingStats();
});

/* ─────────────────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = navLinks.querySelectorAll('a');

  // Blur glass on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
    updateActiveNavLink();
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    hamburger.classList.toggle('ham-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when any link is tapped
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('ham-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ─────────────────────────────────────────────────────────────
   RENDER SKILLS
   Reads from SKILLS (data/skills.js) and populates #skills-grid.
   ───────────────────────────────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid || typeof SKILLS === 'undefined') return;

  grid.innerHTML = SKILLS.map(cat => `
    <div class="skill-category" data-animate>
      <h3 class="skill-cat-title">${cat.category}</h3>
      <div class="skill-badges">
        ${cat.items.map(item => `
          <div class="skill-badge">
            ${item.devicon
              ? `<i class="${item.devicon}" aria-hidden="true"></i>`
              : `<span class="skill-emoji" aria-hidden="true">${item.emoji}</span>`
            }
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────────────
   RENDER PROJECTS
   Reads from PROJECTS (data/projects.js) and populates #projects-grid.
   ───────────────────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  grid.innerHTML = PROJECTS.map(proj => `
    <article class="project-card" data-animate>
      <div class="project-thumb">
        ${proj.thumbnail === 'stream' ? buildStreamThumbnail() : proj.thumbnail === 'notion' ? buildNotionThumbnail() : buildDefaultThumbnail(proj.title)}
      </div>
      <div class="project-content">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">
          ${proj.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-btns">
          <a href="${proj.github}"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-outline btn-sm"
             aria-label="View source code for ${proj.title} on GitHub">
            ${githubIcon(14)} View Code
          </a>
          <a href="${proj.demo}"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-primary btn-sm"
             aria-label="Open live demo for ${proj.title}">
            ${externalIcon(14)} Live Demo
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* CSS-only streaming UI mockup — no brand logos or trademarks */
function buildStreamThumbnail() {
  return `
    <div class="stream-mockup" aria-hidden="true">
      <div class="sm-bar">
        <div class="sm-logo"><span class="sm-logo-dot"></span><span class="sm-logo-text">STREAM</span></div>
        <div class="sm-nav-pills">
          <span class="sm-pill active">Home</span>
          <span class="sm-pill">Series</span>
          <span class="sm-pill">Films</span>
        </div>
      </div>
      <div class="sm-hero-area">
        <div class="sm-badge">TOP PICK</div>
        <div class="sm-hero-title-bar"></div>
        <div class="sm-hero-sub-bar"></div>
        <div class="sm-action-row">
          <span class="sm-play-btn">▶ Play</span>
          <span class="sm-more-btn">ⓘ More</span>
        </div>
      </div>
      <div class="sm-grid">
        <div class="sm-card smc-a"></div>
        <div class="sm-card smc-b"></div>
        <div class="sm-card smc-c"></div>
        <div class="sm-card smc-d"></div>
        <div class="sm-card smc-e"></div>
      </div>
    </div>`;
}

/* CSS-only Notion-like UI mockup */
function buildNotionThumbnail() {
  return `
    <div class="notion-mockup" aria-hidden="true">
      <div class="notion-sidebar">
        <div class="notion-nav-item"></div>
        <div class="notion-nav-item"></div>
        <div class="notion-nav-item active"></div>
        <div class="notion-nav-item"></div>
      </div>
      <div class="notion-main">
        <div class="notion-header">
          <div class="notion-emoji">🚀</div>
          <div class="notion-title-bar"></div>
        </div>
        <div class="notion-content">
          <div class="notion-line"></div>
          <div class="notion-line short"></div>
          <div class="notion-board">
            <div class="notion-col">
              <div class="notion-col-header"></div>
              <div class="notion-card"></div>
              <div class="notion-card"></div>
            </div>
            <div class="notion-col">
              <div class="notion-col-header"></div>
              <div class="notion-card"></div>
            </div>
            <div class="notion-col">
              <div class="notion-col-header"></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function buildDefaultThumbnail(title) {
  const initials = title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return `<div class="default-thumb" aria-hidden="true"><span>${initials}</span></div>`;
}

/* ─────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER ANIMATIONS
   Respects prefers-reduced-motion.
   ───────────────────────────────────────────────────────────── */
function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  // Observe all elements with data-animate (including those injected by renderSkills/renderProjects)
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM — mailto: fallback
   Frontend-only: opens user's email client with pre-filled fields.

   TODO: Replace mailto with a real email service when ready:
     Option A — Formspree (no backend needed):
       1. Sign up at https://formspree.io and create a form.
       2. Change <form id="contact-form"> to
          <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       3. Remove the submit event listener below.

     Option B — EmailJS (JS SDK, no backend needed):
       1. Sign up at https://www.emailjs.com and set up a service + template.
       2. Load SDK: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
       3. Replace window.location.href line with:
          emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target);
   ───────────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:himanshuyadav59988a@gmail.com?subject=${subject}&body=${body}`;
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(msg, type) {
  let el = document.getElementById('form-msg');
  if (!el) {
    el = document.createElement('p');
    el.id = 'form-msg';
    document.getElementById('contact-form').prepend(el);
  }
  el.className = `form-msg form-msg--${type}`;
  el.textContent = msg;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.remove(), 4500);
}

/* ─────────────────────────────────────────────────────────────
   INLINE SVG HELPERS (avoids repeating large blobs in templates)
   ───────────────────────────────────────────────────────────── */
function githubIcon(size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
    -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
    .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
    -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115
    2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595
    1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012
    2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>`;
}

function externalIcon(size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`;
}

/* ─────────────────────────────────────────────────────────────
   FETCH CODING STATS
   Pulls live numbers from GitHub and LeetCode public APIs.
   Falls back silently if a request fails.
   ───────────────────────────────────────────────────────────── */
async function fetchCodingStats() {
  // ── GitHub ────────────────────────────────────────────────
  try {
    const ghRes  = await fetch('https://api.github.com/users/HimanshuYadav5998');
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      const reposEl         = document.getElementById('gh-repos');
      const followersEl     = document.getElementById('gh-followers');
      const metricRepos     = document.getElementById('gh-metric-repos');
      const metricFollowers = document.getElementById('gh-metric-followers');
      const repoCount       = ghData.public_repos ?? '—';
      const followerCount   = ghData.followers ?? '—';

      if (reposEl)         reposEl.textContent         = repoCount;
      if (followersEl)     followersEl.textContent     = followerCount;
      if (metricRepos)     metricRepos.textContent     = repoCount;
      if (metricFollowers) metricFollowers.textContent = followerCount;
    }
  } catch (_) { /* silently skip */ }

  // ── LeetCode (via alfa-leetcode-api) ─────────────────────
  try {
    const lcRes = await fetch(
      'https://alfa-leetcode-api.onrender.com/himanshuyadav59988a/solved',
      { signal: AbortSignal.timeout(8000) }
    );
    if (lcRes.ok) {
      const lcData   = await lcRes.json();
      const solvedEl = document.getElementById('lc-solved');
      if (solvedEl) {
        const total = lcData.solvedProblem ?? lcData.totalSolved ?? null;
        solvedEl.textContent = total !== null ? total : '—';
      }
    }
  } catch (_) { /* silently skip */ }
}

/* ─────────────────────────────────────────────────────────────
   CERTIFICATE LIGHTBOX MODAL
   Opens an in-page fullscreen preview when the user clicks
   a "Preview" thumb overlay or "View ↗" link-button.
   ───────────────────────────────────────────────────────────── */
(function initCertModal() {
  const modal     = document.getElementById('cert-lightbox');
  const backdrop  = document.getElementById('cert-modal-backdrop');
  const closeBtn  = document.getElementById('cert-modal-close');
  const modalImg  = document.getElementById('cert-modal-img');
  const modalCap  = document.getElementById('cert-modal-caption');
  const rawLink   = document.getElementById('cert-modal-raw-link');

  if (!modal) return;

  function openModal(src, title) {
    modalImg.src   = src;
    modalImg.alt   = title + ' — Certificate Preview';
    modalCap.textContent = title;
    rawLink.href   = src;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  // Delegate click to all .thumb-zoom-overlay and .link-full-cert buttons
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-modal-src]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.dataset.modalSrc, trigger.dataset.modalTitle || 'Certificate');
      return;
    }
    // Close on backdrop click
    if (e.target === backdrop) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
