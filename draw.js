/**
 * Created By : Vincent Gagnon
 * Game : Tetris
 * In this file : All functions for drawing
 */

function drawGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j  < grid[i].length; j++) {
      drawPiece(grid[i][j], i, j);
    }
  }
}

let colors = [
  [100, 100, 100],
  [78, 249, 252],
  [250, 250, 50],
  [78, 112, 255],
  [255, 144, 0],
  [3, 219, 3],
  [244, 66, 161],
  [52, 0, 137]
];

function drawPiece(piece, i, j) {
  stroke(0);
  strokeWeight(3);
  let color = colors[piece];
  fill(color);
  let x = i * w + offset;
  let y = j * w;
  rect(x, y, w, w);
  fill(255);
  textAlign(CENTER, CENTER);
}

function drawOnHold() {
  noStroke();
  fill(100);
  rect(25, 125, 250, 150);
  textAlign(CENTER, CENTER);
  textSize(20);
  strokeWeight(1);
  fill(0);
  text('On Hold : ', 100, 100);
  if (onHold != 0) {
    let onHoldBlock = blocks[onHold - 1];
    stroke(0);
    strokeWeight(3);
    let color = colors[onHold];
    fill(color);


    for (let i = 0; i < onHoldBlock.pieces.length; i++) {
      for (let j = 0; j < onHoldBlock.pieces[i].length; j++) {
        if (onHoldBlock.pieces[i][j] != 0) {
          let x = i * w + 50;
          let y = j * w + 150;
          rect(x, y, w, w);
        }
      }
    }
  }
}

function drawScore() {
  let label = `Score : ${score}`;
  textAlign(CENTER, CENTER);
  textSize(20);
  strokeWeight(1);
  fill(0);
  text(label, 100, 50);
}

function drawNext() {
  noStroke();
  fill(100);
  rect(25, 325, 250, 450);
  textSize(20);
  strokeWeight(1);
  fill(0);
  text('Next : ', 90, 300);
  stroke(0);
  strokeWeight(3);
  for (let n = 0; n < next.length; n++) {
    let index = next[n];
    let block = blocks[index];
    let color = colors[index + 1];
    fill(color);
    let yOffset = n * 150 + 350;
    for (let i = 0; i < block.pieces.length; i++) {
      for (let j = 0; j < block.pieces[i].length; j++) {
        if (block.pieces[i][j] != 0) {
          let x = i * w + 50;
          let y = j * w + yOffset;
          rect(x, y, w, w);
        }
      }
    }
  }
}

let timeShown = 0;

function showText() {
  timeShown++;
  if (timeShown == 150) {
    timeShown = false;
    textShown = '';
  }
  noStroke();
  fill(150, 227, 255);
  textAlign(CENTER, CENTER);
  strokeWeight(10);
  textSize(50);
  text(textShown, (width - offset) / 2 + offset, height / 2);
}

function drawSpeed() {
  textSize(20);
  strokeWeight(1);
  fill(0);
  text('Speed : ' + pace, 90, 835);
}

function drawLose() {
  fill(255, 150);
  rect(width / 2 - 190, height / 2 - 60, 400, 200);

  fill(255, 0, 0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  textSize(50);
  text('Game Over', width / 2, height / 2);
  fill(20, 200, 20);
  text('Click to Restart', width / 2, height / 2 + 75);
}
