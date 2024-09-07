const gameContainer = document.getElementById('game-container');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');

let ballPosition = 185;
let score = 0;
let gameSpeed = 3;
let isGameOver = false;
let obstacles = [];
let obstacleSpeed = gameSpeed;

document.addEventListener('keydown', moveBall);

function moveBall(event) {
    if (event.key === 'ArrowLeft' && ballPosition > 0) {
        ballPosition -= 20;
    } else if (event.key === 'ArrowRight' && ballPosition < 370) {
        ballPosition += 20;
    }
    ball.style.left = `${ballPosition}px`;
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.floor(Math.random() * 360)}px`;
    obstacle.style.top = `-40px`;
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        const obstacleTop = parseInt(obstacle.style.top);
        if (obstacleTop > 600) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score++;
            scoreDisplay.textContent = score;

            if (score % 10 === 0) {
                obstacleSpeed += 1;
            }
        } else {
            obstacle.style.top = `${obstacleTop + obstacleSpeed}px`;
            checkCollision(obstacle);
        }
    });
}

function checkCollision(obstacle) {
    const obstacleRect = obstacle.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    if (
        ballRect.left < obstacleRect.right &&
        ballRect.right > obstacleRect.left &&
        ballRect.top < obstacleRect.bottom &&
        ballRect.bottom > obstacleRect.top
    ) {
        gameOver();
    }
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    isGameOver = true;
    location.reload();
}

function gameLoop() {
    if (!isGameOver) {
        moveObstacles();

        if (Math.random() < 0.02) {
            createObstacle();
        }

        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
