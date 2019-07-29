import d3 from 'd3';

import { seamOverlap } from '../constants';
import { projectPoint } from './projectPoint';
import { forwardProjectionMatrixForPoints } from './forwardProjectionMatrixForPoints';
import { fillTriTex } from './fillTriTex';

// See figure: https://github.com/bschwind/Face-Squash
const lerpQuad = q => {
  const p01 = d3.interpolate(q[0],q[1]);
  const p32 = d3.interpolate(q[3],q[2]);

  return (s,t) => d3.interpolate(p01(s), p32(s))(t);
};

// return the triangles to fill the cell at the given row/column
const rowColTris = (r,c, { lerp, projection }, tiles) => {
  const pad = seamOverlap; // we add padding to remove tile seams
  let p;
  if (lerp) p = (r,c) => lerp(c/tiles, r/tiles);
  if (projection) p = (r, c) => projectPoint({ x: c / tiles, y: r / tiles }, projection);

  return [
    /*
    0-----1
     \    |
       \  |  top
         \|
          2
    */
    [
      p(r-pad,c-pad*2), // extra diagonal padding
      p(r-pad,c+1+pad),
      p(r+1+pad*2,c+1+pad) // extra diagonal padding
    ],
    /*
    2
    |\
    |  \   bottom
    |    \
    1-----0
    */
    [
      p(r+1+pad,c+1+pad),
      p(r+1+pad,c-pad),
      p(r-pad,c-pad)
    ]
  ];
};

export const fillQuadTex = (ctx, src, dst, opts = {}) => {
  const tiles = opts.tiles || 10;
  const method = opts.method || 'perspective'; // or bilinear

  const lerpSrc = lerpQuad(src);
  const lerpDst = lerpQuad(dst);
    
  const projectionSrc = forwardProjectionMatrixForPoints(src);
  const projectionDst = forwardProjectionMatrixForPoints(dst);

  // clip to erase the external padding
  ctx.save();
  ctx.beginPath();
  for (let {x,y} of dst) {
    ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.clip();
    
  // draw triangles
  for (let r of d3.range(tiles)) {
    for (let c of d3.range(tiles)) {
      let srcTop, srcBot, dstTop, dstBot;
      if (method === "bilinear") {
        [srcTop, srcBot] = rowColTris(r,c,{lerp:lerpSrc}, tiles);
        [dstTop, dstBot] = rowColTris(r,c,{lerp:lerpDst}, tiles);
      } else if (method === "perspective") {
        [srcTop, srcBot] = rowColTris(r,c,{projection:projectionSrc}, tiles);
        [dstTop, dstBot] = rowColTris(r,c,{projection:projectionDst}, tiles);
      }
      fillTriTex(ctx, srcTop, dstTop);
      fillTriTex(ctx, srcBot, dstBot);
    }
  }
  ctx.restore();
}
