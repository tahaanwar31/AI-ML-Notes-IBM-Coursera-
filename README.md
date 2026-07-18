# ML Notes

**A working reference for machine learning, built by Taha Anwar while completing the Machine Learning course offered by IBM on Coursera.**

Six modules of lecture notes and cheat sheets, condensed into a single interactive site — model comparisons, "use this when..." guidance, and copy/download-ready code for every algorithm covered.

Live site: https://ml-field-notes-j8wbb6f1i-taha-anwars-projects-0b5ad78f.vercel.app/ built with plain HTML/CSS/JS — no framework, no build step

---

## Course

- **Course:** Machine Learning
- **Offered by:** IBM
- **Platform:** Coursera
- **Format:** 6 modules + an applied final project (Titanic survival prediction)

This site is a self-made companion to that course — not official IBM/Coursera material, just my own notes reorganized into something more useful than a stack of PDFs.

## What I learned

- **Foundations** — the difference between AI and ML, the three learning paradigms (supervised, unsupervised, semi-supervised), and how to choose a technique based on problem type, data, and resources
- **Regression** — simple linear, polynomial, multiple linear, and logistic regression, and when each one actually applies
- **Supervised learning** — decision trees, SVM, KNN, random forest, XGBoost, and multiclass strategies (One-vs-One / One-vs-All)
- **Unsupervised learning** — clustering with K-Means, DBSCAN, and HDBSCAN; dimensionality reduction with PCA, t-SNE, and UMAP
- **Model evaluation** — classification/regression metrics, silhouette and Davies-Bouldin scores for clustering, regularization (Ridge/Lasso), and hyperparameter tuning with GridSearchCV
- **Applied project** — trained and compared Logistic Regression and Random Forest models on the Titanic dataset, including confusion matrix analysis and feature importance interpretation

## What's on the site

- **Model Finder** — a two-question tool that recommends the right algorithm family based on your data and goal
- Six content sections matching the modules above, each with comparison tables and runnable code
- Every code block has a **copy** button and a **download as `.py`** button
- A **"download all"** option in the sidebar that bundles every snippet into one file

## Tech stack

| | |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS (custom design system, no framework) |
| Behavior | Vanilla JavaScript |
| Fonts | Space Grotesk, Inter, IBM Plex Mono (Google Fonts) |
| Hosting | [Vercel](https://vercel.com) |

No React, no bundler, no `npm install` — it's just three files (`index.html`, `style.css`, `script.js`) plus a data file for the downloadable code snippets (`snippets.js`).

## Running locally

```bash
git clone https://github.com/<your-username>/ta-ml-field-notes.git
cd ta-ml-field-notes
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly in a browser — there's no build process.

## Deploying to Vercel

This is a static site, so it deploys with zero configuration:

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Framework preset: **Other** — no build command, no output directory needed
4. Deploy

## Project structure

```
.
├── index.html      # all page content and structure
├── style.css       # design system (colors, type, layout, components)
├── script.js       # nav highlighting, copy/download buttons, model finder logic
├── snippets.js     # downloadable code samples, keyed by section
└── vercel.json     # deployment config
```

To edit content, everything lives in `index.html`. Downloadable snippets are duplicated in `snippets.js` — keep the two in sync if you change a code sample.

## Author

**Taha Anwar**
[LinkedIn](https://www.linkedin.com/in/taha-anwar-1977231ba/)

## License

MIT — use it, fork it, adapt it for your own course notes.
