/* ============================================================
   VoteWise India — app.js
   Core state, XP, tabs, quiz, glossary, steps, etc.
   ============================================================ */

// ========== STATE ==========
let state = {
    xp: 0,
    level: 1,
    stepsCompleted: [],
    docsChecked: [],
    quizScore: 0,
    quizAnswered: 0,
    achievements: {},
    currentLang: 'en',
    tourStep: 0,
    currentQuiz: 0,
    quizAnsweredQ: []
};

// ========== LANGUAGE ==========
function setLang(lang, btn) {
    state.currentLang = lang;
    document.body.className = 'lang-' + lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const htmlEl = document.documentElement;
    htmlEl.lang = lang === 'hi' ? 'hi' : lang === 'bn' ? 'bn' : 'en';
    earnXP(5, 'Language changed!');
}

// ========== TABS ==========
function showTab(tab, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('sec-' + tab).classList.add('active');
    if (btn) btn.classList.add('active');
    if (!state.achievements[tab]) {
        state.achievements[tab] = true;
        earnXP(10, 'New section explored! +10 XP');
        updateDashboard();
    }
}

// ========== XP ==========
function earnXP(amount, msg) {
    state.xp += amount;
    if (state.xp >= 100) { state.level++; state.xp = state.xp - 100; }
    updateXPBar();
    showToast('🎉 ' + (msg || `+${amount} XP`));
}

function updateXPBar() {
    const bar = document.getElementById('xp-bar');
    const txt = document.getElementById('xp-text');
    if (bar) {
        bar.style.width = Math.min(state.xp, 100) + '%';
        txt.textContent = state.xp + ' / 100 XP';
    }
    const qsd = document.getElementById('quiz-score-display');
    if (qsd) qsd.textContent = state.quizScore;
    const done = Object.keys(state.achievements).length;
    const sd = document.getElementById('sections-done');
    if (sd) sd.textContent = done + '/6';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// ========== ACHIEVEMENTS ==========
const ACHIEVEMENTS = [
    { id: 'first_step', icon: '👣', name: 'First Step', desc: 'Complete your first step' },
    { id: 'all_steps', icon: '🏁', name: 'All Steps Done', desc: 'Complete all 6 steps' },
    { id: 'eligible', icon: '✅', name: 'Eligibility Checked', desc: 'Check your eligibility' },
    { id: 'docs_ready', icon: '📄', name: 'Docs Ready', desc: 'Check off all documents' },
    { id: 'quiz_start', icon: '🧠', name: 'Quiz Taker', desc: 'Start the quiz' },
    { id: 'quiz_perfect', icon: '🥇', name: 'Perfect Score', desc: 'Score 100% in quiz' },
    { id: 'glossary_fan', icon: '📖', name: 'Glossary Fan', desc: 'Listen to 3 terms' },
    { id: 'tour_complete', icon: '🎬', name: 'Tour Guide', desc: 'Complete the visual tour' },
    { id: 'ai_user', icon: '🤖', name: 'AI Explorer', desc: 'Ask the AI assistant' },
    { id: 'learner', icon: '🎓', name: 'Eager Learner', desc: 'Read a Learn module' },
];

function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    grid.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="achievement ${state.achievements[a.id] ? 'earned' : 'locked'}" title="${a.desc}">
      <span class="achievement-icon">${a.icon}</span>
      <div class="achievement-name">${a.name}</div>
    </div>
  `).join('');
}

function unlockAchievement(id) {
    if (!state.achievements[id]) {
        state.achievements[id] = true;
        renderAchievements();
        earnXP(20, '🏅 Achievement Unlocked!');
    }
}

function updateDashboard() {
    renderAchievements();
    updateXPBar();
}

// ========== STEPS ==========
const STEPS = [
    {
        emoji: '📋', color: '#FF671F', bg: '#FFF0E8',
        title: 'Check Your Eligibility',
        title_hi: 'पात्रता जांचें', title_bn: 'যোগ্যতা যাচাই করুন',
        desc: 'Ensure you are 18+, an Indian citizen, and have a permanent address. NRIs with Indian passport can also vote.',
        cta: 'Go to Eligibility Checker →',
        xp: 15, tab: 'eligibility'
    },
    {
        emoji: '📝', color: '#046A38', bg: '#E8F5EE',
        title: 'Register as a Voter',
        title_hi: 'मतदाता के रूप में पंजीकरण करें', title_bn: 'ভোটার হিসেবে নিবন্ধন করুন',
        desc: 'Fill Form 6 online at voters.eci.gov.in or at your nearest BLO office. You need age proof, address proof, and a photo.',
        cta: 'Learn about registration →',
        xp: 20, tab: 'learn'
    },
    {
        emoji: '🪪', color: '#06038D', bg: '#EEF0FB',
        title: 'Get Your Voter ID (EPIC)',
        title_hi: 'वोटर आईडी (EPIC) प्राप्त करें', title_bn: 'ভোটার আইডি (EPIC) পান',
        desc: 'After registration, your Elector Photo Identity Card will be mailed to you. You can also download an e-EPIC from the website.',
        cta: 'View accepted documents →',
        xp: 15, tab: 'documents'
    },
    {
        emoji: '📍', color: '#E9A800', bg: '#FFFBEB',
        title: 'Find Your Polling Booth',
        title_hi: 'अपना मतदान केंद्र खोजें', title_bn: 'আপনার ভোট কেন্দ্র খুঁজুন',
        desc: 'Use voters.eci.gov.in or call 1950 to find your assigned polling station. It\'s usually the nearest school or community hall.',
        cta: 'Find booths near you →',
        xp: 15, tab: 'booth'
    },
    {
        emoji: '🗳️', color: '#FF671F', bg: '#FFF0E8',
        title: 'Visit the Polling Station',
        title_hi: 'मतदान केंद्र जाएं', title_bn: 'ভোট কেন্দ্রে যান',
        desc: 'Go to your polling station on election day (7 AM–6 PM). Carry your Voter ID or any alternate photo ID. Wait in the queue.',
        cta: 'Take the visual tour →',
        xp: 20, tab: 'tour'
    },
    {
        emoji: '✅', color: '#046A38', bg: '#E8F5EE',
        title: 'Cast Your Vote',
        title_hi: 'वोट डालें', title_bn: 'ভোট দিন',
        desc: 'Show your ID, get the indelible ink mark, and press the button on the EVM for your chosen candidate. Your VVPAT slip will confirm it.',
        cta: 'Learn how EVMs work →',
        xp: 25, tab: 'learn'
    },
];

let speakCount = 0;

function renderSteps() {
    const list = document.getElementById('steps-list');
    if (!list) return;
    list.innerHTML = STEPS.map((s, i) => `
    <div class="step-item" id="step-${i}">
      <div class="step-number" style="background:${s.bg};color:${s.color}">${s.emoji}</div>
      <div class="step-content ${state.stepsCompleted.includes(i) ? 'completed' : ''}" onclick="completeStep(${i}, '${s.tab}')">
        <div class="step-title">
          <span class="english-text">${s.title}</span>
          <span class="hindi-text">${s.title_hi}</span>
          <span class="bengali-text">${s.title_bn}</span>
          ${state.stepsCompleted.includes(i) ? '<span style="color:var(--india-green);font-size:20px">✓</span>' : `<span class="tag tag-gold">+${s.xp} XP</span>`}
        </div>
        <div class="step-desc">${s.desc}</div>
        <div class="step-cta">${s.cta}</div>
      </div>
    </div>
  `).join('');
}

function completeStep(i, tab) {
    if (!state.stepsCompleted.includes(i)) {
        state.stepsCompleted.push(i);
        earnXP(STEPS[i].xp, `Step ${i + 1} complete! +${STEPS[i].xp} XP`);
        unlockAchievement('first_step');
        if (state.stepsCompleted.length === STEPS.length) unlockAchievement('all_steps');
    }
    renderSteps();
    if (tab) {
        const tabBtn = document.querySelector(`[onclick*="'${tab}'"]`);
        showTab(tab, tabBtn);
    }
}

// ========== DOCUMENTS ==========
const DOCS = [
    { icon: '🪪', name: 'Voter ID Card (EPIC)' },
    { icon: '📘', name: 'Aadhaar Card' },
    { icon: '🛂', name: 'Passport' },
    { icon: '🚗', name: 'Driving Licence' },
    { icon: '🏦', name: 'Bank / Post Office Passbook' },
    { icon: '🎓', name: 'Smart Card (MNREGA/PAN)' },
    { icon: '💼', name: 'Service ID (Govt. Employee)' },
    { icon: '👶', name: 'Health Card (CGHS/ESIC)' },
    { icon: '🏛️', name: 'MP/MLA/MLC ID Card' },
    { icon: '📱', name: 'e-EPIC (Digital Voter ID)' },
    { icon: '👴', name: 'Pension Document' },
    { icon: '🏠', name: 'NPR Smart Card' },
];

function renderDocs() {
    const grid = document.getElementById('doc-grid');
    if (!grid) return;
    grid.innerHTML = DOCS.map((d, i) => `
    <div class="doc-card ${state.docsChecked.includes(i) ? 'checked' : ''}" onclick="toggleDoc(${i})">
      <div class="doc-check">${state.docsChecked.includes(i) ? '✓' : ''}</div>
      <span class="doc-icon">${d.icon}</span>
      <div class="doc-name">${d.name}</div>
    </div>
  `).join('');
}

function toggleDoc(i) {
    if (state.docsChecked.includes(i)) {
        state.docsChecked = state.docsChecked.filter(x => x !== i);
    } else {
        state.docsChecked.push(i);
        earnXP(5, 'Document checked! +5 XP');
        if (state.docsChecked.length === DOCS.length) unlockAchievement('docs_ready');
    }
    renderDocs();
}

// ========== BOOTHS ==========
const BOOTHS = [
    { name: 'Government Senior Secondary School, Sector 12', addr: 'Block A, Near Main Market', dist: '0.4 km', booth: 'Booth #142' },
    { name: 'Community Hall, Block B', addr: 'Ring Road, Block B', dist: '0.7 km', booth: 'Booth #143' },
    { name: 'Municipal Primary School, Ward 7', addr: 'Old City Road, Ward 7', dist: '1.1 km', booth: 'Booth #144' },
    { name: 'Panchayat Bhavan, Village Area', addr: 'Village Road, Near Temple', dist: '1.8 km', booth: 'Booth #145' },
];

function renderBooths() {
    const list = document.getElementById('booth-list');
    if (!list) return;
    list.innerHTML = BOOTHS.map(b => `
    <div class="booth-item">
      <div style="font-size:28px">🏫</div>
      <div class="booth-info">
        <div class="booth-name">${b.name}</div>
        <div class="booth-addr">${b.addr} · ${b.booth}</div>
      </div>
      <div class="booth-dist">${b.dist}</div>
    </div>
  `).join('');
}

function searchBooths() {
    const input = document.getElementById('location-input').value;
    if (input.trim()) showToast(`📍 Showing booths near "${input}"`);
    else showToast('Please enter a location to search');
}

function useMyLocation() {
    if (navigator.geolocation) {
        showToast('📍 Getting your location...');
        navigator.geolocation.getCurrentPosition(
            () => showToast('✅ Location found! Showing nearby booths'),
            () => showToast('❌ Location access denied')
        );
    } else {
        showToast('Geolocation is not supported in this browser');
    }
}

// ========== TIMELINE ==========
const TIMELINE = [
    { date: '6 months before', title: 'Electoral Roll Revision', desc: 'ECI updates the voter list. New voters can register using Form 6.', color: 'var(--saffron)' },
    { date: '60 days before', title: 'Model Code of Conduct', desc: 'MCC comes into effect after election schedule announcement. Political parties must follow strict rules.', color: 'var(--navy)' },
    { date: '45 days before', title: 'Nominations Open', desc: 'Candidates file their nomination papers with the Returning Officer along with a security deposit.', color: 'var(--india-green)' },
    { date: '30 days before', title: 'Scrutiny & Withdrawal', desc: 'Nominations are scrutinised. Candidates can withdraw within a specific window after this.', color: 'var(--gold)' },
    { date: '48 hours before', title: 'Campaign Silence', desc: 'Election campaigning stops 48 hours before polling. No political rallies, speeches, or canvassing.', color: 'var(--saffron)' },
    { date: 'Election Day', title: 'Polling Day', desc: 'Polling booths open 7 AM to 6 PM. Use your Voter ID to cast your vote. Govt. employees get paid leave.', color: 'var(--india-green)' },
    { date: 'Counting Day', title: 'Vote Counting & Results', desc: 'EVMs are opened under strict supervision. Counts proceed round by round. Results declared within 24-48 hours.', color: 'var(--navy)' },
];

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = TIMELINE.map(t => `
    <div class="timeline-item">
      <div class="timeline-dot" style="color:${t.color}"></div>
      <div class="timeline-card">
        <div class="timeline-date" style="color:${t.color}">${t.date}</div>
        <div class="timeline-title">${t.title}</div>
        <div class="timeline-desc">${t.desc}</div>
      </div>
    </div>
  `).join('');
}

// ========== GLOSSARY ==========
const GLOSSARY = [
    { word: 'EVM', hindi: 'इलेक्ट्रॉनिक वोटिंग मशीन', bengali: 'ইলেক্ট্রনিক ভোটিং মেশিন', def: 'Electronic Voting Machine — a standalone electronic device used to cast and count votes in Indian elections. It consists of a control unit and a balloting unit.' },
    { word: 'VVPAT', hindi: 'मतदाता सत्यापन पेपर ऑडिट ट्रेल', bengali: 'ভোটার যাচাইযোগ্য পেপার অডিট ট্রেইল', def: 'Voter Verifiable Paper Audit Trail — a printer attached to the EVM that prints a slip showing the symbol, name and serial number of the candidate you voted for. The slip is visible for 7 seconds.' },
    { word: 'NOTA', hindi: 'उपरोक्त में से कोई नहीं', bengali: 'উপরোক্ত কেউ নয়', def: 'None Of The Above — an option on the EVM ballot that allows voters to reject all candidates. Introduced in 2013 by the Supreme Court.' },
    { word: 'EPIC', hindi: 'निर्वाचक फोटो पहचान पत्र', bengali: 'ভোটার ফটো পরিচয়পত্র', def: 'Elector Photo Identity Card — commonly known as the Voter ID Card. Issued by the Election Commission of India to every registered voter as the primary proof of identity.' },
    { word: 'Lok Sabha', hindi: 'लोक सभा', bengali: 'লোকসভা', def: 'The lower house of India\'s Parliament, also called the House of the People. It has 543 directly elected members who represent constituencies across India.' },
    { word: 'Rajya Sabha', hindi: 'राज्य सभा', bengali: 'রাজ্যসভা', def: 'The upper house of India\'s Parliament, also known as the Council of States. Its 245 members are elected by state legislative assemblies, not directly by the public.' },
    { word: 'MCC', hindi: 'आदर्श आचार संहिता', bengali: 'মডেল কোড অব কন্ডাক্ট', def: 'Model Code of Conduct — a set of guidelines issued by the Election Commission of India to regulate the conduct of political parties and candidates during elections.' },
    { word: 'Constituency', hindi: 'निर्वाचन क्षेत्र', bengali: 'নির্বাচনী এলাকা', def: 'A geographic area whose voters elect a representative to a legislative body. India has 543 Lok Sabha constituencies and thousands of state assembly constituencies.' },
    { word: 'Delimitation', hindi: 'परिसीमन', bengali: 'পুনর্বিন্যাস', def: 'The act of fixing the boundaries of constituencies after each census. Done by the Delimitation Commission of India to ensure fair representation based on population.' },
    { word: 'BLO', hindi: 'बूथ स्तर अधिकारी', bengali: 'বুথ স্তর কর্মকর্তা', def: 'Booth Level Officer — a government official responsible for maintaining the electoral roll in their assigned area and assisting voters with registration issues.' },
];

function renderGlossary(query = '') {
    const list = document.getElementById('glossary-list');
    if (!list) return;
    const terms = query
        ? GLOSSARY.filter(t => t.word.toLowerCase().includes(query.toLowerCase()) || t.def.toLowerCase().includes(query.toLowerCase()))
        : GLOSSARY;

    if (terms.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:32px">No terms found for "' + query + '"</p>';
        return;
    }

    list.innerHTML = terms.map((t, i) => `
    <div class="term-card" id="term-${i}" onclick="toggleTerm(${i})">
      <div class="term-header">
        <div>
          <div class="term-word">${t.word}</div>
          <div class="term-lang">
            <span style="font-family:var(--font-hindi)">${t.hindi}</span> · 
            <span style="font-family:var(--font-bengali)">${t.bengali}</span>
          </div>
        </div>
        <button class="speak-btn" id="speak-${i}" onclick="event.stopPropagation();speakTerm(${i},'${t.word}','${t.def.replace(/'/g, "\\'").replace(/"/g, '\\"')}')" title="Listen to definition" aria-label="Read ${t.word} definition aloud">🔊</button>
      </div>
      <div class="term-definition">${t.def}</div>
    </div>
  `).join('');
}

function toggleTerm(i) {
    const card = document.getElementById('term-' + i);
    card.classList.toggle('expanded');
}

function filterGlossary(q) { renderGlossary(q); }

function speakTerm(i, word, def) {
    if (!window.speechSynthesis) { showToast('Speech not supported in this browser'); return; }
    window.speechSynthesis.cancel();
    const btn = document.getElementById('speak-' + i);
    if (btn.classList.contains('speaking')) {
        btn.classList.remove('speaking');
        return;
    }
    document.querySelectorAll('.speak-btn').forEach(b => b.classList.remove('speaking'));
    btn.classList.add('speaking');
    const utterance = new SpeechSynthesisUtterance(word + '. ' + def);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => { btn.classList.remove('speaking'); };
    window.speechSynthesis.speak(utterance);
    speakCount++;
    if (speakCount >= 3) unlockAchievement('glossary_fan');
    const card = document.getElementById('term-' + i);
    card.classList.add('expanded');
    earnXP(3, 'Term learned! +3 XP');
}

// ========== VISUAL TOUR ==========
const TOUR_STEPS = [
    { emoji: '🌅', title: 'Election Day Begins', subtitle: 'Polling opens at 7:00 AM', body: 'On election day, polling stations across India open at 7 AM. Thousands of polling officers, security personnel, and officials manage the process. Each booth typically serves 1,000–1,500 voters. The CRPF and state police ensure security.' },
    { emoji: '🪪', title: 'Show Your ID', subtitle: 'Present Voter ID or alternative', body: 'Upon arrival, you present your Voter ID (EPIC) or any of the 12 alternative photo IDs. The Presiding Officer checks your name on the electoral roll and verifies your identity before allowing you to proceed.' },
    { emoji: '🖊️', title: 'Ink on Your Finger', subtitle: 'Indelible ink to prevent double voting', body: 'An indelible ink mark is applied to the index finger of your left hand. This special ink, developed by the National Physical Laboratory, stays for 2–3 weeks and cannot be washed off — ensuring no one votes twice.' },
    { emoji: '🗳️', title: 'Cast Your Vote', subtitle: 'Press the EVM button', body: 'You enter the voting compartment alone and press the button next to your chosen candidate on the Electronic Voting Machine (EVM). A beep confirms your vote. The VVPAT machine shows a paper slip for 7 seconds for verification.' },
    { emoji: '📋', title: 'VVPAT Verification', subtitle: 'Verify your vote visually', body: 'The Voter Verifiable Paper Audit Trail (VVPAT) displays a printed slip showing the candidate name, symbol, and serial number you voted for. It\'s visible for 7 seconds through a glass window before dropping into a sealed box.' },
    { emoji: '🎉', title: 'Voting Complete!', subtitle: 'Wear your ink badge with pride', body: 'You\'ve done your democratic duty! The ink mark on your finger is your badge of honour. Results are counted on a later date, with candidates, agents, and observers all present to ensure transparency.' },
];

let tourStepIdx = 0;

function initTour() {
    const dots = document.getElementById('tour-dots');
    if (!dots) return;
    dots.innerHTML = TOUR_STEPS.map((_, i) => `<div class="tour-dot ${i === 0 ? 'active' : ''}" id="dot-${i}"></div>`).join('');
    updateTour();
}

function updateTour() {
    const s = TOUR_STEPS[tourStepIdx];
    document.getElementById('tour-emoji').textContent = s.emoji;
    document.getElementById('tour-title').textContent = s.title;
    document.getElementById('tour-subtitle').textContent = s.subtitle;
    document.getElementById('tour-body').textContent = s.body;
    document.querySelectorAll('.tour-dot').forEach((d, i) => {
        d.className = 'tour-dot' + (i === tourStepIdx ? ' active' : '');
    });
    const prev = document.getElementById('tour-prev');
    const next = document.getElementById('tour-next');
    prev.disabled = tourStepIdx === 0;
    prev.style.opacity = tourStepIdx === 0 ? '0.4' : '1';
    next.textContent = tourStepIdx === TOUR_STEPS.length - 1 ? '🏁 Done!' : 'Next →';
    if (tourStepIdx === TOUR_STEPS.length - 1) unlockAchievement('tour_complete');
}

function tourNav(dir) {
    tourStepIdx = Math.max(0, Math.min(TOUR_STEPS.length - 1, tourStepIdx + dir));
    updateTour();
    earnXP(5, 'Tour step! +5 XP');
}

// ========== QUIZ ==========
const QUIZ_Q = [
    { q: 'What is the minimum age to vote in India?', opts: ['16 years', '18 years', '21 years', '25 years'], ans: 1, xp: 10 },
    { q: 'What does EVM stand for?', opts: ['Electronically Verified Mechanism', 'Electoral Voting Medium', 'Electronic Voting Machine', 'Encrypted Vote Manager'], ans: 2, xp: 10 },
    { q: 'NOTA on the ballot means:', opts: ['No Time Available', 'None Of The Above', 'Not On The Agenda', 'National Option To Abstain'], ans: 1, xp: 10 },
    { q: 'How many Lok Sabha constituencies are there in India?', opts: ['245', '543', '420', '550'], ans: 1, xp: 15 },
    { q: 'What document is PRIMARILY used for voter identification?', opts: ['Aadhaar Card', 'PAN Card', 'EPIC (Voter ID Card)', 'Passport'], ans: 2, xp: 10 },
    { q: 'For how many seconds does the VVPAT slip remain visible?', opts: ['3 seconds', '5 seconds', '7 seconds', '10 seconds'], ans: 2, xp: 15 },
    { q: 'The Model Code of Conduct is issued by:', opts: ['Prime Minister\'s Office', 'Election Commission of India', 'Supreme Court', 'Parliament'], ans: 1, xp: 10 },
    { q: 'What helpline number can you call for election queries?', opts: ['100', '1950', '112', '1800'], ans: 1, xp: 10 },
    { q: 'Elections in India are conducted by:', opts: ['Central Government', 'State Governments', 'Election Commission of India', 'Parliament'], ans: 2, xp: 10 },
    { q: 'What is the ink mark applied during voting?', opts: ['Washable ink', 'Permanent marker', 'Indelible ink', 'Ballpoint ink'], ans: 2, xp: 15 },
];

let quizIdx = 0;

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    if (quizIdx >= QUIZ_Q.length) {
        const pct = Math.round((state.quizScore / QUIZ_Q.length) * 100);
        const medal = pct === 100 ? '🥇' : pct >= 70 ? '🥈' : '🥉';
        container.innerHTML = `
      <div class="quiz-card active" style="text-align:center;">
        <div style="font-size:64px;margin-bottom:16px">${medal}</div>
        <h2 style="font-size:28px;font-weight:800;color:var(--text-primary);margin-bottom:8px">Quiz Complete!</h2>
        <p style="font-size:16px;color:var(--text-secondary);margin-bottom:24px">You scored <strong>${state.quizScore} out of ${QUIZ_Q.length}</strong> (${pct}%)</p>
        <div class="xp-bar-container" style="max-width:200px;margin:0 auto 20px;">
          <div class="xp-bar" style="width:${pct}%"></div>
        </div>
        ${pct === 100 ? '<div style="background:var(--gold-pale);border:2px solid var(--gold);border-radius:12px;padding:16px;margin-bottom:20px;font-weight:700;color:#8B6700">🎉 Perfect Score! Achievement Unlocked!</div>' : ''}
        <button class="btn-primary" onclick="retakeQuiz()">🔄 Retake Quiz</button>
      </div>
    `;
        if (pct === 100) unlockAchievement('quiz_perfect');
        unlockAchievement('quiz_start');
        updateDashboard();
        return;
    }

    const q = QUIZ_Q[quizIdx];
    container.innerHTML = `
    <div class="quiz-card active">
      <div class="quiz-progress">
        ${QUIZ_Q.map((_, i) => `<div class="quiz-dot ${i < quizIdx ? 'done' : i === quizIdx ? 'current' : ''}"></div>`).join('')}
      </div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">Question ${quizIdx + 1} of ${QUIZ_Q.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `<button class="quiz-option" onclick="answerQuiz(${i})">${o}</button>`).join('')}
      </div>
    </div>
  `;
}

function answerQuiz(selected) {
    const q = QUIZ_Q[quizIdx];
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((o, i) => {
        o.disabled = true;
        if (i === q.ans) o.classList.add('correct');
        else if (i === selected && i !== q.ans) o.classList.add('wrong');
    });

    if (selected === q.ans) {
        state.quizScore++;
        earnXP(q.xp, `Correct! +${q.xp} XP`);
    } else {
        showToast('❌ Wrong! The answer was: ' + q.opts[q.ans]);
    }

    setTimeout(() => {
        quizIdx++;
        renderQuiz();
        updateDashboard();
    }, 1400);
}

function retakeQuiz() {
    quizIdx = 0;
    state.quizScore = 0;
    renderQuiz();
}

// ========== DAILY FACTS ==========
const FACTS = [
    { icon: '🗳️', text: 'India conducts the largest democratic elections in the world. In the 2024 Lok Sabha elections, over 642 million people voted!' },
    { icon: '🖊️', text: 'The indelible ink used in Indian elections was first used in 1962 and is made by the Mysore Paints and Varnish Limited (MPVL).' },
    { icon: '📍', text: 'India has over 10.5 lakh (1.05 million) polling stations to cover its vast geography — from the Himalayas to island territories.' },
    { icon: '🏛️', text: 'The Election Commission of India was established on January 25, 1950 — the day before India became a Republic. January 25 is now celebrated as National Voters\' Day.' },
    { icon: '⚡', text: 'EVMs run on a single alkaline battery and can store up to 3,840 votes per unit. They work in areas with no electricity.' },
    { icon: '🌍', text: 'India\'s electoral roll is so large that if it were a country, it would be the 3rd most populous nation on Earth!' },
];

let factIdx = 0;

function newFact() {
    factIdx = (factIdx + 1) % FACTS.length;
    const f = FACTS[factIdx];
    document.getElementById('daily-fact').innerHTML = `<div style="font-size:32px;margin-bottom:10px">${f.icon}</div><p style="font-size:16px;font-weight:600;color:var(--text-primary);line-height:1.6">${f.text}</p>`;
}

// ========== ELIGIBILITY ==========
function checkEligibility() {
    const age = parseInt(document.getElementById('age-input').value);
    const citizen = document.getElementById('citizen-input').value;
    const resident = document.getElementById('resident-input').value;
    const registered = document.getElementById('registered-input').value;
    const result = document.getElementById('eligibility-result');

    if (!age || !citizen || !resident || !registered) {
        showToast('⚠️ Please answer all questions');
        return;
    }

    if (age < 18) {
        result.className = 'result-box not-eligible';
        result.innerHTML = `<h3 style="color:#C53030;font-size:20px;margin-bottom:8px">❌ Not Yet Eligible</h3><p style="color:var(--text-secondary)">You need to be at least 18 years old to vote in India. You'll be eligible in ${18 - age} year(s)!</p>`;
    } else if (citizen !== 'yes') {
        result.className = 'result-box not-eligible';
        result.innerHTML = `<h3 style="color:#C53030;font-size:20px;margin-bottom:8px">❌ Not Eligible</h3><p style="color:var(--text-secondary)">Only Indian citizens can vote in Indian elections.</p>`;
    } else if (resident !== 'yes') {
        result.className = 'result-box not-eligible';
        result.innerHTML = `<h3 style="color:#C53030;font-size:20px;margin-bottom:8px">⚠️ Check Registration</h3><p style="color:var(--text-secondary)">You need a permanent address in India to be included in the electoral roll.</p>`;
    } else {
        result.className = 'result-box eligible';
        const regMsg = registered === 'yes'
            ? '✅ You\'re already registered! Just show up on election day with your Voter ID.'
            : '📝 You need to register! Visit <strong>voters.eci.gov.in</strong> or fill Form 6 at your nearest BLO office.';
        result.innerHTML = `
      <h3 style="color:var(--india-green);font-size:20px;margin-bottom:8px">✅ You Are Eligible to Vote!</h3>
      <p style="color:var(--text-secondary);margin-bottom:12px">${regMsg}</p>
      <div class="info-row">
        <div class="info-pill">🎂 Age: <span>${age}</span></div>
        <div class="info-pill">🇮🇳 Citizen: <span>Yes</span></div>
        <div class="info-pill">🏠 Resident: <span>Yes</span></div>
      </div>
    `;
        unlockAchievement('eligible');
        earnXP(20, 'Eligibility checked! +20 XP');
    }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    renderAchievements();
    renderSteps();
    renderDocs();
    renderBooths();
    renderTimeline();
    renderGlossary();
    renderQuiz();
    initTour();
    updateXPBar();

    setTimeout(() => {
        const bar = document.getElementById('xp-bar');
        if (bar) bar.style.width = '0%';
    }, 100);
});