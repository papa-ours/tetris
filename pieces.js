function createActive(index, x, y) {
  if (!x || !y) {
    x = 4;
    y = 0;
  }
  let pieces = blocksPieces[index];
  let w = pieces.length;
  let h = pieces[0].length
  let block = new Block(pieces, w, h)
  let activePiece = new Active(x, y, block, index);
  return activePiece;
}

function changeActive() {
  let index = next[0];
  active = createActive(index);
  addNext();

  if (active.verifySpot(active.i, active.j) == false) {
    lose();
  }
}

function addNext() {
  for (let i = 0; i < next.length - 1; i++) {
    next[i] = next[i + 1];
  }
  let index = floor(random(0, blocks.length));
  next[next.length - 1] = index;
}

function swapOnHold() {
  if (onHold == 0 && active.j <= 10) {
    onHold = active.val + 1;
    changeActive();
  } else if (active.j < 5) {
    let temp = onHold;
    onHold = active.val + 1;
    active = createActive(temp - 1, active.i, active.j);
  }
}
