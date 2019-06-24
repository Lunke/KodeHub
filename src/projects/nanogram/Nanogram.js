var HEADER_HEIGHT = 100;
var HEART_SIZE = 40;
var HEART_PADDING = 10;
var BOX_PADDING = 3;
var TILE_SIZE = 40;
var NUM_ROWS;
var NUM_COLS;

var totalLives = 3;
var lives = totalLives;

var tiles = [];
var done = false;
var won = false;

var image_heart;
var image_heart_empty;

var blackImage;
var colorImage;

function preload() {
    image_heart = loadImage("src/projects/nanogram/res/heart.png");
    image_heart_empty = loadImage("src/projects/nanogram/res/heart_empty.png");

    blackImage = loadImage("src/projects/nanogram/res/0_black.png");
    colorImage = loadImage("src/projects/nanogram/res/0_color.png");
}

function setup() {
    setupTiles();

    var canvas = createCanvas((NUM_COLS + 2) * TILE_SIZE + 1, HEADER_HEIGHT + (NUM_ROWS + 2) * TILE_SIZE + 1);
    canvas.parent("canvas_wrapper");
}



function setupTiles() {
    tiles = [];
    blackImage.loadPixels();
    colorImage.loadPixels();

    NUM_ROWS = blackImage.height;
    NUM_COLS = blackImage.width;

    for (var r = 0; r < NUM_ROWS; r++) {
        var row = [];
        for (var c = 0; c < NUM_COLS; c++) {
            var index = (r * NUM_ROWS + c) * 4;
            var tile = new Tile();
            tile.isPixel = blackImage.pixels[index + 3] == 255;
            tile.color = [colorImage.pixels[index], colorImage.pixels[index + 1], colorImage.pixels[index + 2]];
            row.push(tile);
        }
        tiles.push(row);
    }
}

function draw() {
    background(255);

    strokeWeight(2);
    for (var r = 0; r < NUM_ROWS; r++) {
        for (var c = 0; c < NUM_COLS; c++) {
            var tile = tiles[r][c];
            tile.drawAt(r, c);
        }
    }

    stroke(0, 0, 20);
    noFill();

    if (!won) {
        for (var i = 0; i < 9; i++) {
            var x = TILE_SIZE * (2 + (i % 3) * 5);
            var y = HEADER_HEIGHT + TILE_SIZE * (2 + floor(i / 3) * 5);
            rect(x, y, TILE_SIZE * 5, TILE_SIZE * 5);
        }
    }

    textSize(20);

    textAlign(RIGHT, CENTER);
    for (var i = 0; i < tiles.length; i++) {
        var complete = isRowComplete(i);
        stroke(225, 230, 237);
        if (complete) {
            noFill();
        } else {
            fill(233, 237, 248);
        }

        rect(BOX_PADDING, BOX_PADDING + HEADER_HEIGHT + (i + 2) * TILE_SIZE, TILE_SIZE * 2 - BOX_PADDING * 2, TILE_SIZE - BOX_PADDING * 2, 4)
        noStroke();

        if (complete) {
            fill(200, 200, 210);
        } else {
            fill(30, 25, 85);
        }
        var txt = getTextForRow(i);
        text(txt, 0, HEADER_HEIGHT + (i + 2) * TILE_SIZE, TILE_SIZE * 2, TILE_SIZE);
    }

    textAlign(CENTER, BASELINE);
    for (var i = 0; i < NUM_COLS; i++) {
        var complete = isColComplete(i);
        stroke(225, 230, 237);
        if (complete) {
            noFill();
        } else {
            fill(233, 237, 248);
        }
        rect((i + 2) * TILE_SIZE + BOX_PADDING, HEADER_HEIGHT + BOX_PADDING, TILE_SIZE - BOX_PADDING * 2, TILE_SIZE * 2 - BOX_PADDING * 2, 4);

        noStroke();

        if (complete) {
            fill(200, 200, 210);
        } else {
            fill(30, 25, 85);
        }
        var txt = getTextForCol(i);
        text(txt, (i + 2) * TILE_SIZE, HEADER_HEIGHT, TILE_SIZE, TILE_SIZE * 2);
    }

    var tot_width = totalLives * HEART_SIZE + (totalLives - 1) * HEART_PADDING;
    var startX = (width - tot_width) / 2;
    for (var i = 0; i < totalLives; i++) {
        var img = i < lives ? image_heart : image_heart_empty;
        image(img, startX + i * HEART_SIZE + (HEART_PADDING * i), 10, HEART_SIZE, HEART_SIZE);
    }

    if (done) {
        textAlign(CENTER, TOP);
        textSize(12);
        text("Space to restart", width / 2, HEART_SIZE + 20);
    }
}

function isRowComplete(row) {
    for (var i = 0; i < tiles[row].length; i++) {
        if (tiles[row][i].isHidden && tiles[row][i].isPixel) {
            return false;
        }
    }
    return true;
}

function isColComplete(col) {
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i][col].isHidden && tiles[i][col].isPixel) {
            return false;
        }
    }
    return true;
}

function getTextForRow(row) {
    var text = "";
    var count = 0;
    for (var i = 0; i < tiles[row].length; i++) {
        if (tiles[row][i].isPixel) {
            count += 1;
        } else if (count != 0) {
            text += "  " + count;
            count = 0;
        }
    }
    if (count != 0) {
        text += count;
    }

    if (text == "") {
        text = "0";
    }
    return text + " ";
}


function getTextForCol(col) {
    var text = "";
    var count = 0;
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i][col].isPixel) {
            count += 1;
        } else if (count != 0) {
            text += count + "\n";
            count = 0;
        }
    }
    if (count != 0) {
        text += count + "\n";
    }

    if (text == "") {
        text = "0";
    }
    return text;
}

function mousePressed() {
    tapped();
}

function mouseDragged() {
    tapped();
}

function tapped() {
    var c = floor(mouseX / TILE_SIZE) - 2;
    var r = floor((mouseY - HEADER_HEIGHT) / TILE_SIZE) - 2;
    if (c < 0 || c >= NUM_COLS || r < 0 || r >= NUM_ROWS || done) {
        return;
    }
    var tile = tiles[r][c];
    if (tile.isHidden) {
        if (mouseButton === LEFT && !keyIsDown(16)) {
            revealCell(c, r, true);
        } else if (mouseButton === RIGHT || (mouseButton === LEFT && keyIsDown(16))) {
            revealCell(c, r, false);
        }
    }
}

function keyPressed() {
    if (done && keyCode === 32) {
        restart();
    }
}

function restart() {
    for (var r = 0; r < NUM_ROWS; r++) {
        for (var c = 0; c < NUM_COLS; c++) {
            tiles[r][c].isHidden = true;
        }
    }
    won = false;
    done = false;
    lives = totalLives;
}

function checkWin() {
    won = true;
    for (var r = 0; r < NUM_ROWS; r++) {
        for (var c = 0; c < NUM_COLS; c++) {
            if (tiles[r][c].isHidden && tiles[r][c].isPixel) {
                won = false;
                break;
            }
        }
    }
    if (won) {
        done = true;
        for (var r = 0; r < NUM_ROWS; r++) {
            for (var c = 0; c < NUM_COLS; c++) {
                tiles[r][c].isHidden = false;
            }
        }
    }
}




function revealCell(x, y, leftClicked) {
    var tile = tiles[y][x];
    tile.isHidden = false;
    if (leftClicked != tile.isPixel) {
        lives--;
        if (lives == 0) {
            done = true;
        }
    } else {
        checkWin();
    }
}
