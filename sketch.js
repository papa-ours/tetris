/**
 * Created By : Vincent Gagnon
 * Game : Tetris
 * In this file : The draw loop, global variables, setup
 */

let grid; //Placed pieces and empty spots
let active; //Active piece
let w; //Width of the squares
let pace; //Speed of the active piece to go down
let score;
let offset = 300;
let onHold = 0;
let next;
let textShown = '';
let blocks = [];
let playing;
let replayButton;

function setup() {
  createCanvas(500 + offset, 900).mousePressed(canvasPressed);
  w = (width - offset) / 10;
  loadBlocks();
  resetGame();
}

function draw() {
  background(200);
  drawGrid();
  drawOnHold();
  drawScore();
  drawSpeed();
  drawNext();
  active.update();
  active.show();
  showText();
}

let looping = true;

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (active.i + active.block.w < (width - offset) / w)
      active.slide(1);
  }

  if (keyCode === LEFT_ARROW) {
    if (active.i > 0)
      active.slide(-1);
  }

  if (keyCode === UP_ARROW) {
    active.rotate();
  }

  if (keyCode === DOWN_ARROW) {
    active.dropping = true;
  }

  if (key === ' ') {
    if (looping) {
      noLoop();
    } else {
      loop();
    }
    looping = !looping;
  }

  if (keyCode === RETURN) {
    swapOnHold();
  }
}
