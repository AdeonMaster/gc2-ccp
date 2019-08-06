/*
  Original author: Shaun Lebron
  Original article: https://observablehq.com/@shaunlebron/texture-drawing-for-html-canvas
  Description: This package is Shaun Lebron's article adaptation for NPM
*/

import { fillQuadTex } from './utils/fillQuadTex';
import { tesselation, FILL_METHOD } from './constants';

export const drawArbitraryQuadImage = (ctx, texture, srcPoints, dstPoints, method = FILL_METHOD.BILINEAR) => {
  const pattern = ctx.createPattern(texture, 'no-repeat');

  ctx.fillStyle = pattern;

  fillQuadTex(ctx, srcPoints, dstPoints, {
    tiles: tesselation,
    method
  });
}
