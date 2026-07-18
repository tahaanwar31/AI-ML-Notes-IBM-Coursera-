// ============================================
// Toast helper
// ============================================
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ============================================
// Inject download buttons next to every copy button
// ============================================
document.querySelectorAll('[data-code]').forEach(el => {
  const key = el.getAttribute('data-code');
  if (!SNIPPETS[key]) return;
  const copyBtn = el.querySelector('.copy-btn');
  if (!copyBtn) return;

  const dlBtn = document.createElement('button');
  dlBtn.className = 'copy-btn dl-btn';
  dlBtn.textContent = '↓ .py';
  dlBtn.style.marginLeft = '6px';
  copyBtn.after(dlBtn);

  dlBtn.addEventListener('click', () => {
    downloadText(`${key}.py`, SNIPPETS[key]);
    showToast(`Downloaded ${key}.py`);
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(SNIPPETS[key]).then(() => {
      copyBtn.textContent = 'copied ✓';
      copyBtn.classList.add('copied');
      showToast('Copied to clipboard');
      setTimeout(() => {
        copyBtn.textContent = 'copy';
        copyBtn.classList.remove('copied');
      }, 1400);
    });
  });
});

// ============================================
// Download all snippets as one bundled file
// ============================================
document.getElementById('download-all').addEventListener('click', () => {
  const parts = Object.entries(SNIPPETS).map(([key, code]) => {
    const header = `# ${'='.repeat(50)}\n# ${key}\n# ${'='.repeat(50)}\n`;
    return header + code;
  });
  downloadText('ml-field-notes-all-snippets.py', parts.join('\n\n'));
  showToast('Downloaded all code samples');
});

// ============================================
// Sidebar active state on scroll
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks)
  .map(l => document.getElementById(l.dataset.target))
  .filter(Boolean);

function updateActiveNav() {
  let current = null;
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) current = sec;
  });
  navLinks.forEach(l => l.classList.toggle('active', current && l.dataset.target === current.id));
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ============================================
// Mobile menu toggle
// ============================================
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => sidebar.classList.remove('open')));

// ============================================
// Model Finder — signature interactive widget
// ============================================
const state = { labeled: 'yes', output: 'category' };

const RESULTS = {
  'yes|category': {
    model: 'Logistic Regression, Decision Tree, or SVM',
    why: 'Labeled data plus a category target is a classic classification problem. Start with Logistic Regression as a baseline — it\'s fast and interpretable — then compare against a Decision Tree or SVM if the boundary looks nonlinear.',
    link: '#supervised'
  },
  'yes|number': {
    model: 'Linear Regression, Polynomial Regression, or Random Forest Regressor',
    why: 'Labeled data with a continuous target is regression. Use Linear Regression if the relationship looks straight, Polynomial if it curves, and Random Forest / XGBoost when you need more accuracy and can trade off some interpretability.',
    link: '#regression'
  },
  'yes|groups': {
    model: 'You probably don\'t need labels for this',
    why: 'If the goal is grouping, not predicting a known label, this is really an unsupervised task — try the "No labels" option instead.',
    link: '#unsupervised'
  },
  'yes|fewer-dims': {
    model: 'PCA (as a preprocessing step before your supervised model)',
    why: 'Even with labeled data, high-dimensional features can hurt model performance. Reduce with PCA first, then feed the result into your classifier or regressor.',
    link: '#unsupervised'
  },
  'no|category': {
    model: 'You don\'t have labels — so "category" means clustering, not classification',
    why: 'Without labels there\'s no ground truth to classify against. What you likely want is to discover natural categories — that\'s clustering (K-Means, DBSCAN, HDBSCAN).',
    link: '#unsupervised'
  },
  'no|number': {
    model: 'Unsupervised learning doesn\'t predict numbers directly',
    why: 'Predicting a continuous value requires a target to learn from. If you truly have no labels, consider anomaly detection scores instead, or look for a proxy label to enable regression.',
    link: '#unsupervised'
  },
  'no|groups': {
    model: 'K-Means, DBSCAN, or HDBSCAN',
    why: 'Unlabeled data with the goal of finding natural groupings is clustering. Use K-Means when clusters are roughly round and you know k. Use DBSCAN or HDBSCAN when cluster shapes are irregular or you don\'t know k in advance.',
    link: '#unsupervised'
  },
  'no|fewer-dims': {
    model: 'PCA, t-SNE, or UMAP',
    why: 'Unlabeled data you want to compress or visualize is dimensionality reduction. PCA for a fast linear baseline, t-SNE for local-structure visualization, UMAP when you need both local and global structure preserved.',
    link: '#unsupervised'
  },
};

function renderFinder() {
  const result = RESULTS[`${state.labeled}|${state.output}`];
  const el = document.getElementById('finder-result');
  el.innerHTML = `
    <p class="fr-model">→ ${result.model}</p>
    <p class="fr-why">${result.why}</p>
    <a class="fr-link" href="${result.link}">Jump to that section →</a>
  `;
}

document.querySelectorAll('#pill-labeled .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#pill-labeled .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.labeled = btn.dataset.val;
    renderFinder();
  });
});

document.querySelectorAll('#pill-output .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#pill-output .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.output = btn.dataset.val;
    renderFinder();
  });
});

renderFinder();
