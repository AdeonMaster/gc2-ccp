import Canvas from 'canvas';

import { drawArbitraryQuadImage } from './@adeon/canvas-arbitrary-quads';

// extend CanvasRenderingContext2D to support drawArbitraryQuadImage
Canvas.CanvasRenderingContext2D.prototype.drawArbitraryQuadImage = function (image, srcPoints, dstPoints) {
  drawArbitraryQuadImage(this, image, srcPoints, dstPoints);
}

export default Canvas;
