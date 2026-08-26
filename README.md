# 🧪 Chemistry Lab – Interactive Learning Platform

A fully interactive, accessible, and modular chemistry learning lab with 12 stations covering core topics. Each station includes detailed notes, real‑life examples, analogies, a 3D simulation, and a 15‑question MCQ quiz.

## Features
- **12 Complete Stations** – Matter, Atoms, Elements, Molecules, Compounds, Mixtures, Bonds, Changes, Reactions, Conservation, Mole, Acids & Bases.
- **3D & 2D Simulations** – Built with Three.js, with interactive controls, synchronised views, and real‑time feedback.
- **Quizzes** – 15 questions per station, shuffled options, explanations, and retry capability.
- **Progress Tracking** – Persisted in localStorage.
- **Accessibility** – ARIA labels, keyboard navigation, high contrast, skip‑to‑content.
- **Analytics** – Tracks views, quiz attempts, and simulation usage; exportable as JSON/CSV.
- **Guided Tour** – Help button to highlight key UI elements.

## How to Run
1. Download all files into the same folder.
2. Serve with a local web server (e.g., VS Code Live Server, `python -m http.server`).
3. Open `index.html` in a modern browser.

## File Structure
- `index.html` – Main HTML
- `styles.css` – Styling
- `app.js` – Main application logic
- `data.js` – Station data (content)
- `simulations.js` – 3D simulation builders
- `three-manager.js` – Three.js scene manager
- `README.md` – This file

## Technologies
- Three.js (3D rendering)
- ES Modules (native JavaScript)
- LocalStorage (persistence)

## License
MIT – feel free to use, modify, and share.
