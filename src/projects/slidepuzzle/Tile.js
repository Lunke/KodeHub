
class Tile {

  constructor(x, y, num) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.num = num;
    this.animating = false;
  }

  update(dt) {
    if (this.animating) {
      this.animX += this.dx * dt;
      this.animY += this.dy * dt;
      if (this.dx * (this.animX - (this.x * TILE_SIZE)) > 0 || this.dy * (this.animY - (this.y * TILE_SIZE)) > 0) {
        this.animating = false;
        disableInteraction = false;
      }
    }
  }

  animateTo(c, r) {
    this.animating = true;
    this.animX = this.x * TILE_SIZE;
    this.animY = this.y * TILE_SIZE;
    this.dx = this.x < c ? ANIM_SPEED : (this.x > c ? -ANIM_SPEED : 0);
    this.dy = this.y < r ? ANIM_SPEED : (this.y > r ? -ANIM_SPEED : 0);
    this.x = c;
    this.y = r;
  }

  show() {
    var x = this.animating ? this.animX : this.x * TILE_SIZE;
    var y = this.animating ? this.animY : this.y * TILE_SIZE;

    image(gradient, x, y, TILE_SIZE, TILE_SIZE, this.startX * imageTileSize, this.startY * imageTileSize, imageTileSize, imageTileSize);
    noFill();
    rect(x, y, TILE_SIZE, TILE_SIZE);

    fill(255);
    text("" + this.num, x, y, TILE_SIZE, TILE_SIZE);
  }

}
