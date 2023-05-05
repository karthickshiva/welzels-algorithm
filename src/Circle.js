export default class Circle {
  constructor(p1, p2, p3) {
    this.center = new Point2D(0, 0);
    this.radius = Infinity;

    if (p1 && !p2 && !p3) {
      this.center = p1;
      this.radius = 0;
    } else if (p1 && p2 && !p3) {
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      this.center = new Point2D((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
      this.radius = 0.25 * (dx * dx + dy * dy);
    } else if (p1 && p2 && p3) {
      let e1 = new Point2D(p2.x - p1.x, p2.y - p1.y);
      let e2 = new Point2D(p3.x - p1.x, p3.y - p1.y);
      let edgeLen1 = (e1.x * e1.x + e1.y * e1.y) * 0.5;
      let edgeLen2 = (e2.x * e2.x + e2.y * e2.y) * 0.5;
      let det = e1.x * e2.y - e1.y * e2.x;
      if (Math.abs(det) > 0) {
        let invDet = 1.0 / det;
        let qx = (e2.y * edgeLen1 - e1.y * edgeLen2) * invDet;
        let qy = (e1.x * edgeLen2 - e2.x * edgeLen1) * invDet;
        this.center.x = qx + p1.x;
        this.center.y = qy + p1.y;
        this.radius = qx * qx + qy * qy;
      } else {
        this.center.x = this.center.y = 0;
        this.radius = Infinity;
      }
    }
  }

  contains(p) {
    let dx = p.x - this.center.x;
    let dy = p.y - this.center.y;
    let dist2 = dx * dx + dy * dy;
    return dist2 - this.radius <= 0;
  }
}

export class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
