/* ===== SELECT DOM ELEMENTS ===== */
const navButtons = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.panel');
const hamBtn = document.getElementById('hamBtn');
const navMenu = document.getElementById('main-nav');

/* ===== Stops the game upon leaving the page so it does not go on while on another page. ===== */
function stopGame() {
	cancelAnimationFrame(gameInterval);
	clearInterval(timerInterval);
	timerInterval = null;
	gameStarted = false;
	gameOver = false;
}

/* ===== Minigame start screen ===== */
function drawStartScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#696969ff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#00ff55ff";
	ctx.font = "32px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Click to Play!", canvas.width / 2, canvas.height / 2);
}

/* ===== Handles switching between sections when clicking nav buttons ===== */
navButtons.forEach(function(button) {
	button.addEventListener("click", function() {
		const targetId = button.id.replace("-btn", "");
		const targetPanel = document.getElementById(targetId);

		if (document.getElementById("minigame").classList.contains("active") && targetId !== "minigame") {
			stopGame();
		}

		panels.forEach(function(panel) {
			panel.classList.remove("active");
		});
		if (targetPanel) {
			targetPanel.classList.add("active");
		}

		if (targetId === "minigame") {
			stopGame();
			drawStartScreen();
		}
		if (targetPanel) {
			const header = document.querySelector("header");
			const headerHeight = header ? header.offsetHeight : 0;

			window.scrollTo({
				top: targetPanel.offsetTop - headerHeight,
				behavior: "smooth"
			});
		}
	});
});

/* ===== Hamburger toggle ===== */
hamBtn.addEventListener('click', function() {
	navMenu.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", function() {
	const clickSound = new Audio("audio/click.mp3");

	document.addEventListener("click", function(e) {
		if (e.target.tagName === "BUTTON") {
			clickSound.currentTime = 0;
			clickSound.play();
		}
	});

	/* ===== MACRONUTRIENTS ===== */
	/* Displays information slides for carbs, proteins and fats using an array of java script objects*/
	var macronutrientData = [{
		id: "carbs",
		title: "Carbohydrates",
		text: "Carbohydrates are the main energy source for your body and are found in various foods like fruits, vegetables, grains, and dairy products.<br>" +
			"Carbohydrates are classified into sugars, starches, and fiber, each playing a unique role in providing energy and supporting bodily functions.",
		image: "images/carbohydrates.jpg",
		subcategories: [{
			name: "Sugars",
			description: "Simple carbs that are quickly digested. Found in fruits, sweets, and soft drinks."
		}, {
			name: "Starches",
			description: "Complex carbs found in rice, potatoes, and bread. Provide sustained energy."
		}, {
			name: "Fibers",
			description: "Indigestible carbs that aid digestion. Found in veggies, whole grains, and legumes."
		}]
	}, {
		id: "proteins",
		title: "Proteins",
		text: "Proteins are essential for the body's growth, repair, and overall function.<br>" +
			"They are split into 3 categories: complete, incomplete and complementary proteins.<br>" +
			"Composed of amino acids, the building blocks the body uses to create new proteins.",
		image: "images/proteins.jpg",
		subcategories: [{
			name: "Complete Proteins",
			description: "Contain all essential amino acids. Found in meat, dairy, eggs, and soy."
		}, {
			name: "Incomplete Proteins",
			description: "Lack one or more essential amino acids. Found in beans, nuts, and grains."
		}, {
			name: "Complementary Proteins",
			description: "Combining incomplete proteins to make a complete one."
		}]
	}, {
		id: "fats",
		title: "Fats",
		text: "Fats are involved in production of certain hormones and also provide energy, help absorb vitamins for daily activities and bodily functions.<br>" +
			"Fats serve as an energy storage as they are stored in the body as adipose tissue, providing a reserve of energy for later use.<br>" +
			"Helps to maintain body temperature by providing insulation against cold.",
		image: "images/fats.jpg",
		subcategories: [{
			name: "Unsaturated Fats",
			description: "Healthy fats that help reduce cholesterol. Found in olive oil, avocados, and fish."
		}, {
			name: "Saturated Fats",
			description: "Consumption should be limited. Found in butter, cheese, and red meat."
		}, {
			name: "Trans Fats",
			description: "Unhealthy fats linked to heart disease. Found in processed foods and snacks."
		}]
	}];

	/* Render dynamic content for each macronutrients card when hovered over */
	function renderMacronutrients() {
		var container = document.getElementById("macroSlider");
		if (!container) return;
		container.innerHTML = "";
		macronutrientData.forEach(function(macro, index) {
			var slide = document.createElement("article");
			slide.className = "macro-slide " + (index === 0 ? "active" : "");
			slide.id = macro.id;

			var subHTML = "";
			macro.subcategories.forEach(function(sub) {
				subHTML += '<div class="carb-card">' +
					'<h5>' + sub.name + '</h5>' +
					'<div class="carb-popup"><p>' + sub.description + '</p></div>' +
					'</div>';
			});

			slide.innerHTML =
				'<h4>' + macro.title + '</h4>' +
				'<p>' + macro.text + '</p>' +
				'<img src="' + macro.image + '" alt="' + macro.title + ' Image">' +
				'<div class="carb-types">' + subHTML + '</div>';

			container.appendChild(slide);
		});
	}

	/* ===== DIETARY GUIDELINES ===== */
	/* Displaying dietary info with dynamic content on image map using buttons*/
	const dietaryGuidelinesData = {
		FruitsMap: {
			title: "Fruits",
			text: "A quarter plate of fruits is about one-third of your daily vitamin needs. Having this at each meal will meet the daily recommended intake.",
			examples: "A pear, 3 apricots, 2 handfuls of frozen blueberries."
		},
		GrainsMap: {
			title: "Grains",
			text: "A quarter plate of wholegrains provides about 2 servings of carbohydrates. Having this at each meal meets the recommended 5–7 servings per day.",
			examples: "2 slices of wholemeal bread, 4 wholemeal crackers, 1/2 bowl of brown rice."
		},
		VegetablesMap: {
			title: "Vegetables",
			text: "A quarter plate of vegetables provides essential vitamins and fiber. This portion at each meal helps meet daily vitamin needs.",
			examples: "1/2 cup cooked vegetables, 1 cup salad, 1/2 cup sweetcorn."
		},
		ProteinsMap: {
			title: "Protein",
			text: "A quarter plate of protein foods helps meet daily protein needs for growth and repair.",
			examples: "1 palm-sized meat portion, 3 eggs, 2 small tofu blocks."
		},
		WaterMap: {
			title: "Water",
			text: "Aim for about 11.5 cups for women and 15.5 cups for men daily. Adjust based on activity level and climate.",
			examples: "Water (priority), herbal tea, coconut water, smoothies."
		}
	};

	/* Renders cards that can be clicked on and closed by pressing the x button*/
	function renderDietaryGuidelines() {
		document.querySelectorAll('.hotspot').forEach(function(hotspot) {
			const id = hotspot.id;
			const data = dietaryGuidelinesData[id];
			if (!data) return;
			const card = document.createElement('div');
			card.className = 'tooltip-card';
			card.innerHTML =
				'<span class="tooltip-close">✖</span>' +
				"<h4>" + data.title + "</h4>" +
				"<p>" + data.text + "</p>" +
				"<h5>Examples of foods: " + data.examples + "</h5>";

			hotspot.appendChild(card);
			hotspot.addEventListener('click', function() {
				document.querySelectorAll('.tooltip-card').forEach(function(c) {
					c.classList.remove('active');
				});
				card.classList.add('active');
			});
			card.querySelector('.tooltip-close').addEventListener('click', function(e) {
				e.stopPropagation();
				card.classList.remove('active');
			});
		});
	}

	/* ===== MICRONUTRIENTS ===== */
	/* Displaying micronutrients info with dynamic content using buttons*/
	const vitaminData = {
		water: [{
			title: "Vitamin C",
			info: "Acts as an antioxidant, boosts immunity, protects cells from damage, and is crucial for collagen synthesis, wound healing, and iron absorption.",
			foods: "Foods: Citrus fruits, Bell peppers, Strawberries, Broccoli"
		}, {
			title: "Vitamin B",
			info: "A group of vitamins with diverse functions, including energy production, nervous system support, and red blood cell formation.",
			foods: "Foods: Whole grains, Meat, Eggs, Leafy greens"
		}],
		fat: [{
			title: "Vitamin A",
			info: "Important for vision, cell growth and immune function.",
			foods: "Foods: Carrots, Sweet potatoes, Spinach, Liver"
		}, {
			title: "Vitamin D",
			info: "Helps absorb calcium and phosphorus, crucial for bone health and immune function.",
			foods: "Foods: Fatty fish, fortified milk, egg yolks, sunlight exposure"
		}, {
			title: "Vitamin E",
			info: "Acts as an antioxidant, protecting cells from damage, and supports immune function.",
			foods: "Foods: Nuts, seeds, vegetable oils, leafy greens, fortified cereals"
		}, {
			title: "Vitamin K",
			info: "Essential for blood clotting and bone health.",
			foods: "Foods: Leafy greens, broccoli, Brussels sprouts"
		}],
		macro: [{
			title: "Calcium",
			info: "Builds strong bones and teeth, essential for muscle function and nerve signaling.",
			foods: "Foods: Dairy, leafy greens, fortified plant milks"
		}, {
			title: "Phosphorus",
			info: "Works with calcium to build strong bones and teeth, and helps with energy metabolism.",
			foods: "Foods: Meat, fish, poultry, dairy, nuts, legumes"
		}, {
			title: "Magnesium",
			info: "Helps with muscle and nerve function, blood sugar control, and blood pressure regulation.",
			foods: "Foods: Leafy greens, nuts, seeds, whole grains, legumes"
		}, {
			title: "Sodium",
			info: "Maintains fluid balance, essential for nerve impulses and muscle contractions.",
			foods: "Foods: Table salt, processed foods, cured meats"
		}],
		trace: [{
			title: "Iron",
			info: "Carries oxygen in the blood, essential for energy production and growth.",
			foods: "Foods: Red meat, poultry, fish, beans, lentils, spinach"
		}, {
			title: "Zinc",
			info: "Supports immune system, wound healing, and cell growth.",
			foods: "Foods: Oysters, red meat, poultry, beans, nuts, whole grains"
		}, {
			title: "Copper",
			info: "Helps in iron metabolism, red blood cell formation, and energy production.",
			foods: "Foods: Shellfish, nuts, seeds, whole grains, dark chocolate"
		}, {
			title: "Iodine",
			info: "Essential for thyroid hormone production, which regulates metabolism.",
			foods: "Foods: Iodized salt, seafood, dairy products"
		}, {
			title: "Selenium",
			info: "Acts as an antioxidant, supports thyroid function and immune health.",
			foods: "Foods: Brazil nuts, seafood, poultry, eggs, whole grains"
		}, {
			title: "Manganese",
			info: "Involved in bone formation, metabolism, and antioxidant defense.",
			foods: "Foods: Whole grains, nuts, leafy vegetables, tea"
		}]
	};

	/* Rendering new dynamic content upon changing to another tab*/
	function renderVitamins(type) {
		const container = document.getElementById("vitaminCards");
		if (!container) return;
		container.innerHTML = "";
		vitaminData[type].forEach(function(vit) {
			const card = document.createElement("div");
			card.className = "vitamin-card";
			card.innerHTML =
				"<h4>" + vit.title + "</h4>" +
				'<div class="vitamin-info">' +
				"<p>" + vit.info + "</p>" +
				"<h5>" + vit.foods + "</h5>" +
				"</div>";

			container.appendChild(card);
		});
	}

	/* Checks for which button is pressed then replacing it with new data*/
	document.querySelectorAll(".tab-btn").forEach(function(btn) {
		btn.addEventListener("click", function() {
			var type = btn.id.replace("btn-", "");
			renderVitamins(type);
		});
	});

	renderMacronutrients();
	renderDietaryGuidelines();
	renderVitamins("water");

	/* ===== Switch slides for MACRONUTRIENTS ===== */
	let currentSlide = 0;

	function showSlide(index) {
		document.querySelectorAll('.macro-slide').forEach(function(slide, i) {
			slide.classList.toggle('active', i === index);
		});
	}

	document.getElementById('nextMacro').addEventListener('click', function() {
		const slides = document.querySelectorAll('.macro-slide');
		currentSlide = (currentSlide + 1) % slides.length;
		showSlide(currentSlide);
	});

	document.getElementById('prevMacro').addEventListener('click', function() {
		const slides = document.querySelectorAll('.macro-slide');
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		showSlide(currentSlide);
	});
});

/* ===== BMI Calculator using dynamic content ===== */
const heightField = document.querySelector("#heightField");
const weightField = document.querySelector("#weightField");
const bmiResult = document.querySelector("#bmi-result");
const bmiButton = document.querySelector("#calcBMI");

bmiButton.addEventListener("click", calculateBMI);

function calculateBMI() {
	let height = parseFloat(heightField.value);
	let weight = parseFloat(weightField.value);

	if (!height || !weight || height <= 0 || weight <= 0) {
		bmiResult.innerHTML = "Please enter valid height and weight.";
		return;
	}

	let heightMeters = height / 100;
	let bmi = weight / (heightMeters * heightMeters);

	let category = "";
	if (bmi < 18.5) category = "Underweight";
	else if (bmi < 25) category = "Normal weight";
	else if (bmi < 30) category = "Overweight";
	else category = "Obese";

	bmiResult.innerHTML = "Your BMI is <strong>" + bmi.toFixed(1) + "</strong> - " + category + ".";

}

/* ===== MINI-GAME ===== */
/* Mini-game about catching food with a basket
If player catches health food score increases
else if player catches junk food life decreases
Game ends if time runs out of lives reaches 0*/
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var basket = {
	x: 150,
	y: canvas.height - 30,
	width: 60,
	height: 20
};

/* Variables */
var fallingFoods = [];
var score = 0;
var lives = 3;
var timeLeft = 30;
var gameInterval;
var timerInterval;
var gameStarted = false;
var gameOver = false;

/* Images */
var basketImage = new Image();
basketImage.src = "images/basket.png";

var foodImages = {
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

/* Audio */
var catchSound = new Audio("audio/correctcatch.mp3");
var wrongCatch = new Audio("audio/wrongcatch.mp3");

/* Controls 
Uses bool to continuously move basket left and right*/
var basketSpeed = 300;

var keys = {
	left: false,
	right: false
};

document.addEventListener("keydown", function(e) {
	if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
	if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
});

document.addEventListener("keyup", function(e) {
	if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
	if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

/* Player can tap buttons on the screen to move */
document.getElementById("leftBtn").addEventListener("touchstart", function(e) {
	e.preventDefault();
	keys.left = true;
});
document.getElementById("rightBtn").addEventListener("touchstart", function(e) {
	e.preventDefault();
	keys.right = true;
});

document.getElementById("leftBtn").addEventListener("touchend", function() {
	keys.left = false;
});
document.getElementById("rightBtn").addEventListener("touchend", function() {
	keys.right = false;
});

/* Deltatime using requestanimationFrame */
var lastTime = 0;

function gameLoop(timestamp) {
	if (!lastTime) lastTime = timestamp;
	var deltaTime = (timestamp - lastTime) / 1000; // Convert ms to seconds
	lastTime = timestamp;

	updateGame(deltaTime);
	gameInterval = requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", function() {
	if (!gameStarted || gameOver) {
		gameStarted = true;
		gameOver = false;
		startGame();
		lastTime = performance.now();
		requestAnimationFrame(gameLoop);
	}
});

/* Sets all the values back to default before starting */
function startGame() {
	fallingFoods = [];
	score = 0;
	lives = 3;
	timeLeft = 30;
	lastTime = 0;
	gameOver = false;
	keys.left = false;
	keys.right = false;

	document.getElementById("score").textContent = score;
	document.getElementById("timer").textContent = timeLeft;
	document.getElementById("lives").textContent = lives;

	cancelAnimationFrame(gameInterval);
	clearInterval(timerInterval);
	timerInterval = null;

	timerInterval = setInterval(function() {
		if (!gameOver) {
			timeLeft--;
			document.getElementById("timer").textContent = timeLeft;
			if (timeLeft <= 0 || lives <= 0) {
				endGame();
			}
		}
	}, 1000);
}

if (!gameStarted) {
	ctx.fillStyle = "#696969ff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#00ff55ff";
	ctx.font = "32px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Click to Play!", canvas.width / 2, canvas.height / 2);
	keys.left = false;
	keys.right = false;
}

function endGame() {
	ctx.fillStyle = "#696969ff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#00ff55ff";
	ctx.font = "32px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 20);
	gameOver = true;
	keys.left = false;
	keys.right = false;
	clearInterval(timerInterval);
	timerInterval = null;
	cancelAnimationFrame(gameInterval);
	alert("Your score: " + score);
}

/* Renders the basket and fruits, updates the game state  and checks conditions*/
function updateGame(deltaTime) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (!gameStarted) return;
	if (gameOver) return;

	ctx.drawImage(basketImage, basket.x, basket.y, basket.width, basket.height);

	if (keys.left) basket.x -= basketSpeed * deltaTime;
	if (keys.right) basket.x += basketSpeed * deltaTime;

	basket.x = Math.max(0, Math.min(canvas.width - basket.width, basket.x));

	/* Spawn food */
	if (Math.random() < deltaTime * 2.5) {
		var foodPool = [{
			type: "healthy",
			name: "carrot"
		}, {
			type: "healthy",
			name: "apple"
		}, {
			type: "healthy",
			name: "veggie"
		}, {
			type: "junk",
			name: "soda"
		}, {
			type: "junk",
			name: "burger"
		}];

		var selected = foodPool[Math.floor(Math.random() * foodPool.length)];

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

	for (var i = fallingFoods.length - 1; i >= 0; i--) {
		var food = fallingFoods[i];
		food.y += food.speed * deltaTime;

		var img = foodImages[food.name];
		if (img) {
			ctx.drawImage(img, food.x, food.y, food.width, food.height);
		}

		var foodBottom = food.y + food.height;

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
			//Remove food
			fallingFoods.splice(i, 1);
		} else if (food.y > canvas.height) {
			fallingFoods.splice(i, 1);
		}
	}
}



/* ===== QUIZ ===== */
/* Quiz using forms but with dynamic content
Checks all answers when submitting
Requires all questions to be answered b4 submitting
Some audio if all questions are answered correctly or not */
var quizData = [{
	question: "1. Which nutrient provides energy?",
	options: ["Vitamins", "Proteins", "Carbohydrates", "Minerals"],
	answer: 2
}, {
	question: "2. Which is a good source of protein?",
	options: ["Candy", "Chicken", "Butter", "Soda"],
	answer: 1
}, {
	question: "3. According to the dietary guidelines, how much of your plate should be fruits?",
	options: ["Half", "Quarter", "Three-quarters", "None"],
	answer: 1
}, {
	question: "4. Wholegrains are a good source of:",
	options: ["Protein", "Carbohydrates", "Vitamin C", "Fats"],
	answer: 1
}, {
	question: "5. Vitamin C is found in which food?",
	options: ["Oranges", "Bread", "Cheese", "Rice"],
	answer: 0
}, {
	question: "6. Vitamin A is important for:",
	options: ["Energy production", "Vision", "Bone strength", "Digestive health"],
	answer: 1
}];

var quizForm = document.getElementById("quiz-form");
var quizContainer = document.getElementById("quiz-container");
var feedbackEl = document.getElementById("quiz-feedback");
var scoreEl = document.getElementById("quiz-score");
var endScreen = document.getElementById("quiz-end-screen");
var restartBtn = document.getElementById("quiz-restart-btn");

var correctChoice = new Audio("audio/correctanswer.mp3");
var wrongChoice = new Audio("audio/wronganswer.mp3");

function renderFullQuiz() {
	quizContainer.innerHTML = "";

	for (var index = 0; index < quizData.length; index++) {
		var q = quizData[index];

		var questionDiv = document.createElement("div");
		questionDiv.classList.add("quiz-question");

		var optionsHTML = "";
		for (var i = 0; i < q.options.length; i++) {
			optionsHTML +=
				'<label>' +
				'<input type="radio" name="q' + index + '" value="' + i + '">' +
				q.options[i] +
				'</label>';
		}

		questionDiv.innerHTML =
			"<p><strong>" + q.question + "</strong></p>" +
			'<div class="quiz-options">' +
			optionsHTML +
			"</div>";

		quizContainer.appendChild(questionDiv);
	}
}

//Check condition when submitting
quizForm.addEventListener("submit", function(e) {
	e.preventDefault();

	var score = 0;
	var unanswered = 0;

	for (var index = 0; index < quizData.length; index++) {
		var selected = quizForm.querySelector('input[name="q' + index + '"]:checked');
		if (!selected) {
			unanswered++;
		} else if (parseInt(selected.value, 10) === quizData[index].answer) {
			score++;
		}
	}

	if (unanswered > 0) {
		feedbackEl.textContent = "❗ You missed " + unanswered + " question(s). Please answer all before submitting.";
		feedbackEl.style.color = "red";
		return;
	}

	if (score >= 6) {
		correctChoice.play();
	} else {
		wrongChoice.play();
	}

	feedbackEl.textContent = "";
	scoreEl.textContent = "You scored " + score + " out of " + quizData.length;
	endScreen.classList.remove("hidden");
	quizForm.classList.add("hidden");
});

// Restart quiz
restartBtn.addEventListener("click", function() {
	quizForm.classList.remove("hidden");
	endScreen.classList.add("hidden");
	feedbackEl.textContent = "";
	quizForm.reset();
	renderFullQuiz();
});

renderFullQuiz();

/* When at bottom of page go back to top */
const backToTopBtn = document.getElementById('backToTopBtn');

function scrollToTop() {
	window.scrollTo(0, 0);
}

if (backToTopBtn) {
	backToTopBtn.addEventListener('click', scrollToTop);
}

window.addEventListener("scroll", function() {
	var btn = document.getElementById("backToTopBtn");
	var nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

	btn.style.display = nearBottom ? "block" : "none";
});

/* ===== Fullscreen toggle ===== */
var btnFS = document.querySelector("#btnFS");
var fullscreenToggle = false;
btnFS.addEventListener("click", enterFullscreen);

function enterFullscreen() {
	if (fullscreenToggle === false) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		}
		fullscreenToggle = true;
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		fullscreenToggle = false;
	}
}