class Active {
  constructor(i, j, block, val) {
    this.i = i;
    this.j = j;
    this.block = block;
    this.side = 0;
    this.lifetime = 0;
    this.dropping = false;
    this.val = val
  }

  show() {
    this.drawShadow();
    for (let i = 0; i < this.block.pieces.length; i++) {
      for (let j = 0; j < this.block.pieces[i].length; j++) {
        if (this.block.pieces[i][j] != 0) {
          let x = this.i + i;
          let y = this.j + j;
          drawPiece(this.block.pieces[i][j], x, y);
        }
      }
    }
  }


  checkDown() {
    for (let i = 0; i < this.block.w; i++) {
      for (let j = 0; j < this.block.h; j++) {
        let checkingI = this.i + i;
        let checkingJ = this.j + j + 1;
        if (this.block.pieces[i][j] != 0 &&
          grid[checkingI][checkingJ] != 0) {
          return true;
        }
      }
    }
    return false;
  }

  update() {
    this.lifetime++;
    if (this.dropping || this.lifetime % ((11 - pace) * 5) == 0) {
      if (this.checkDown()) {
        this.placeInGrid();
      } else if (this.j < height / w - this.block.h)
        this.j++;
      else if (this.j == height / w - this.block.h)
        this.placeInGrid();
    }
  }

  placeInGrid() {
    for (let i = 0; i < this.block.pieces.length; i++) {
      for (let j = 0; j < this.block.pieces[i].length; j++) {
        if (this.block.pieces[i][j] != 0) {
          let iGrid = this.i + i;
          let jGrid = this.j + j;
          grid[iGrid][jGrid] = this.block.pieces[i][j];
        }
      }
    }
    let scoreAdded = this.block.h * this.block.w;
    let addition = '+' + scoreAdded;
    score += scoreAdded;
    textShown = addition;

    checkFullLine();
    changeActive();
  }

  rotate() {
    this.side = (this.side + 1) % 4;
    //Swap height and width
    let temp = this.block.w;
    this.block.w = this.block.h;
    this.block.h = temp;

    while (this.i + this.block.w > (width - offset) / w) {
      this.i--;
    }

    let tempArr = this.block.pieces;
    this.block.pieces = [];

    for (let i = 0; i < this.block.w; i++) {
      this.block.pieces[i] = [];
      for (let j = 0; j < this.block.h; j++) {
        let val = tempArr[j][i];
        this.block.pieces[i][j] = val;
      }
    }

    if (this.val != 4 && this.val != 6)
      if (this.side == 0 || this.side == 2)
        this.flip();
  }

  /*
  0 :
    [
      [0, 4],
      [0, 4],
      [4, 4]
    ]
  1 :
    [
      [0, 0, 4],
      [4, 4, 4]
    ]

  2:
    [
      [4, 4],
      [4, 0],
      [4, 0]
    ]
  3 :
    [
    [4, 4, 4],
    [0, 0, 4]
  ]
  */

  flip() {
    let tempArr = this.block.pieces;
    this.block.pieces = [];
    for (let i = 0; i <  this.block.w; i++) {
      this.block.pieces[i] = [];
      for (let j = 0; j < this.block.h; j++) {
        this.block.pieces[i][j] = 0;
      }
    }

    //Flip horizontally
    for (let i = 0; i <  this.block.w; i++) {
      for (let j = 0; j < this.block.h; j++) {
        let index = this.block.h - (j + 1);
        let val = tempArr[i][index];
        this.block.pieces[i][j] = val;
      }
    }

    //Flip vertically
    for (let i = 0; i <  this.block.w; i++) {
      for (let j = 0; j < this.block.h; j++) {
        let index = this.block.w - (i + 1);
        let val = tempArr[index][j];
        this.block.pieces[i][j] = val;
      }
    }
  }

  slide(dir) {
    let goOn = true;
    for (let i = 0; i < this.block.pieces.length && goOn; i++) {
      for (let j = 0; j < this.block.pieces[i].length && goOn; j++) {
        let gridI = this.i + i + dir;
        let gridJ = this.j + j;
        if (grid[gridI][gridJ] != 0)
          goOn = false;
      }
    }
    if (goOn) {
      this.i += dir;
    }
  }

  findShadowSpot() {
    let found = false;
    let spot = createVector(this.i, height / w - 1);
    for (let j = this.j; j < height / w; j++) {
      if (!this.verifySpot(this.i, j)) {
        spot.y = j - 1;
        return spot;
      }
    }
    return spot;
  }

  verifySpot(x, y) {
    for (let i = 0; i <  this.block.pieces.length; i++) {
      let gridI = x + i;
      for (let j = 0; j < this.block.pieces[i].length; j++) {
        let gridJ = y + j;
        if (grid[gridI][gridJ] != 0 && this.block.pieces[i][j] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  drawShadow() {
    fill(150);
    stroke(0);
    strokeWeight(3);
    let spot = this.findShadowSpot();
    for (let i = 0; i < this.block.pieces.length; i++) {
      for (let j = 0; j < this.block.pieces[i].length; j++) {
        if (this.block.pieces[i][j] != 0) {
          let x = (i + spot.x) * w + offset;
          let y = (j + spot.y) * w;
          rect(x, y, w, w);
        }
      }
    }
  }
}
