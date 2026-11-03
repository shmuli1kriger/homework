const theCanvas = document.querySelector('#theCanvas');
const navbar = document.querySelector('#navbar');
const context = theCanvas.getContext('2d');
const colorInput = document.querySelector('#colorInput');
const radiusInput = document.querySelector('#radiusInput');
const dropButton = document.querySelector('#dropButton');
const balls = [];

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight - navbar.offsetHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

class Ball {
    constructor(color, radius) {
        this.selectedColor = color;
        this.selectedRadius = radius;
        this.radius = radius + 1;
        this.x = this.radius;
        this.y = this.radius;
        this.dx = 1;
        this.dy = 2;
    }
     move() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < this.radius || this.x >= theCanvas.width - this.radius) {
                this.dx = -this.dx;
            }
            if (this.y < this.radius || this.y >= theCanvas.height - this.radius) {
                this.dy = (-this.dy /1.35);
            }
    }
    draw() {
        context.fillStyle = this.selectedColor;
        context.beginPath();
        context.arc(this.x, this.y, this.selectedRadius, 0, Math.PI * 2);
        context.fill();
    }
}

dropButton.addEventListener('click', () => {
    const ball = new Ball(colorInput.value, Number(radiusInput.value) || 50);
    balls.push(ball);
    balls.forEach(ball => {
        ball.draw();
    });
});

setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.forEach(ball => {
        ball.move();
        ball.draw();
    });
}, 1);


