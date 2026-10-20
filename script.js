// ── Page references ──────────────────────────────────────────────────────────
let claimPage, proposalPage, dateLocationPage, celebrationPage;
let claimBtn, noBtn, yesBtnInitial, yesBtnFinal, emojiMessage, questionBox;
let locationBtns = [];

let selectedLocation = '';
let noClickCount = 0;
const MAX_NO_CLICKS = 5;

// Cute popup messages shown on each No attempt
const noMessages = [
    { text: "Nahi nahi! 😂 Try again!", color: "#ff6b9d" },
    { text: "Seriously? 😜 Nice try!", color: "#764ba2" },
    { text: "Arre yaar! 😅 Come on!", color: "#ff8e72" },
    { text: "Almost! 😏 So close...", color: "#667eea" },
    { text: "Last chance! 😉 Think again!", color: "#ff1493" }
];

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    claimPage        = document.getElementById('claimPage');
    proposalPage     = document.getElementById('proposalPage');
    dateLocationPage = document.getElementById('dateLocationPage');
    celebrationPage  = document.getElementById('celebrationPage');

    claimBtn      = document.getElementById('claimBtn');
    noBtn         = document.getElementById('noBtn');
    yesBtnInitial = document.getElementById('yesBtnInitial');
    yesBtnFinal   = document.getElementById('yesBtnFinal');
    emojiMessage  = document.getElementById('emojiMessage');
    questionBox   = document.querySelector('.question-box');
    locationBtns  = document.querySelectorAll('.location-btn');

    // ── Claim button ──
    claimBtn.addEventListener('click', showProposal);

    // ── Yes buttons ──
    yesBtnInitial.addEventListener('click', showDateLocation);
    yesBtnFinal.addEventListener('click', showDateLocation);

    // ── No button — on mouseover just run away, on click count + popup ──
    noBtn.addEventListener('mouseover', runNoButton);
    noBtn.addEventListener('click', handleNoClick);

    // ── Location buttons ──
    locationBtns.forEach(btn => btn.addEventListener('click', handleLocationSelect));

    // ── Mouse proximity: chase the No button away before cursor even touches ──
    document.addEventListener('mousemove', chaseNoButton);
});

// ── Page transitions ──────────────────────────────────────────────────────────
function showProposal() {
    claimPage.classList.remove('active');
    proposalPage.classList.add('active');

    // Fully reset No button state
    noClickCount = 0;
    resetNoButton();
}

function showDateLocation() {
    proposalPage.classList.remove('active');
    dateLocationPage.classList.add('active');
}

function handleLocationSelect(e) {
    selectedLocation = e.currentTarget.getAttribute('data-location');
    showCelebration();
}

function showCelebration() {
    dateLocationPage.classList.remove('active');
    celebrationPage.classList.add('active');

    const locationEmojis = {
        'Restaurant': '🍽️', 'Movie': '🎬', 'Beach': '🏖️',
        'Park': '🌳',        'Coffee': '☕', 'Adventure': '🎢'
    };
    const emoji = locationEmojis[selectedLocation] || '💕';
    document.getElementById('locationDisplay').innerHTML =
        `${emoji} Let's go to <strong>${selectedLocation}</strong>! 💕`;

    createHearts();
    createConfetti();
}

// ── No button logic ───────────────────────────────────────────────────────────

// Reset No button back to its natural position inside the layout
function resetNoButton() {
    noBtn.style.position   = '';
    noBtn.style.left       = '';
    noBtn.style.top        = '';
    noBtn.style.transform  = '';
    noBtn.style.transition = '';
    noBtn.style.display    = '';
    noBtn.style.opacity    = '1';
    noBtn.style.visibility = 'visible';
}

// Teleport No button to a random spot on screen (position: fixed)
function runNoButton() {
    if (noClickCount >= MAX_NO_CLICKS) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const bw = 120, bh = 50, pad = 60;

    const x = pad + Math.random() * (w - bw - pad * 2);
    const y = pad + Math.random() * (h - bh - pad * 2);

    noBtn.style.position   = 'fixed';
    noBtn.style.left       = x + 'px';
    noBtn.style.top        = y + 'px';
    noBtn.style.transition = 'left 0.25s ease, top 0.25s ease';
    noBtn.style.display    = 'block';
    noBtn.style.opacity    = '1';
    noBtn.style.visibility = 'visible';
}

// Move away if mouse gets within 130 px
function chaseNoButton(e) {
    if (!proposalPage || !proposalPage.classList.contains('active')) return;
    if (noClickCount >= MAX_NO_CLICKS) return;
    if (!noBtn) return;

    const rect = noBtn.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < 130) runNoButton();
}

// Called when No is actually clicked
function handleNoClick(e) {
    e.stopPropagation();
    noClickCount++;

    if (noClickCount < MAX_NO_CLICKS) {
        // Show a cute popup then run away
        showPopup(noMessages[noClickCount - 1]);
        runNoButton();
    } else if (noClickCount === MAX_NO_CLICKS) {
        // 5th click: show last message, run away, then after a beat show emoji screen
        showPopup(noMessages[MAX_NO_CLICKS - 1]);
        runNoButton();
        setTimeout(showEmojiMessage, 900);
    }
}

// Floating popup bubble near current No button position
function showPopup(msg) {
    const rect = noBtn.getBoundingClientRect();

    const popup = document.createElement('div');
    popup.textContent = msg.text;
    popup.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top:  ${rect.top - 10}px;
        transform: translate(-50%, -100%);
        background: white;
        color: ${msg.color};
        font-size: 1.3em;
        font-weight: 800;
        padding: 10px 20px;
        border-radius: 30px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        pointer-events: none;
        z-index: 9999;
        white-space: nowrap;
        animation: popupAnim 1.2s ease-out forwards;
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
}

// After 5 clicks: hide question-box, show angry emoji card
function showEmojiMessage() {
    // hide the No button completely
    noBtn.style.display = 'none';

    if (questionBox)  questionBox.classList.add('hidden');
    if (emojiMessage) {
        emojiMessage.classList.remove('hidden');
        emojiMessage.classList.add('show');
    }
}

// ── Celebration effects ───────────────────────────────────────────────────────
function createHearts() {
    const container = document.querySelector('.hearts-animation');
    if (!container) return;
    const types = ['❤️','💕','💖','💗','💝'];
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.className = 'heart';
            h.textContent = types[Math.floor(Math.random() * types.length)];
            h.style.left = Math.random() * 100 + '%';
            h.style.animationDuration = (2 + Math.random()) + 's';
            container.appendChild(h);
            setTimeout(() => h.remove(), 3000);
        }, i * 180);
    }
}

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    const colors = ['#ff6b9d','#ffd700','#00d4ff','#764ba2','#ff8e72'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + '%';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDuration  = (2 + Math.random()) + 's';
            c.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(c);
            setTimeout(() => c.remove(), 4000);
        }, i * 25);
    }
}
