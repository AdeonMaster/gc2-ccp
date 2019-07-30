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
