let secretNumber;
let attempts;
let maxAttempts;
let maxRange;
let gamePaused = false;

const difficultySelect = document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const rangeInfo = document.getElementById("range-info");

const pauseBtn = document.getElementById("pauseBtn");
const pauseOptions = document.getElementById("pauseOptions");
const resumeBtn = document.getElementById("resumeBtn");
const quitPauseBtn = document.getElementById("quitPauseBtn");
const quitGameBtn = document.getElementById("quitGameBtn");

// ======== Fonctions principales ========
function startGame() {
    attempts = 0;
    gamePaused = false;

    // Gestion de la difficulté
    const diff = difficultySelect.value;
    switch (diff) {
        case "1": maxRange = 50; maxAttempts = 15; break;
        case "2": maxRange = 100; maxAttempts = 10; break;
        case "3": maxRange = 200; maxAttempts = 7; break;
        case "4": maxRange = 50; maxAttempts = 5; break;
        default: maxRange = 100; maxAttempts = 10;
    }

    secretNumber = Math.floor(Math.random() * maxRange) + 1;

    rangeInfo.textContent = `Devine un nombre entre 1 et ${maxRange}`;
    message.textContent = "";
    attemptsText.textContent = `Essais : 0 / ${maxAttempts}`;

    guessInput.disabled = false;
    guessInput.value = "";
    guessInput.focus(); // focus automatique au démarrage
    guessBtn.disabled = false;

    pauseBtn.classList.remove("hidden");
    pauseOptions.classList.add("hidden");
    restartBtn.classList.add("hidden");
    quitGameBtn.classList.remove("hidden"); // visible tout le temps sauf pause
}

function endGame() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    pauseBtn.disabled = true;
    restartBtn.classList.remove("hidden");
}

// ======== Gestion du jeu ========
function validateGuess() {
    if (gamePaused) return;

    const guess = Number(guessInput.value.trim());

    if (!Number.isInteger(guess) || guess < 1 || guess > maxRange) {
        message.textContent = `Erreur : entre un nombre entier entre 1 et ${maxRange}`;
        guessInput.focus();
        return;
    }

    attempts++;

    if (guess < secretNumber) {
        message.textContent = "C'est plus grand !";
    } else if (guess > secretNumber) {
        message.textContent = "C'est plus petit !";
    } else {
        message.textContent = `🎉 Bravo ! Tu as trouvé en ${attempts} essais !`;
        endGame();
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `💀 Game Over ! Le nombre était ${secretNumber}`;
        endGame();
    }

    attemptsText.textContent = `Essais : ${attempts} / ${maxAttempts}`;
    guessInput.value = "";
    guessInput.focus();
}

// Validation avec le bouton
guessBtn.addEventListener("click", validateGuess);

// Validation avec la touche Entrée
guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        validateGuess();
    }
});

// ======== Gestion Pause ========
pauseBtn.addEventListener("click", () => {
    gamePaused = true;
    message.textContent = "=== Jeu en pause ===";
    guessInput.disabled = true;
    guessBtn.disabled = true;

    pauseBtn.classList.add("hidden");        // cacher Pause
    pauseOptions.classList.remove("hidden"); // montrer menu pause
    quitGameBtn.classList.add("hidden");     // cacher Quitter principal
});

resumeBtn.addEventListener("click", () => {
    gamePaused = false;
    message.textContent = "Reprise du jeu !";
    guessInput.disabled = false;
    guessBtn.disabled = false;

    pauseOptions.classList.add("hidden");    // cacher menu pause
    pauseBtn.classList.remove("hidden");     // réafficher Pause
    quitGameBtn.classList.remove("hidden");  // réafficher Quitter principal
    guessInput.focus();                       // focus après reprise
});

quitPauseBtn.addEventListener("click", () => {
    message.textContent = "Tu as quitté la partie !";
    endGame();
    pauseOptions.classList.add("hidden");
    quitGameBtn.classList.remove("hidden"); // réaffiche Quitter principal
});

// ======== Quitter principal ========
quitGameBtn.addEventListener("click", () => {
    window.close();
    window.location.href = "about:blank";
});

// ======== Rejouer et changer difficulté ========
restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

// ======== Démarrage initial ========
startGame();
