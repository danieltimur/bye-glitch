// HTML Elements
const cookie = document.getElementById('cookie');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');

// Variables
let score = 0;
let cookieX = Math.random() * (window.innerWidth - 50);
let cookieY = 0;
let basketX = window.innerWidth / 2 - 50;

// Update cookie position
function updateCookie() {
  cookieY += 5; // Cookie falls
  if (cookieY > window.innerHeight - 70 && isCaught()) {
    score++;
    resetCookie();
  } else if (cookieY > window.innerHeight) {
    resetCookie();
  }
  cookie.style.top = `${cookieY}px`;
  cookie.style.left = `${cookieX}px`;
}

// Reset cookie
function resetCookie() {
  cookieY = 0;
  cookieX = Math.random() * (window.innerWidth - 50);
  updateScore();
}

// Check if cookie is caught
function isCaught() {
  const basketLeft = basketX;
  const basketRight = basketX + 100;
  const cookieCenter = cookieX + 25;
  return cookieCenter > basketLeft && cookieCenter < basketRight;
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Handle basket movement
window.addEventListener('mousemove', (event) => {
  basketX = event.clientX - 50;
  if (basketX < 0) basketX = 0;
  if (basketX > window.innerWidth - 100) basketX = window.innerWidth - 100;
  basket.style.left = `${basketX}px`;
});

// Game loop
function gameLoop() {
  updateCookie();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
