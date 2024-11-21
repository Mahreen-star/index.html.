const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");

let score = 0;
let ballSpeed = 3;
let ballPosition = { x: 200, y: 0 };
let ballDirection = { x: 2, y: ballSpeed };
let isGameRunning = true;

document.addEventListener("mousemove", (event) => {
    const gameContainer = document.querySelector(".game-container");
    const containerRect = gameContainer.getBoundingClientRect();

    let paddleX = event.clientX - containerRect.left - paddle.offsetWidth / 2;
    paddleX = Math.max(0, Math.min(paddleX, containerRect.width - paddle.offsetWidth));

    paddle.style.left = paddleX + "px";
});

function updateBall() {
    if (!isGameRunning) return;

    const gameContainer = document.querySelector(".game-container");
    const paddleRect = paddle.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    ballPosition.x += ballDirection.x;
    ballPosition.y += ballDirection.y;

    // Bounce off walls
    if (ballPosition.x <= 0 || ballPosition.x >= containerRect.width - ball.offsetWidth) {
        ballDirection.x *= -1;
    }

    // Bounce off paddle
    if (
        ballRect.bottom >= paddleRect.top &&
        ballRect.left < paddleRect.right &&
        ballRect.right > paddleRect.left
    ) {
        ballDirection.y *= -1;
        score++;
        scoreDisplay.textContent = score;
        ballSpeed += 0.2;
    }

    // Game over if ball hits the bottom
    if (ballPosition.y >= containerRect.height) {
        alert("Game Over! Your score: " + score);
        isGameRunning = false;
    }

    ball.style.left = ballPosition.x + "px";
    ball.style.top = ballPosition.y + "px";

    if (isGameRunning) requestAnimationFrame(updateBall);
}

function restartGame() {
    score = 0;
    ballSpeed = 3;
    ballPosition = { x: 200, y: 0 };
    ballDirection = { x: 2, y: ballSpeed };
    isGameRunning = true;

    scoreDisplay.textContent = score;
    ball.style.left = ballPosition.x + "px";
    ball.style.top = ballPosition.y + "px";

    requestAnimationFrame(updateBall);
}

updateBall();