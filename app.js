const start = document.querySelector('.start');
const holes = document.querySelectorAll('.play');
const scoreBoard = document.querySelector('.score');
const mole = Array.from(document.querySelectorAll('.mole'));
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(max,min) {
    return Math.round(Math.random()*(max-min)+min);
}

function randomHole(holes) {
    let idx = Math.floor(Math.random() * holes.length);
    let hole = holes[idx];

    if (lastHole == hole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep() {
    let time = randomTime(1000,500);
    let hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function hit(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
    this.removeEventListner('click');
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => {
        timeUp = true;
    }, 10000);
}

start.addEventListener('click',startGame);
mole.forEach(mol => mol.addEventListener('click',hit));