import Canvas from 'canvas';

import { fillQuadTex } from './utils/fillQuadTex';
import { tesselation } from './constants';

const { loadImage, createCanvas } = Canvas;

export const magic = async (src, srcPoints, dstPoints) => {
  const texture = await loadImage(src);

  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');
  const pattern = ctx.createPattern(texture, "no-repeat");

  ctx.fillStyle = pattern;
  fillQuadTex(ctx, srcPoints, dstPoints, {
    tiles:tesselation,
    method:"bilinear"
  });

  return canvas.toDataURL();
}
