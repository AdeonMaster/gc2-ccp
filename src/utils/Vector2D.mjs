export default class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(v) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }
}
