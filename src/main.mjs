import fs from 'fs';
import Canvas from 'canvas';
import Jimp from 'jimp';

import { drawArbitraryQuadImage } from './@adeon/canvas-arbitrary-quads';
import Vector2D from './utils/Vector2D';
import BlueStacksWindow from './bluestacks/window';
import { bitmapToImageData } from './utils/image';

const { createCanvas } = Canvas;

const targetViewportResolution = {
  width: 1560,
  height: 776,
  offsetX: 164,
  offsetY: 42
};

// initial quadrilateral map points (6x6 grid from 1232x693 viewport resolution) [found by hand]
const quadrilateralMapSrcPoints = [
  new Vector2D(0, 387),
  new Vector2D(780, 0),
  new Vector2D(1559, 388),
  new Vector2D(779, 775)
];

// calculate quadrilateral map result image width based on distance between two src points
const quadrilateralMapQuadWidth = Math.round(quadrilateralMapSrcPoints[0].distance(quadrilateralMapSrcPoints[1]));

// calculate tile width after quadrilateral map
const tileWidth = quadrilateralMapQuadWidth / 8;

const quadrilateralMapDstPoints = [
  new Vector2D(0, 0),
  new Vector2D(quadrilateralMapQuadWidth, 0),
  new Vector2D(quadrilateralMapQuadWidth, quadrilateralMapQuadWidth),
  new Vector2D(0, quadrilateralMapQuadWidth)
];

const viewportCanvas = createCanvas(targetViewportResolution.width, targetViewportResolution.height);
const viewportCtx = viewportCanvas.getContext('2d');

const quadrilateralMapCanvas = createCanvas(quadrilateralMapQuadWidth, quadrilateralMapQuadWidth);
const quadrilateralMapCtx = quadrilateralMapCanvas.getContext('2d');

(async () => {
  // init bswindow & set it to front
  const bswindow = new BlueStacksWindow();
  bswindow.setForeground();

  // get bswindow viewport & capture a screenshot from it
  const viewport = bswindow.getViewport();
  const viewportBitmap = viewport.capture();

  // render captured viewport on canvas
  const viewportImageData = bitmapToImageData(viewportBitmap);
  viewportCtx.putImageData(viewportImageData, targetViewportResolution.offsetX, targetViewportResolution.offsetY);

  // apply quadrilateral map on viewportCanvas with output on quadrilateralMapCanvas
  drawArbitraryQuadImage(quadrilateralMapCtx, viewportCanvas, quadrilateralMapSrcPoints, quadrilateralMapDstPoints);

  // transform canvases to base64
  const viewportBase64 = viewportCanvas.toDataURL();
  const quadrilateralMapBase64 = quadrilateralMapCanvas.toDataURL();

  const tiles = [];
  for(let col = 0; col < 8; ++col) {
    const gg = [];
    for(let row = 0; row < 8; ++row) {
      const tileImageData = quadrilateralMapCtx.getImageData(tileWidth * row, tileWidth * col, tileWidth, tileWidth);
      const canvas = createCanvas(tileWidth, tileWidth);
      const ctx = canvas.getContext('2d');
      ctx.putImageData(tileImageData, 0, 0);

      gg.push(canvas.toDataURL());
    }
    tiles.push(gg);
  }
  
  // write html report with images
  fs.writeFile('generated.html', `
    <html>
      <body>
        <img src="${viewportBase64}" />
        <br/>
        <img src="${quadrilateralMapBase64}" />
        <br/>
        ${tiles.map(tile => tile.map(gg => `<img src="${gg}" />`).join('')).join('<br/>')}
      </body>
    </html>`,
    error => {
      error && console.log(error);
    }
  );
})();

// const robotjsImageToJimp = bitmap => {
//   return new Promise((resolve, reject) => {
//     const { image, width, height } = bitmap;

//     new Jimp({ data: image, width, height }, (err, image) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(image);
//       }
//     });
//   });
// };

// (async () => {
//   const window = new BlueStacksWindow();
//   window.setForeground();

//   const viewport = window.getViewport();
//   const bitmap = viewport.capture();

//   const srcPoints = [
//     new Vector2D(30, 346),
//     new Vector2D(615, 53),
//     new Vector2D(1200, 346),
//     new Vector2D(615, 639)
//   ];

//   const dstPoints = [
//     new Vector2D(0, 0),
//     new Vector2D(654, 0),
//     new Vector2D(654, 654),
//     new Vector2D(0, 654)
//   ];

//   const canvas = createCanvas(dstPoints[2].x, dstPoints[2].y);
//   const ctx = canvas.getContext('2d');

//   const bufferCanvas = createCanvas(bitmap.width, bitmap.height);
//   const bufferCtx = bufferCanvas.getContext('2d');
//   const imageData = createImageData(new Uint8ClampedArray(bitmap.image), bitmap.width, bitmap.height);
//   bufferCtx.putImageData(imageData, 0, 0);

//   drawArbitraryQuadImage(ctx, bufferCanvas, srcPoints, dstPoints);

//   const result = bufferCanvas.toDataURL();
//   const quadrilateralResult = canvas.toDataURL();

//   console.log(Buffer.from(ctx.getImageData(0, 0, bitmap.width, bitmap.height).data));

//   const image = await robotjsImageToJimp({
//     image: Buffer.from(ctx.getImageData(0, 0, bitmap.width, bitmap.height).data),
//     width: bitmap.width,
//     height: bitmap.height
//   });
  
//   // const tiles = [];
//   // for(let i = 0; i < 5; ++i) {
//   //   for(let j = 0; j < 5; ++j) {
//   //     const tile = image.crop(i * 109, j * 109, 109, 109);
//   //     const tileBase64 = await tile.getBase64Async(Jimp.MIME_JPEG);

//   //     tiles.push(tileBase64);
//   //   }
//   // }

//   const tile = await image.crop(0, 0, 109, 109).getBase64Async(Jimp.MIME_JPEG);

//   fs.writeFile('report.html', `
//     <html>
//       <body>
//         <img src="${result}" />
//         <img src="${quadrilateralResult}" />
//         <img src="${tile}" />
//       </body>
//     </html>`,
//     error => {
//       error && console.log(error);
//     }
//   );
// })();
