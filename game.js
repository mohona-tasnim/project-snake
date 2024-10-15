const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{x: 8 * box, y: 8 * box}];
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let score = 0;
let direction = "";
let gameInterval;

// Function to draw the snake
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Function to update the snake's position
function update() {
    const head = {x: snake[0].x, y: snake[0].y};

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    // Check for collision with the wall
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head, snake)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}`);
        resetGame();
        return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    snake.unshift(head);
}

// Check if the snake collides with itself
function collision(head, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Reset the game when it's over
function resetGame() {
    snake = [{x: 8 * box, y: 8 * box}];
    score = 0;
    direction = "";
    gameInterval = setInterval(gameLoop, 100);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    update();
}

// Set up controls for the snake
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
});

// Start the game loop
gameInterval = setInterval(gameLoop, 100);