const canvas = document.getElementById('canvas');
const plus_btn = document.getElementById('increase');
const minus_btn = document.getElementById('decrease');

const pen_sizeEl = document.getElementById('pen-size');
const colorEl = document.getElementById('color-picker');
const clearEl = document.getElementById('clear-drawing');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
colorEl.value = 'black';
let color = colorEl.value;

let x, y;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

function drawCircle(a, b) {
    ctx.beginPath();
    ctx.arc(a, b, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(a1, b1, a2, b2) {
    ctx.beginPath();
    ctx.moveTo(a1, b1);
    ctx.lineTo(a2, b2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    pen_sizeEl.innerText = size;
}

plus_btn.addEventListener('click', () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }
    updateSizeOnScreen();
});

minus_btn.addEventListener('click', () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }
    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
