let blocksPieces = [
  [
    [1],
    [1],
    [1],
    [1]
  ],
  [
    [2, 2],
    [2, 2]
  ],
  [
    [3, 0],
    [3, 3],
    [3, 0]
  ],
  [
    [0, 4],
    [0, 4],
    [4, 4]
  ],
  [
    [5, 0],
    [5, 5],
    [0, 5]
  ],
  [
    [6, 0],
    [6, 0],
    [6, 6]
  ],
  [
    [0, 7],
    [7, 7],
    [7, 0]
  ]
];

function loadBlocks() {
  for (let n = 0; n < blocksPieces.length; n++) {
    let arr = blocksPieces[n];
    let h = arr[0].length;
    let w = arr.length;
    let block = new Block(arr, w, h);
    blocks.push(block);
  }
}

class Block {
  constructor(pieces, w, h) {
    this.pieces = pieces;
    this.w = w;
    this.h = h;
  }
}
