//! variables
const height = document.documentElement.clientHeight * 0.95,
  width = document.documentElement.clientWidth * 0.97,
  round = 10,
  massHeight = 200,
  massWidth = 10;

let x = 0,
  y = 0;
let gravity = 0.3;
let yV = 0;

let massY = [randomInteger(30, height - 30 - massHeight)];
let massX = [0];

// let y1 = randomInteger(30, height - 100);
let gameInProgress = 1;

let score = 0,
  highScore = 0;

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//! game place
function setup() {
  createCanvas(width, height);
  highScore = localStorage.getItem("birdScore");
}

//! bird
function drawBird() {
  stroke(250, 100, 0);
  strokeWeight(3);
  fill(0, 0, 255);
  ellipse(width / 3, y, round * 2);

  //! falling
  x += 1;
  for (let i = 0; i < massX.length; i++) {
    massX[i] += 1;
  }
  yV += gravity;
  y += yV;
}

//! key bind
function keyPressed() {
  if (keyCode == 32) {
    yV = -7;
  }
  if (gameInProgress == 0 && keyCode == 82) {
    window.location.reload();
  }
}

//! barriers
function drawRect(xi, yi) {
  rectMode(CORNERS);
  stroke(250, 100, 0);
  strokeWeight(2);
  fill(250, 100, 0);

  rect(width - 10 - xi, 0, width - xi, yi);

  rect(width - 10 - xi, yi + massHeight, width - xi, height);
}

//! check border
function checkScreen() {
  if (y >= height) {
    gameInProgress = 0;
  }
  if (y < 0) {
    gameInProgress = 0;
  }
}

//! check bird
function checkBird() {
  let maxScore = 0;
  for (let i = 0; i < massX.length; i++) {
    if (massX[i] >= width / 1.5 + 10) {
      maxScore = i + 1;
    }
    if (massX[i] >= width / 1.5 - 20 && massX[i] < width / 1.5 + 10) {
      if (y - 10 < massY[i]) {
        gameInProgress = 0;
      }
      if (y + 10 > massY[i] + massHeight) {
        gameInProgress = 0;
      }
    }
  }
  score = maxScore;
}

//! game mechanic
function draw() {
  if (gameInProgress == 1) {
    checkScreen();
    checkBird();
    background(220, 220, 220);
    drawBird();
    if (x % 100 == 0) {
      massX.push(x - 100 * massX.length);
      massY.push(randomInteger(30, height - 30 - massHeight));
    }

    for (let i = 0; i < massX.length; i++) {
      drawRect(massX[i], massY[i]);
    }
    text(score, 10, 20);
  }
  if (gameInProgress == 0) {
    strokeWeight(2);
    fill(0, 0, 0);
    text("GAME OVER", width / 2 + 10, height / 2 - 20);
  }
  if (gameInProgress == 0) {
    strokeWeight(0);
    fill(0, 0, 0);
    text("Press 'R' to restart", width / 2, height / 2);
    text(`Score: ${score}`, width / 2 + 20, height / 2 + 20);
    text(`High Score: ${highScore}`, width / 2 + 10, height / 2 + 40);
    if (highScore == null) {
      highScore = score;
    }
    if (score > highScore) {
      highScore = score;
    }
    localStorage.setItem("birdScore", highScore);
  }
}
