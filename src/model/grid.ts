import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three';

export default class GridLine extends Line {
  constructor(row: number, col: number) {
    const material = new LineBasicMaterial({
      color: 0xffffff,
    });
    const points: Vector3[] = [];

    const halfW = 1 / 2;
    const halfH = 1 / 2;
    for (let r = 0; r <= row; r++) {
      const alpha = r / col;
      let p1 = new Vector3(-halfW, -halfH + alpha);
      let p2 = new Vector3(halfW, -halfH + alpha);

      if (r % 2 == 1) {
        [p1, p2] = [p2, p1];
      }
      points.push(p1, p2);
    }
    const lastOne = points[points.length - 1];
    points.push(new Vector3(lastOne.x, -halfH));

    for (let c = 0; c <= row; c++) {
      const alpha = c / col;
      let p1 = new Vector3(-halfW + alpha, -halfH);
      let p2 = new Vector3(-halfW + alpha, halfH);

      if (c % 2 == 1) {
        [p1, p2] = [p2, p1];
      }
      points.push(p1, p2);
    }
    const geometry = new BufferGeometry().setFromPoints(points);
    super(geometry, material);
  }
}
