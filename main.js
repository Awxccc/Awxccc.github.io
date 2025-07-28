// ===== Select DOM Elements =====
const navButtons = document.querySelectorAll('.nav-btn');
const homeButton = document.querySelectorAll('.home-btn');
const panels = document.querySelectorAll('.panel');
const hamBtn = document.getElementById('hamBtn');
const navMenu = document.getElementById('main-nav');

// ===== Page Navigation (Content Swapping) =====
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.id.replace('-btn', '');

    panels.forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    if (targetId === "quiz") {
      restartQuiz();
    }

    navMenu.classList.remove('show');
  });
});


// ===== HamBtn Menu Toggle (Mobile) =====
hamBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});


// ==== Mini-Game Variables ====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const basket = { x: 150, y: canvas.height - 30, width: 60, height: 20 };

let fallingFoods = [];
let score = 0;
let lives = 3;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let gameStarted = false;
let gameOver = false;

const foodTypes = [
  { type: "healthy", color: "green" },
  { type: "junk", color: "red" }
];

// === Images ===
const basketImage = new Image();
basketImage.src = "images/basket.png";

const foodImages = {
  carrot: new Image(),
  apple: new Image(),
  veggie: new Image(),
  soda: new Image(),
  burger: new Image()
};

foodImages.carrot.src = "images/carrot.png";
foodImages.apple.src = "images/apple.png";
foodImages.veggie.src = "images/veggie.png";
foodImages.soda.src = "images/soda.png";
foodImages.burger.src = "images/burger.png";

// === Sounds ===
const catchSound = new Audio("audio/basket_catch.mp3");
const wrongCatch = new Audio("audio/wrongcatch.mp3");



// ==== Controls ====
const basketSpeed = 300; // pixels per second

let keys = {
  left: false,
  right: false
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

//Mobile controls
document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys.left = true;
});
document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys.right = true;
});

document.getElementById("leftBtn").addEventListener("touchend", () => keys.left = false);
document.getElementById("rightBtn").addEventListener("touchend", () => keys.right = false);

let lastTime = 0;
function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = (timestamp - lastTime) / 1000; // Convert ms to seconds
  lastTime = timestamp;

  updateGame(deltaTime);
  gameInterval = requestAnimationFrame(gameLoop);
}

// ==== Start Game ====

canvas.addEventListener("click", () => {
  if (!gameStarted || gameOver) {
    gameStarted = true;
    gameOver = false;
    startGame(); // ensure timerInterval gets reset
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }
});



function startGame() {
  fallingFoods = [];
  score = 0;
  lives = 3;
  timeLeft = 30;
  lastTime = 0;
  gameOver = false;
  left = false;
  right = false;

  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("lives").textContent = lives;

  // Reset timers
  cancelAnimationFrame(gameInterval);
  clearInterval(timerInterval);
  timerInterval = null;

  timerInterval = setInterval(() => {
    if (!gameOver) {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0 || lives <= 0) {
        endGame();
      }
    }
  }, 1000);
}
if (!gameStarted){
    // Draw start screen
    ctx.fillStyle = "#696969ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff55ff";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Click to Play!", canvas.width / 2, canvas.height / 2);
    left = false;
  right = false;
}

function endGame() {
    ctx.fillStyle = "#696969ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff55ff";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 20);
  gameOver = true;
  left = false;
  right = false;
  clearInterval(timerInterval);
  timerInterval = null;
  cancelAnimationFrame(gameInterval);
  alert("Your score: " + score);
}


// ==== Game Loop ====
function updateGame(deltaTime) {
ctx.clearRect(0, 0, canvas.width, canvas.height);

if (!gameStarted) {
    return;
  }

  if (gameOver) {
    return;
  }

  ctx.drawImage(basketImage, basket.x, basket.y, basket.width, basket.height);

  // Move basket smoothly
if (keys.left) basket.x -= basketSpeed * deltaTime;
if (keys.right) basket.x += basketSpeed * deltaTime;

// Keep basket within bounds
basket.x = Math.max(0, Math.min(canvas.width - basket.width, basket.x));


  // Spawn food
if (Math.random() < deltaTime * 2.5) {
  const foodPool = [
    { type: "healthy", name: "carrot" },
    { type: "healthy", name: "apple" },
    { type: "healthy", name: "veggie" },
    { type: "junk", name: "soda" },
    { type: "junk", name: "burger" }
  ];

  const selected = foodPool[Math.floor(Math.random() * foodPool.length)];

  fallingFoods.push({
    x: Math.random() * (canvas.width - 40),
    y: -40,
    width: 40,
    height: 40,
    speed: 80 + Math.random() * 40,
    type: selected.type,
    name: selected.name
  });
}


  // Update food
for (let i = fallingFoods.length - 1; i >= 0; i--) {
  const food = fallingFoods[i];
  food.y += food.speed * deltaTime;

  // Draw food image
  const img = foodImages[food.name];
  if (img) {
    ctx.drawImage(img, food.x, food.y, food.width, food.height);
  }

  // Collision check
  const basketBottom = basket.y + basket.height;
  const foodBottom = food.y + food.height;

  if (
    foodBottom >= basket.y &&
    food.x + food.width > basket.x &&
    food.x < basket.x + basket.width
  ) {
    if (food.type === "healthy") {
      catchSound.currentTime = 0;
    catchSound.play();
      score++;
    } else {
wrongCatch.currentTime = 0;
    wrongCatch.play();
      lives--;
    }
    

    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    fallingFoods.splice(i, 1);
  } else if (food.y > canvas.height) {
    fallingFoods.splice(i, 1);
  }
}
}


// ==== QUIZ GAME LOGIC ====
const quizData = [
  {
    question: "Which nutrient provides energy?",
    options: ["Vitamins", "Proteins", "Carbohydrates", "Minerals"],
    answer: 2,
  },
  {
    question: "Which is a good source of protein?",
    options: ["Candy", "Chicken", "Butter", "Soda"],
    answer: 1,
  },
  {
    question: "Vitamin C is found in which food?",
    options: ["Oranges", "Bread", "Cheese", "Rice"],
    answer: 0,
  }
];

let currentQuestion = 0;
let quizScore = 0;
const correctChoice = new Audio("audio/correctanswer.mp3");
const wrongChoice = new Audio("audio/wronganswer.mp3");

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const feedbackEl = document.getElementById("quiz-feedback");
const nextBtn = document.getElementById("quiz-next-btn");
const restartBtn = document.getElementById("quiz-restart-btn");
const endScreen = document.getElementById("quiz-end-screen");
const scoreEl = document.getElementById("quiz-score");

function showQuestion() {
  const data = quizData[currentQuestion];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  data.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("quiz-option");
    btn.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const correct = quizData[currentQuestion].answer;
  if (selectedIndex === correct) {
    quizScore++;
    correctChoice.play();
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    wrongChoice.play();
    feedbackEl.textContent = "❌ Incorrect.";
    feedbackEl.style.color = "red";
  }
  // Disable all buttons
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  nextBtn.classList.remove("hidden");
  window.scrollTo(0, document.body.scrollHeight);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  endScreen.classList.remove("hidden");
  scoreEl.textContent = `You scored ${quizScore} out of ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  endScreen.classList.add("hidden");
  showQuestion();
}

// Button actions
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function scrollToTop() {
  window.scrollTo(0, 0);
}

// Show/hide button when scrolling
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTopBtn");
  const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

  btn.style.display = nearBottom ? "block" : "none";
});

const slides = document.querySelectorAll('.macro-slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  document.getElementById('nextMacro').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  document.getElementById('prevMacro').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });



  const vitaminCards = document.getElementById("vitaminCards");
  const vitaminTabs = document.querySelectorAll(".tab-btn");

  const vitaminContent = {
    water: [
      { title: "Vitamin C", info: "Boosts immunity and acts as antioxidant." },
      { title: "Vitamin B", info: "A group of vitamins with diverse functions, including energy production, nervous system support, and red blood cell formation. " },
    ],
    fat: [
      { title: "Vitamin A", info: "Important for vision and immune function." },
      { title: "Vitamin D", info: "Helps absorb calcium and strengthens bones." },
    ],
    macro: [
      { title: "Calcium", info: "Builds strong bones and teeth." },
      { title: "Magnesium", info: "Helps with muscle and nerve function." },
    ],
    trace: [
      { title: "Iron", info: "Carries oxygen in the blood." },
      { title: "Zinc", info: "Supports immune system and wound healing." },
    ],
  };

  function updateVitaminCards(type) {
    vitaminCards.innerHTML = ""; // Clear previous cards
    vitaminContent[type].forEach((item) => {
      const card = document.createElement("div");
      card.className = "vitamin-card";
      card.innerHTML = `
        <h4>${item.title}</h4>
        <div class="vitamin-info">
          <p>${item.info}</p>
        </div>
      `;
      vitaminCards.appendChild(card);
    });
  }

  document.getElementById("btn-water").onclick = () => updateVitaminCards("water");
  document.getElementById("btn-fat").onclick = () => updateVitaminCards("fat");
  document.getElementById("btn-macro").onclick = () => updateVitaminCards("macro");
  document.getElementById("btn-trace").onclick = () => updateVitaminCards("trace");

  updateVitaminCards("water"); // Show default on load
