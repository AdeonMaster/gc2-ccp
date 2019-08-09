import Window from './window';

setTimeout(() => {
  const window = Window.findByTitle('main.mjs - gc2-ccp - Visual Studio Code');
  const info = window.getInfo();

  const { Top, Right, Bottom, Left } = info.rcWindow;
  const xBorder = info.cxWindowBorders;
  const yBorder = info.cyWindowBorders;
  console.log(info);
  console.log({
    x: Left,
    y: Top
  });

}, 3000);

// import fs from 'fs';
// import Canvas from 'canvas';

// import { drawArbitraryQuadImage } from './@adeon/canvas-arbitrary-quads';
// import Vector2D from './utils/Vector2D';

// const { loadImage, createCanvas } = Canvas;

// const srcPoints = [
//   new Vector2D(429, 125),
//   new Vector2D(590, 205),
//   new Vector2D(430, 289),
//   new Vector2D(270, 204)
// ];

// const dstPoints = [
//   new Vector2D(0, 0),
//   new Vector2D(256, 0),
//   new Vector2D(256, 256),
//   new Vector2D(0, 256)
// ];

// (async () => {
//   const texture = await loadImage('gc2-screenshot.jpg');

//   const canvas = createCanvas(dstPoints[2].x, dstPoints[2].y);
//   const ctx = canvas.getContext('2d');

//   drawArbitraryQuadImage(ctx, texture, srcPoints, dstPoints);

//   const result = canvas.toDataURL();

//   fs.writeFile('report.html', '<html><body><img src="' + result + '" /></body></html>', error => {
//     error && console.log(error);
//   });
// })();
