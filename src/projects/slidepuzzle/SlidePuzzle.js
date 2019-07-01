
let TILE_SIZE = 100;
let NUM_ROWS = 4;
let NUM_COLS = 4;
let ANIM_THRESHOLD = 2;
var ANIM_SPEED = TILE_SIZE * 12;

var tiles = [];
var gradient;
var maxSize;
var imageTileSize;
var emptyPos = [NUM_COLS - 1, NUM_ROWS - 1];
var disableInteraction = false;
var prevTime = new Date();

function preload() {
  gradient = loadImage("src/projects/slidepuzzle/gradient.png");
}

function setup() {
  var canvas = createCanvas(NUM_COLS * TILE_SIZE + 1, NUM_ROWS * TILE_SIZE + 1);
  canvas.parent("canvas_wrapper");

  maxSize = max(width, height);

  if (width > height) {
    imageTileSize = gradient.width / NUM_COLS;
  } else {
    imageTileSize = gradient.height / NUM_ROWS;
  }

  var index = 1;
  for (var r = 0; r < NUM_ROWS; r++) {
    for (var c = 0; c < NUM_COLS; c++) {
      let tile = new Tile(c, r, index);
      tiles.push(tile);
      index++;
    }
  }
  tiles.pop();

  textSize(40);
  textAlign(CENTER, CENTER);
  stroke(255);

}

function draw() {
  background(0);

  let now = new Date();
  let dt = (now - prevTime) / 1000;
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].update(dt);
    tiles[i].show();
  }
  prevTime = now;
}

function mouseReleased() {
  var c = floor(mouseX / TILE_SIZE);
  var r = floor(mouseY / TILE_SIZE);
  if (disableInteraction || (emptyPos[0] == c && emptyPos[1] == r) || c < 0 || c >= NUM_COLS || r < 0 || r >= NUM_ROWS) {
    return;
  }

  if (canMoveTile(c, r)) {
    let tile = getTileAt(c, r);
    tile.animateTo(emptyPos[0], emptyPos[1]);
    emptyPos = [c, r];
  }
}

function canMoveTile(col, row) {
  if ((abs(col - emptyPos[0]) + abs(row - emptyPos[1])) == 1) {
    return true;
  }
  return false;
}

function getTileAt(col, row) {
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].x == col && tiles[i].y == row) {
      return tiles[i];
    }
  }
}

