const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');
const SNAKE_SIZE = 64;
const crashSound = new Audio('media/crash.mp3');
const crunchSound = new Audio('media/crunch.mp3');
const clickSound = new Audio('media/click.mp3');
const backgroundMusic = new Audio('media/backgroundMusic.mp3');

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const snakeHead = document.createElement('img');
snakeHead.src = 'media/snakeHead.png';

const apple = document.createElement('img');
apple.src = 'media/apple.png';

let x = -SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight';
let score = 0;
let gameLoop;
let playButton;
let appkleX;
let appleY;

function getRandomNumber(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

snakeHead.onload = loadGame;

function loadGame() {
    backgroundMusic.play();
    let ax = getRandomNumber(0, theCanvas.width - SNAKE_SIZE);
    appkleX = ax - (ax % SNAKE_SIZE);
    let ay = getRandomNumber(0, theCanvas.height - SNAKE_SIZE)
    appleY = ay - (ay % SNAKE_SIZE);

    gameLoop = setInterval(() => { 
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        switch(direction) {
            case 'ArrowUp':
                y -= SNAKE_SIZE;
                break;
            case 'ArrowDown':
                y += SNAKE_SIZE;
                break;
            case 'ArrowLeft':
                x -= SNAKE_SIZE;
                break;
            case 'ArrowRight':
                x += SNAKE_SIZE;
                break;
        }

        if (x > theCanvas.width || y > theCanvas.height || x < 0 || y < 0) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            crashSound.play();
            gameOver();
            
            return;
        }

        context.drawImage(snakeHead, x, y);
        context.drawImage(apple, appkleX, appleY);
        displayScore();
        
    }, 500);
};

function displayScore() {
    context.fillStyle = 'green';
    context.font = '32px Cursive';
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) -10, 36);
}

function gameOver() {
    clearInterval(gameLoop);
    displayScore();
    context.fillStyle = 'red';
    context.font = '64px Cursive';
    const endText = 'Game Over!';
    const scoreText = `Score: ${score}`;
    const endMetrics = context.measureText(endText);
    const scoreMetrics = context.measureText(scoreText);
    context.fillText(endText, (theCanvas.width - endMetrics.width) /2, (theCanvas.height /2));
    context.fillText(scoreText, (theCanvas.width - scoreMetrics.width) /2, (theCanvas.height /2) + 100);
    createPlayButton();
}

[clickSound, crunchSound].forEach(sound => {
        sound.addEventListener('ended', () => {
        backgroundMusic.play();
    });
});

window.addEventListener('keydown', e => {
    backgroundMusic.pause();
    clickSound.play();
    switch(e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft':
            direction = e.key;
            break;
        default: 
            console.log(`${e.key} not processed`);
    }

});

function createPlayButton() {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeRect((theCanvas.width /2) - 75, (theCanvas.height * 0.8), 150, 50);
    context.fillStyle = '#2cc750';
    context.fillRect((theCanvas.width /2) - 75, (theCanvas.height * 0.8), 150, 50);
    context.closePath();
    context.stroke();

    context.fillStyle = 'black';
    context.font = '24px Cursive';
    const text = 'Play Again';
    context.fillText(text, ((theCanvas.width /2) - 60), (theCanvas.height * 0.8) + 30);

    playButton = { x: (theCanvas.width / 2) - 75, y: theCanvas.height * 0.8, w: 150, h: 50 };
}

theCanvas.addEventListener('click', e => {
    if (!playButton) return;
    const rect = theCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (mx >= playButton.x && mx <= playButton.x + playButton.w &&
        my >= playButton.y && my <= playButton.y + playButton.h) {
        playButton = null;
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        x = -SNAKE_SIZE;
        y = 0;
        direction = 'ArrowRight';
        score = 0;
        loadGame();
    }
});