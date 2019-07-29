// from: https://github.com/mrdoob/three.js/blob/r91/examples/js/renderers/CanvasRenderer.js#L917
// math: http://extremelysatisfactorytotalitarianism.com/blog/?p=2120
export const fillTexPath = (ctx, x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2) => {
  let a, b, c, d, e, f, det, idet;

  x1 -= x0; y1 -= y0;
  x2 -= x0; y2 -= y0;

  u1 -= u0; v1 -= v0;
  u2 -= u0; v2 -= v0;

  det = u1 * v2 - u2 * v1;

  if ( det === 0 ) return;

  idet = 1 / det;

  a = ( v2 * x1 - v1 * x2 ) * idet;
  b = ( v2 * y1 - v1 * y2 ) * idet;
  c = ( u1 * x2 - u2 * x1 ) * idet;
  d = ( u1 * y2 - u2 * y1 ) * idet;

  e = x0 - a * u0 - c * v0;
  f = y0 - b * u0 - d * v0;

  ctx.save();
  ctx.transform( a, b, c, d, e, f );
  ctx.fill();
  ctx.restore();
}
