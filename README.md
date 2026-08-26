# Fundamentals of Chemistry — Interactive Notebook

A single self-contained `index.html` covering Class IX, Chapter 1 (Fundamentals of Chemistry):
branches of chemistry, atoms/molecules/ions, atomic mass, the mole & Avogadro's number,
empirical/molecular formulas, and stoichiometry — each with study notes, analogies,
real-life connections, an interactive simulation, and a quiz.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `chem-fundamentals`).
2. Upload `index.html` to the root of the repo (drag-and-drop on GitHub works fine, or:
   ```
   git init
   git add index.html
   git commit -m "Add interactive chemistry notebook"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`.
5. Save. GitHub will give you a live URL like `https://<your-username>.github.io/<repo-name>/` within a minute or two.

No build step, no dependencies to install — it's plain HTML/CSS/JS (uses Google Fonts via CDN,
so an internet connection is needed when viewing).

## Editing

Everything lives in one file for simplicity. To add more topics for Chapters 2+, copy an existing
`<section class="topic">` block, give it a new id, add its notes/simulation/quiz, and add a matching
entry to the `sections` array near the top of the `<script>` block so it shows up in the nav.
