// app.js – Main application logic with all enhancements

import { stationData } from './data.js';
import { ThreeManager } from './three-manager.js';
import { simulationBuilders, init2DParticles } from './simulations.js';

// ─── STATE ──────────────────────────────────────────────────────
let currentStation = 0;
let completed = new Array(stationData.length).fill(false);
let tabStates = new Array(stationData.length).fill(null);
let threeManager = null;
let cleanup2D = null;

// ─── DOM refs ──────────────────────────────────────────────────
const sidebarEl = document.getElementById('sidebar');
const mainEl = document.getElementById('mainContent');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// ─── ANALYTICS ──────────────────────────────────────────────────
const Analytics = {
    events: [],
    maxEvents: 1000,
    enabled: true,
    load() {
        try {
            const data = localStorage.getItem('chemLab_analytics');
            if (data) this.events = JSON.parse(data);
        } catch { this.events = []; }
    },
    save() {
        if (!this.enabled) return;
        try {
            if (this.events.length > this.maxEvents) {
                this.events = this.events.slice(-this.maxEvents);
            }
            localStorage.setItem('chemLab_analytics', JSON.stringify(this.events));
        } catch {}
    },
    track(type, data = {}) {
        if (!this.enabled) return;
        this.events.push({ type, timestamp: new Date().toISOString(), ...data });
        this.save();
    },
    exportJSON() { return JSON.stringify(this.events, null, 2); },
    exportCSV() {
        if (this.events.length === 0) return '';
        const headers = ['timestamp', 'type', ...Object.keys(this.events[0]).filter(k => k !== 'timestamp' && k !== 'type')];
        let csv = headers.join(',') + '\n';
        this.events.forEach(e => {
            const row = headers.map(h => {
                if (h === 'timestamp') return e.timestamp;
                if (h === 'type') return e.type;
                return e[h] !== undefined ? e[h] : '';
            });
            csv += row.join(',') + '\n';
        });
        return csv;
    },
    clear() { this.events = []; this.save(); }
};
Analytics.load();

// ─── TOUR MANAGER ──────────────────────────────────────────────
const TourManager = {
    steps: [
        { element: '#sidebar', title: '📚 Stations', description: 'Choose a chemistry topic from the sidebar. You can also use arrow keys (←/→) to navigate.', position: 'right' },
        { element: '.tabs', title: '📑 Tabs', description: 'Each station has tabs for Notes, Examples, Analogy, Simulation, and a Quiz. Click to explore.', position: 'bottom' },
        { element: '.sim-container', title: '🧪 Simulation', description: 'Interact with 3D models – drag to rotate, scroll to zoom. Use controls to change parameters.', position: 'top' },
        { element: '.quiz-15', title: '❓ Quiz', description: 'Test your knowledge with 15 multiple‑choice questions. Answer all to complete the station.', position: 'top' }
    ],
    currentStep: 0,
    overlay: null,
    tooltip: null,
    isActive: false,

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.currentStep = 0;
        this.createOverlay();
        this.showStep(0);
    },

    createOverlay() {
        this.removeOverlay();
        const overlay = document.createElement('div');
        overlay.id = 'tourOverlay';
        overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;pointer-events:none;`;
        document.body.appendChild(overlay);
        this.overlay = overlay;

        const tooltip = document.createElement('div');
        tooltip.id = 'tourTooltip';
        tooltip.style.cssText = `position:fixed;background:#0b111f;border:1px solid #2d5a9a;border-radius:16px;padding:20px 24px;max-width:360px;color:#e8edf5;box-shadow:0 8px 24px rgba(0,0,0,0.8);z-index:10000;pointer-events:auto;display:none;`;
        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
    },

    removeOverlay() {
        document.getElementById('tourOverlay')?.remove();
        document.getElementById('tourTooltip')?.remove();
        this.overlay = null;
        this.tooltip = null;
    },

    showStep(index) {
        const step = this.steps[index];
        if (!step) { this.end(); return; }
        const element = document.querySelector(step.element);
        if (!element) { this.next(); return; }

        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        element.classList.add('tour-highlight');

        const rect = element.getBoundingClientRect();
        const tooltip = this.tooltip;
        tooltip.innerHTML = `
            <h3 style="margin:0 0 8px 0;color:#b8d4ff;">${step.title}</h3>
            <p style="margin:0 0 16px 0;color:#cad6eb;">${step.description}</p>
            <div style="display:flex;gap:10px;justify-content:flex-end;">
                <button id="tourSkipBtn" style="background:transparent;border:none;color:#8aa3c9;cursor:pointer;padding:4px 8px;">Skip tour</button>
                <button id="tourNextBtn" style="background:#1e3a6b;border:none;color:#fff;padding:6px 20px;border-radius:30px;cursor:pointer;">${index === this.steps.length-1 ? 'Finish' : 'Next →'}</button>
            </div>
        `;
        tooltip.style.display = 'block';

        const tw = 360, th = 200, gap = 16;
        let left, top;
        switch (step.position) {
            case 'right': left = rect.right + gap; top = rect.top + (rect.height - th)/2; break;
            case 'left': left = rect.left - tw - gap; top = rect.top + (rect.height - th)/2; break;
            case 'top': left = rect.left + (rect.width - tw)/2; top = rect.top - th - gap; break;
            default: left = rect.left + (rect.width - tw)/2; top = rect.bottom + gap;
        }
        const vw = window.innerWidth, vh = window.innerHeight;
        if (left < 10) left = 10;
        if (left + tw > vw - 10) left = vw - tw - 10;
        if (top < 10) top = 10;
        if (top + th > vh - 10) top = vh - th - 10;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';

        document.getElementById('tourNextBtn').addEventListener('click', () => this.next());
        document.getElementById('tourSkipBtn').addEventListener('click', () => this.end());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    next() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) this.end();
        else this.showStep(this.currentStep);
    },

    end() {
        this.isActive = false;
        this.removeOverlay();
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        localStorage.setItem('chemLab_tourShown', 'true');
    }
};

// ─── WELCOME OVERLAY ────────────────────────────────────────────
function showOnboarding() {
    if (localStorage.getItem('chemLab_tourShown')) return;
    const overlay = document.createElement('div');
    overlay.id = 'welcomeOverlay';
    overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',sans-serif;`;
    overlay.innerHTML = `
        <div style="background:#0b111f;padding:30px;border-radius:20px;max-width:500px;border:1px solid #2d5a9a;text-align:center;">
            <h2 style="color:#b8d4ff;margin-bottom:10px;">👋 Welcome to the Chemistry Lab!</h2>
            <p style="color:#cad6eb;margin-bottom:15px;">Explore 12 interactive chemistry stations.<br>Each station has notes, examples, a simulation, and a quiz.<br>Would you like a quick tour?</p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button id="tourStartBtn" style="background:#1e3a6b;border:none;color:#fff;padding:8px 24px;border-radius:30px;font-size:1rem;cursor:pointer;">Start Tour</button>
                <button id="tourDismissBtn" style="background:transparent;border:1px solid #2d5a9a;color:#8aa3c9;padding:8px 24px;border-radius:30px;font-size:1rem;cursor:pointer;">Skip</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('tourStartBtn').addEventListener('click', () => { overlay.remove(); TourManager.start(); });
    document.getElementById('tourDismissBtn').addEventListener('click', () => { overlay.remove(); localStorage.setItem('chemLab_tourShown', 'true'); });
}

// ─── PROGRESS ──────────────────────────────────────────────────
function updateProgress() {
    const done = completed.filter(Boolean).length;
    const total = stationData.length;
    progressFill.style.width = `${(done/total)*100}%`;
    progressText.textContent = `${done}/${total}`;
    document.querySelectorAll('.sidebar .station-btn').forEach((btn, idx) => {
        btn.classList.toggle('completed', completed[idx]);
    });
    saveState();
}

// ─── SAVE / LOAD STATE ─────────────────────────────────────────
function saveState() {
    try {
        localStorage.setItem('chemLab_completed', JSON.stringify(completed));
        localStorage.setItem('chemLab_tabStates', JSON.stringify(tabStates));
    } catch {}
}

function loadState() {
    try {
        const c = localStorage.getItem('chemLab_completed');
        if (c) completed = JSON.parse(c);
        const t = localStorage.getItem('chemLab_tabStates');
        if (t) tabStates = JSON.parse(t);
    } catch {}
}

// ─── RENDER STATION ─────────────────────────────────────────────
function renderStation(index) {
    const s = stationData[index];
    if (!s) return;

    // Default tab
    if (s.has3D && tabStates[index] === null) tabStates[index] = 'interactive';
    else if (tabStates[index] === null) tabStates[index] = 'notes';

    const tabs = [
        { id: 'notes', label: '📘 Notes' },
        { id: 'examples', label: '📌 Examples' },
        { id: 'analogy', label: '💡 Analogy' },
        { id: 'interactive', label: '🧪 Simulation' },
        { id: 'quiz', label: '❓ Quiz (15)' }
    ];

    let tabPanes = '';
    tabPanes += `<div role="tabpanel" id="panel-notes" aria-labelledby="tab-notes" class="tab-pane" data-tab="notes">${s.notes}</div>`;
    tabPanes += `<div role="tabpanel" id="panel-examples" aria-labelledby="tab-examples" class="tab-pane" data-tab="examples">
        <div class="example-grid">${s.examples.map(e => `
            <div class="example-card"><span class="emoji">${e.emoji}</span><div class="title">${e.title}</div><div class="desc">${e.desc}</div></div>
        `).join('')}</div>
    </div>`;
    tabPanes += `<div role="tabpanel" id="panel-analogy" aria-labelledby="tab-analogy" class="tab-pane" data-tab="analogy"><div class="analogy-box">${s.analogy}</div></div>`;
    tabPanes += `<div role="tabpanel" id="panel-interactive" aria-labelledby="tab-interactive" class="tab-pane" data-tab="interactive">${s.interactive}</div>`;

    // Quiz (paginated, shuffled)
    const qData = s.quiz15;
    const pageSize = 5;
    const totalPages = Math.ceil(qData.length / pageSize);
    let quizHTML = `<div class="quiz-15" id="quiz15Container" data-total-pages="${totalPages}">`;
    for (let page = 0; page < totalPages; page++) {
        const start = page * pageSize;
        const end = Math.min(start + pageSize, qData.length);
        quizHTML += `<div class="quiz-page" data-page="${page}" style="${page === 0 ? '' : 'display:none;'}">`;
        for (let i = start; i < end; i++) {
            const q = qData[i];
            quizHTML += `
                <div class="question-block" data-q="${i}" data-correct="${q.answer}" data-explanation="${q.explanation}">
                    <div class="q-text" id="q${i}">${i+1}. ${q.q}</div>
                    <div class="options" role="radiogroup" aria-labelledby="q${i}">
                        ${q.options.map((opt, oi) => `
                            <label><input type="radio" name="q${i}" value="${oi}" role="radio" aria-label="${opt}" /> ${opt}</label>
                        `).join('')}
                    </div>
                    <div class="feedback-15" id="fb15_${i}" role="alert" aria-live="polite"></div>
                    <div class="explanation-15" id="exp15_${i}"></div>
                </div>
            `;
        }
        quizHTML += `</div>`;
    }
    quizHTML += `
        <div class="quiz-pagination">
            <button class="quiz-prev" aria-label="Previous page" disabled>◀ Previous</button>
            <span class="quiz-page-indicator">Page 1 of ${totalPages}</span>
            <button class="quiz-next" aria-label="Next page" ${totalPages > 1 ? '' : 'disabled'}>Next ▶</button>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:10px 0;">
            <button class="submit-btn" id="submitQuiz15">✅ Check Answers</button>
            <button class="retry-btn" id="retryQuiz15" style="display:none; background:#1e3a6b; border:none; color:#fff; padding:10px 30px; border-radius:30px; font-weight:600; cursor:pointer;">🔄 Retry Quiz</button>
        </div>
        <div class="score-display" id="scoreDisplay15"></div>
    `;
    quizHTML += `</div>`;
    tabPanes += `<div role="tabpanel" id="panel-quiz" aria-labelledby="tab-quiz" class="tab-pane" data-tab="quiz">${quizHTML}</div>`;

    const html = `
        <div class="station-content active" data-station="${index}">
            <h2>${s.emoji} ${s.title} <small>${s.subtitle}</small></h2>
            <div class="sub">Station ${index + 1} of ${stationData.length}</div>
            <div class="tabs" role="tablist">
                ${tabs.map(t => `
                    <button role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${t.id === tabStates[index] ? 'true' : 'false'}" class="tab-btn ${t.id === tabStates[index] ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>
                `).join('')}
            </div>
            <div class="tab-panes">${tabPanes}</div>
        </div>
    `;

    mainEl.innerHTML = html;

    // ── Tab switching ──
    const stationEl = mainEl.querySelector('.station-content');
    const tabBtns = stationEl.querySelectorAll('.tab-btn');
    const tabPanesEl = stationEl.querySelectorAll('.tab-pane');
    tabPanesEl.forEach(p => p.classList.toggle('active', p.dataset.tab === tabStates[index]));

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabStates[index] = tabId;
            tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            tabPanesEl.forEach(p => p.classList.toggle('active', p.dataset.tab === tabId));

            if (tabId === 'interactive') {
                setTimeout(() => initSimulation(index), 50);
            } else if (tabId === 'quiz') {
                setTimeout(() => setupQuiz15(index), 50);
            }
            saveState();
            Analytics.track('tab_switch', { station: s.id, tab: tabId });
        });
    });

    // ── Quiz setup ──────────────────────────────────────────────
    function setupQuiz15(idx) {
        const container = document.getElementById('quiz15Container');
        if (!container) return;

        const originalQuestions = stationData[idx].quiz15;
        let currentQuestions = [];

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        function buildShuffledQuestions() {
            return originalQuestions.map((q, qi) => {
                const optionIndices = q.options.map((_, i) => i);
                shuffleArray(optionIndices);
                const shuffledOptions = optionIndices.map(idx => q.options[idx]);
                const newCorrect = optionIndices.indexOf(q.answer);
                return { q: q.q, options: shuffledOptions, answer: newCorrect, explanation: q.explanation, originalIndex: qi };
            });
        }

        function resetQuizUI() {
            document.querySelectorAll('.feedback-15').forEach(el => { el.className = 'feedback-15'; el.textContent = ''; });
            document.querySelectorAll('.explanation-15').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
            document.querySelectorAll('input[type="radio"]').forEach(r => { r.checked = false; r.disabled = false; });
            document.querySelectorAll('.options label').forEach(label => label.classList.remove('correct', 'wrong', 'disabled'));
            document.getElementById('retryQuiz15').style.display = 'none';
            document.getElementById('submitQuiz15').disabled = false;
            document.getElementById('scoreDisplay15').textContent = '';
        }

        function populateQuiz(questions) {
            const blocks = container.querySelectorAll('.question-block');
            blocks.forEach((block, qi) => {
                const q = questions[qi];
                if (!q) return;
                const qText = block.querySelector('.q-text');
                if (qText) qText.textContent = `${qi+1}. ${q.q}`;
                const optionsContainer = block.querySelector('.options');
                if (optionsContainer) {
                    optionsContainer.innerHTML = q.options.map((opt, oi) => `
                        <label><input type="radio" name="q${qi}" value="${oi}" role="radio" aria-label="${opt}" /> ${opt}</label>
                    `).join('');
                }
                block.dataset.correct = q.answer;
                block.dataset.explanation = q.explanation;
                let fb = block.querySelector('.feedback-15');
                if (!fb) { fb = document.createElement('div'); fb.className = 'feedback-15'; fb.id = `fb15_${qi}`; block.appendChild(fb); }
                let exp = block.querySelector('.explanation-15');
                if (!exp) { exp = document.createElement('div'); exp.className = 'explanation-15'; exp.id = `exp15_${qi}`; block.appendChild(exp); }
            });
        }

        function shuffleAndLoad() {
            currentQuestions = buildShuffledQuestions();
            populateQuiz(currentQuestions);
            resetQuizUI();
        }

        shuffleAndLoad();

        // Pagination
        const totalPages = parseInt(container.dataset.totalPages);
        let currentPage = 0;
        const prevBtn = container.querySelector('.quiz-prev');
        const nextBtn = container.querySelector('.quiz-next');
        const pageIndicator = container.querySelector('.quiz-page-indicator');
        const pages = container.querySelectorAll('.quiz-page');

        function updatePage(newPage) {
            pages.forEach(p => p.style.display = 'none');
            pages[newPage].style.display = 'block';
            prevBtn.disabled = (newPage === 0);
            nextBtn.disabled = (newPage === totalPages - 1);
            pageIndicator.textContent = `Page ${newPage+1} of ${totalPages}`;
            currentPage = newPage;
        }
        prevBtn.addEventListener('click', () => { if (currentPage > 0) updatePage(currentPage - 1); });
        nextBtn.addEventListener('click', () => { if (currentPage < totalPages - 1) updatePage(currentPage + 1); });
        updatePage(0);

        // Submit
        const submitBtn = document.getElementById('submitQuiz15');
        const retryBtn = document.getElementById('retryQuiz15');
        const scoreDisplay = document.getElementById('scoreDisplay15');

        submitBtn.addEventListener('click', () => {
            try {
                const blocks = container.querySelectorAll('.question-block');
                let correct = 0, allAnswered = true;
                blocks.forEach((block, qi) => {
                    const radios = block.querySelectorAll('input[type="radio"]');
                    let selected = false, val = -1;
                    radios.forEach((r, ri) => { if (r.checked) { selected = true; val = parseInt(r.value); } });
                    const fb = block.querySelector('.feedback-15');
                    const expDiv = block.querySelector('.explanation-15');
                    const correctAns = parseInt(block.dataset.correct);
                    const explanation = block.dataset.explanation || '';
                    if (!selected) {
                        allAnswered = false;
                        fb.className = 'feedback-15 show wrong';
                        fb.textContent = 'Please select an answer.';
                        expDiv.style.display = 'none';
                        return;
                    }
                    const isCorrect = (val === correctAns);
                    if (isCorrect) correct++;
                    fb.className = `feedback-15 show ${isCorrect ? 'correct' : 'wrong'}`;
                    fb.textContent = isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${currentQuestions[qi].options[correctAns]}`;
                    expDiv.textContent = `💡 ${explanation}`;
                    expDiv.style.display = 'block';
                    const labels = block.querySelectorAll('label');
                    labels.forEach((label, li) => {
                        if (li === correctAns) label.classList.add('correct');
                        else if (li === val && !isCorrect) label.classList.add('wrong');
                        label.classList.add('disabled');
                    });
                    radios.forEach(r => r.disabled = true);
                });
                if (!allAnswered) {
                    scoreDisplay.textContent = 'Please answer all questions.';
                    return;
                }
                scoreDisplay.textContent = `You scored ${correct} out of ${blocks.length}.`;
                Analytics.track('quiz_submit', { station: stationData[idx].id, score: correct, total: blocks.length, allCorrect: correct === blocks.length });
                if (correct === blocks.length && !completed[idx]) {
                    completed[idx] = true;
                    updateProgress();
                    saveState();
                }
                submitBtn.disabled = true;
                retryBtn.style.display = 'inline-block';
            } catch (e) { console.error('Quiz error:', e); }
        });

        retryBtn.addEventListener('click', () => {
            shuffleAndLoad();
            updatePage(0);
            submitBtn.disabled = false;
            retryBtn.style.display = 'none';
            scoreDisplay.textContent = '';
            Analytics.track('quiz_retry', { station: stationData[idx].id });
        });
    }

    // ── Init Simulation ──────────────────────────────────────────
    function initSimulation(idx) {
        if (threeManager) { threeManager.dispose(); threeManager = null; }
        if (cleanup2D) { cleanup2D(); cleanup2D = null; }

        const stationId = stationData[idx].id;
        const builder = simulationBuilders[stationId];
        const container = document.getElementById('three-container-sim');
        if (container && builder) {
            threeManager = new ThreeManager();
            const success = threeManager.init('three-container-sim', builder);
            if (success) {
                Analytics.track('simulation_view', { station: stationId });
                if (stationId === 'matter') {
                    const canvas = document.getElementById('sim2dCanvas');
                    if (canvas && !cleanup2D) {
                        cleanup2D = init2DParticles(
                            'sim2dCanvas',
                            'tempSlider',
                            'stateSelect',
                            'stateBadge',
                            'tempLabel',
                            (state, temp) => {
                                if (threeManager && threeManager.userData.updateParticles) {
                                    threeManager.userData.updateParticles(state, temp);
                                }
                            }
                        );
                    }
                }
            }
        } else if (container) {
            container.innerHTML = `<div style="color:#8aa3c9;padding:20px;text-align:center;">No 3D simulation available.</div>`;
        }
    }

    // ── Active sidebar ──
    document.querySelectorAll('.sidebar .station-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.sidebar .station-btn[data-index="${index}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    updateProgress();
    mainEl.scrollTop = 0;

    // Auto‑init
    if (tabStates[index] === 'interactive') {
        setTimeout(() => initSimulation(index), 50);
    }
    if (tabStates[index] === 'quiz') {
        setTimeout(() => setupQuiz15(index), 50);
    }
    Analytics.track('view', { station: s.id, title: s.title, index });
}

// ─── SWITCH STATION ─────────────────────────────────────────────
function switchStation(index) {
    if (threeManager) { threeManager.dispose(); threeManager = null; }
    if (cleanup2D) { cleanup2D(); cleanup2D = null; }
    currentStation = index;
    renderStation(index);
}

// ─── SIDEBAR ─────────────────────────────────────────────────────
function renderSidebar() {
    sidebarEl.innerHTML = stationData.map((s, i) =>
        `<button class="station-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
            <span class="num">${i + 1}</span>
            <span class="label">${s.emoji} ${s.title}</span>
        </button>`
    ).join('');
    sidebarEl.querySelectorAll('.station-btn').forEach(btn => {
        btn.addEventListener('click', () => switchStation(parseInt(btn.dataset.index)));
    });
}

// ─── EXPORT ANALYTICS ──────────────────────────────────────────
document.getElementById('exportBtn').addEventListener('click', () => {
    const json = Analytics.exportJSON();
    const csv = Analytics.exportCSV();
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10002;display:flex;align-items:center;justify-content:center;`;
    modal.innerHTML = `
        <div style="background:#0b111f;padding:24px;border-radius:16px;max-width:600px;width:90%;border:1px solid #2d5a9a;max-height:80vh;overflow-y:auto;">
            <h3 style="color:#b8d4ff;margin-bottom:12px;">📊 Export Analytics Data</h3>
            <p style="color:#cad6eb;margin-bottom:12px;">${Analytics.events.length} events recorded.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
                <button id="dlJSON" style="background:#1e3a6b;border:none;color:#fff;padding:8px 20px;border-radius:30px;cursor:pointer;">⬇️ Download JSON</button>
                <button id="dlCSV" style="background:#1e3a6b;border:none;color:#fff;padding:8px 20px;border-radius:30px;cursor:pointer;">⬇️ Download CSV</button>
                <button id="clearAnalytics" style="background:#5a1a2a;border:none;color:#fff;padding:8px 20px;border-radius:30px;cursor:pointer;">🗑️ Clear Data</button>
            </div>
            <pre style="background:#0a0e1a;padding:12px;border-radius:8px;max-height:200px;overflow-y:auto;font-size:0.7rem;color:#8aa3c9;white-space:pre-wrap;">${json.slice(0, 500)}${json.length > 500 ? '\n... (truncated)' : ''}</pre>
            <button id="closeExport" style="background:transparent;border:1px solid #2d5a9a;color:#8aa3c9;padding:6px 20px;border-radius:30px;cursor:pointer;margin-top:12px;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#dlJSON').addEventListener('click', () => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `chemLab_analytics_${new Date().toISOString().slice(0,10)}.json`;
        a.click(); URL.revokeObjectURL(url);
    });
    modal.querySelector('#dlCSV').addEventListener('click', () => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `chemLab_analytics_${new Date().toISOString().slice(0,10)}.csv`;
        a.click(); URL.revokeObjectURL(url);
    });
    modal.querySelector('#clearAnalytics').addEventListener('click', () => {
        if (confirm('Delete all analytics data?')) { Analytics.clear(); modal.querySelector('pre').textContent = 'Data cleared.'; }
    });
    modal.querySelector('#closeExport').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
});

// ─── HELP BUTTON ────────────────────────────────────────────────
document.getElementById('helpBtn').addEventListener('click', () => TourManager.start());

// ─── RESET PROGRESS ─────────────────────────────────────────────
document.getElementById('resetProgressBtn').addEventListener('click', () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
        localStorage.removeItem('chemLab_completed');
        localStorage.removeItem('chemLab_tabStates');
        localStorage.removeItem('chemLab_tourShown');
        localStorage.removeItem('chemLab_analytics');
        location.reload();
    }
});

// ─── VISIBILITY CHANGE ──────────────────────────────────────────
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (threeManager) threeManager.pause();
        if (cleanup2D && typeof cleanup2D.pause === 'function') cleanup2D.pause();
    } else {
        if (threeManager) threeManager.resume();
        if (cleanup2D && typeof cleanup2D.resume === 'function') cleanup2D.resume();
    }
});

// ─── RESIZE ──────────────────────────────────────────────────────
window.addEventListener('resize', () => {
    if (threeManager) threeManager.resize();
    if (cleanup2D && typeof cleanup2D.resize === 'function') cleanup2D.resize();
});

// ─── KEYBOARD NAVIGATION ────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = (currentStation - 1 + stationData.length) % stationData.length;
        switchStation(next);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (currentStation + 1) % stationData.length;
        switchStation(next);
    }
});

// ─── INIT ──────────────────────────────────────────────────────
loadState();
renderSidebar();
renderStation(0);
showOnboarding();
console.log('✅ Chemistry Lab (final) loaded.');
