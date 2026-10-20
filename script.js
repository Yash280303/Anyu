// Page navigation
const claimPage = document.getElementById('claimPage');
const proposalPage = document.getElementById('proposalPage');
const celebrationPage = document.getElementById('celebrationPage');

const claimBtn = document.getElementById('claimBtn');
const noBtn = document.getElementById('noBtn');
const yesBtnInitial = document.getElementById('yesBtnInitial');
const yesBtnFinal = document.getElementById('yesBtnFinal');
const emojiMessage = document.getElementById('emojiMessage');
const questionBox = document.querySelector('.question-box');

let noClickCount = 0;
const MAX_NO_CLICKS = 5;
let noAttempts = [];

// Event Listeners
claimBtn.addEventListener('click', showProposal);
yesBtnInitial.addEventListener('click', handleYes);
yesBtnFinal.addEventListener('click', handleYes);
noBtn.addEventListener('mouseover', handleNoBtnHover);
noBtn.addEventListener('click', handleNoClick);

// Initialize No button in the middle of screen
noBtn.style.left = (window.innerWidth / 2 - 50) + 'px';
noBtn.style.top = (window.innerHeight / 2 + 50) + 'px';

// Function to show proposal page
function showProposal() {
    claimPage.classList.remove('active');
    proposalPage.classList.add('active');
    noClickCount = 0;
    noAttempts = [];
}

// Function to handle No button hover/click
function handleNoBtnHover(e) {
    // Only move if we haven't reached max attempts or if it's a mouseover
    if (noClickCount < MAX_NO_CLICKS && e.type === 'mouseover') {
        moveNoButton();
    }
}

// Function to move No button to random position
function moveNoButton() {
    const btnWidth = 100; // approximate button width
    const btnHeight = 50; // approximate button height
    const padding = 20; // padding from edges
    
    // Calculate safe boundaries
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Function to handle No button click
function handleNoClick() {
    noClickCount++;
    
    if (noClickCount <= MAX_NO_CLICKS) {
        moveNoButton();
    }
    
    // Show emoji message on 6th attempt (after 5 failed clicks)
    if (noClickCount === MAX_NO_CLICKS) {
        setTimeout(() => {
            showEmojiMessage();
        }, 300);
    }
}

// Function to show emoji message
function showEmojiMessage() {
    questionBox.classList.add('hidden');
    emojiMessage.classList.remove('hidden');
    emojiMessage.classList.add('show');
}

// Function to handle Yes button click
function handleYes() {
    proposalPage.classList.remove('active');
    celebrationPage.classList.add('active');
    
    // Start celebration effects
    startCelebration();
}

// Function to start celebration
function startCelebration() {
    createHearts();
    createConfetti();
}

// Function to create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-animation');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (Math.random() * 100) + '%';
            heart.style.animationDelay = '0s';
            heart.style.animationDuration = (2 + Math.random() * 1) + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 200);
    }
}

// Function to create confetti
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#ffd700', '#00d4ff', '#764ba2', '#ff8e72'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (2 + Math.random() * 1) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Make sure No button doesn't go off screen
function constrainButtonPosition() {
    const rect = noBtn.getBoundingClientRect();
    const btnWidth = rect.width || 100;
    const btnHeight = rect.height || 50;
    const padding = 30;
    
    let left = parseFloat(noBtn.style.left) || 0;
    let top = parseFloat(noBtn.style.top) || 0;
    
    // Constrain horizontally
    if (left < padding) {
        left = padding;
    }
    if (left + btnWidth > window.innerWidth - padding) {
        left = window.innerWidth - btnWidth - padding;
    }
    
    // Constrain vertically
    if (top < padding) {
        top = padding;
    }
    if (top + btnHeight > window.innerHeight - padding) {
        top = window.innerHeight - btnHeight - padding;
    }
    
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
}

// Add mousemove listener for more responsive button evasion
document.addEventListener('mousemove', (e) => {
    if (proposalPage.classList.contains('active') && noClickCount < MAX_NO_CLICKS) {
        const rect = noBtn.getBoundingClientRect();
        const distance = Math.hypot(
            e.clientX - (rect.left + rect.width / 2),
            e.clientY - (rect.top + rect.height / 2)
        );
        
        // Move button if cursor is within 100px
        if (distance < 100) {
            moveNoButton();
            constrainButtonPosition();
        }
    }
});

// Constrain button position on window resize
window.addEventListener('resize', constrainButtonPosition);
