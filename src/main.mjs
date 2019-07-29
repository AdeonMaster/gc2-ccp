import fs from 'fs';

import { magic } from './@shaunlebron/canvas-arbitrary-quads';

class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

(async () => {
  const srcPoints = [
    new Vector2D(429, 125),
    new Vector2D(590, 205),
    new Vector2D(430, 289),
    new Vector2D(270, 204)
  ];
  
  const dstPoints = [
    new Vector2D(0, 0),
    new Vector2D(256, 0),
    new Vector2D(256, 256),
    new Vector2D(0, 256)
  ];

  const result = await magic('gc2-screenshot.jpg', srcPoints, dstPoints);

  fs.writeFile('report.html', '<html><body><img src="' + result + '" /></body></html>', error => {

  });
})();
