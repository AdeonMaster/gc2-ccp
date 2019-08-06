import { fillTexPath } from './fillTexPath';

export const fillTriTex = (ctx, src, dst) => {
  ctx.beginPath();
  for (let {x, y} of dst) {
    ctx.lineTo(x,y);
  }
  ctx.closePath();

  const [
    [x0, y0],
    [x1, y1],
    [x2, y2]
  ] = dst.map(({x, y}) => [x, y]);
  const [
    [u0,v0],
    [u1,v1],
    [u2,v2]
  ] = src.map(({x, y}) => [x, y]);

  fillTexPath(ctx, x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2);
}
