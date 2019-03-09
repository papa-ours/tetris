/**
 * Created By : Vincent Gagnon
 * Game : Tetris
 * In this file : Useful functions for game mechanics
 */

function updatePace() {
  pace = paceSlider.value();
  let label = `Speed : ${pace}`;
  paceSpan.html(label);
}

function setupGrid() {
  grid = [];
  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < height / w; j++)  {
      grid[i][j] = 0;
    }
  }
}

function drop(i) {
  let gridW = (width - offset) / w;
  let gridH = height / w;
  for (let j = 0; j < gridW; j++) {
    for (let k = i; k > 0; k--) {
      grid[j][k] = grid[j][k - 1];
    }
  }
  for (let j = 0; j < gridW; j++) {
    grid[j][0] = 0;
  }
}

function dropSquare(i, j) {
  let spotFound = false
  let spot = createVector(i, j);
  for (let k = j; k < height / w && !spotFound; k++) {
    if (grid[i][k] != 0) {
      spot.y = k - 1;
      spotFound = true;
    }
  }
  grid[spot.x][spot.y] = grid[i][j];
}

function checkFullLine() {
  let nFull = 0;
  let gridW = (width - offset) / w;
  let gridH = height / w;
  for (let i = 0; i < gridH; i++) {
    let full = true;
    for (let j = 0; j < gridW && full; j++) {
      if (grid[j][i] == 0)
        full = false;
    }

    if (full) {
      for (let j = 0; j < gridW; j++) {
        grid[j][i] = 0;
      }
      nFull++;
      drop(i);
    }
  }

  if (nFull >  0) {
    timeShown = 0;
    if (nFull == 4) {
      textShown = 'Tetris! +40'
    } else {
      textShown = '+' + nFull * 10;
    }
    score += nFull * 10;
    pace = floor((score / 30) / 5) + 1;
  }
}

function setupNext() {
  next = [];
  for (let i = 0; i < 3; i++) {
    let index = floor(random(0, blocks.length));
    next.push(index);
  }
}

function resetGame() {
  score = 0;
  pace = 1;
  playing = true;
  setupNext();
  setupGrid();
  changeActive();
}

function lose() {
  playing = false;
  noStroke();
  fill(244, 60, 60, 100);
  rect(0, 0, width, height);
  textShown = '';
  noLoop();

  drawLose();
}

function canvasPressed() {
  if (!playing) {
    resetGame();
    loop();
  }
}
