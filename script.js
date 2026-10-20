// Page elements
const claimPage = document.getElementById('claimPage');
const proposalPage = document.getElementById('proposalPage');
const dateLocationPage = document.getElementById('dateLocationPage');
const celebrationPage = document.getElementById('celebrationPage');

const claimBtn = document.getElementById('claimBtn');
const noBtn = document.getElementById('noBtn');
const yesBtnInitial = document.getElementById('yesBtnInitial');
const yesBtnFinal = document.getElementById('yesBtnFinal');
const emojiMessage = document.getElementById('emojiMessage');
const questionBox = document.querySelector('.question-box');
const locationBtns = document.querySelectorAll('.location-btn');

let selectedLocation = '';
let noClickCount = 0;
const MAX_NO_CLICKS = 5;
let noBtnOriginalPosition = null;

// Funny messages for each attempt
const funnyMessages = [
    "Oh no you don't! 😄",
    "Nice try! 😝",
    "Come on! 😊",
    "You almost got me! 😏",
    "Last chance! 😉"
];

// Event Listeners - Wait for page to load
window.addEventListener('DOMContentLoaded', () => {
    if (claimBtn) {
        claimBtn.addEventListener('click', showProposal);
    }
    
    if (yesBtnInitial) {
        yesBtnInitial.addEventListener('click', showDateLocation);
    }
    
    if (yesBtnFinal) {
        yesBtnFinal.addEventListener('click', showDateLocation);
    }
    
    if (noBtn) {
        noBtn.addEventListener('mouseover', handleNoBtnHover);
        noBtn.addEventListener('click', handleNoClick);
    }

    // Location button listeners
    locationBtns.forEach(btn => {
        btn.addEventListener('click', handleLocationSelect);
    });
});

// Function to show proposal page
function showProposal() {
    claimPage.classList.remove('active');
    proposalPage.classList.add('active');
    noClickCount = 0;
    
    // Reset no button position after a short delay
    setTimeout(() => {
        if (noBtn) {
            noBtn.style.position = 'relative';
            noBtn.style.left = '';
            noBtn.style.top = '';
        }
    }, 100);
}

// Function to handle No button hover
function handleNoBtnHover(e) {
    // Only move if we haven't reached max attempts
    if (noClickCount < MAX_NO_CLICKS) {
        moveNoButtonAway();
    }
}

// Function to move No button to random position
function moveNoButtonAway() {
    const btnWidth = 150;
    const btnHeight = 50;
    const padding = 50;
    
    // Calculate safe boundaries
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
}

// Function to handle No button click
function handleNoClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    noClickCount++;
    
    if (noClickCount <= MAX_NO_CLICKS) {
        moveNoButtonAway();
        // Show funny message floating away
        showFunnyMessage(noClickCount);
    }
    
    // Show emoji message on 6th attempt (after 5 failed clicks)
    if (noClickCount === MAX_NO_CLICKS) {
        setTimeout(() => {
            showEmojiMessage();
        }, 300);
    }
}

// Function to show funny floating messages
function showFunnyMessage(attemptNumber) {
    const message = funnyMessages[attemptNumber - 1] || funnyMessages[funnyMessages.length - 1];
    const floatingMsg = document.createElement('div');
    floatingMsg.textContent = message;
    floatingMsg.style.position = 'fixed';
    floatingMsg.style.left = Math.random() * (window.innerWidth - 200) + 100 + 'px';
    floatingMsg.style.top = Math.random() * (window.innerHeight - 200) + 100 + 'px';
    floatingMsg.style.fontSize = '1.5em';
    floatingMsg.style.fontWeight = 'bold';
    floatingMsg.style.color = '#ff6b9d';
    floatingMsg.style.zIndex = '999';
    floatingMsg.style.pointerEvents = 'none';
    floatingMsg.style.animation = 'floatAway 1.5s ease-out forwards';
    floatingMsg.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    
    document.body.appendChild(floatingMsg);
    
    setTimeout(() => floatingMsg.remove(), 1500);
}

// Function to show emoji message
function showEmojiMessage() {
    if (questionBox && emojiMessage) {
        questionBox.classList.add('hidden');
        emojiMessage.classList.remove('hidden');
        emojiMessage.classList.add('show');
    }
}

// Function to show date location page
function showDateLocation(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    proposalPage.classList.remove('active');
    dateLocationPage.classList.add('active');
}

// Function to handle location selection
function handleLocationSelect(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = e.currentTarget;
    selectedLocation = btn.getAttribute('data-location');
    
    // Show celebration with selected location
    showCelebration();
}

// Function to show celebration with location
function showCelebration() {
    dateLocationPage.classList.remove('active');
    celebrationPage.classList.add('active');
    
    // Display selected location
    const locationDisplay = document.getElementById('locationDisplay');
    if (locationDisplay) {
        const locationEmojis = {
            'Restaurant': '🍽️',
            'Movie': '🎬',
            'Beach': '🏖️',
            'Park': '🌳',
            'Coffee': '☕',
            'Adventure': '🎢'
        };
        
        const emoji = locationEmojis[selectedLocation] || '💕';
        locationDisplay.innerHTML = `${emoji} Let's go to <strong>${selectedLocation}</strong>! 💕`;
    }
    
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
    if (!heartsContainer) return;
    
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
    if (!confettiContainer) return;
    
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

// Add mousemove listener for more responsive button evasion (only on proposal page)
document.addEventListener('mousemove', (e) => {
    if (!proposalPage.classList.contains('active') || noClickCount >= MAX_NO_CLICKS) {
        return;
    }
    
    if (!noBtn) return;
    
    const rect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );
    
    // Move button if cursor is within 120px
    if (distance < 120 && noBtn.style.position !== 'fixed') {
        moveNoButtonAway();
    }
});
