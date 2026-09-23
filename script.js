const gameArea = document.getElementById("game-area");
const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");
const message = document.getElementById("message");
const best = document.getElementById("best");

let startTime;
let timeout;
let waiting = false;

let bestScore = localStorage.getItem("bestScore");

if (bestScore) {
    best.textContent = `🏆 Best: ${bestScore} ms`;
}

startBtn.addEventListener("click", startGame);

function startGame() {

    clearTimeout(timeout);

    result.textContent = "";
    message.textContent = "Wait for GREEN...";
    gameArea.style.background = "crimson";

    waiting = true;

    let randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timeout = setTimeout(() => {

        gameArea.style.background = "limegreen";
        message.textContent = "CLICK NOW!";
        startTime = Date.now();
        waiting = false;

    }, randomDelay);
}

gameArea.addEventListener("click", () => {

    if (waiting) {
        clearTimeout(timeout);
        message.textContent = "❌ Too Early!";
        result.textContent = "Try Again";
        waiting = false;
        return;
    }

    if (gameArea.style.background === "limegreen") {

        let reactionTime = Date.now() - startTime;

        result.textContent =
            `⚡ Your Reaction Time: ${reactionTime} ms`;

        if (
            !bestScore ||
            reactionTime < bestScore
        ) {
            bestScore = reactionTime;
            localStorage.setItem(
                "bestScore",
                reactionTime
            );

            best.textContent =
                `🏆 Best: ${reactionTime} ms`;
        }

        message.textContent =
            "Press Start to Play Again";

        gameArea.style.background = "crimson";
    }
});