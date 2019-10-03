export default class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  distance(v) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }
}
