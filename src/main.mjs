import fs from 'fs';
import uuidv4 from 'uuid/v4';
import open from 'open';

import Canvas from './canvas';
import Vector2D from './utils/Vector2D';
import BlueStacksWindow from './bswindow';

const CLASSES = {
  WALL: 'wall',
  PATH: 'path',
  ENEMY: 'enemy'
};

const quadmapPrepareParams = {
  width: 1560,
  height: 776,
  offsetX: 164,
  offsetY: 42
};

const tilesInRow = 8;

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
const tileWidth = quadrilateralMapQuadWidth / tilesInRow;

const quadrilateralMapDstPoints = [
  new Vector2D(0, 0),
  new Vector2D(quadrilateralMapQuadWidth, 0),
  new Vector2D(quadrilateralMapQuadWidth, quadrilateralMapQuadWidth),
  new Vector2D(0, quadrilateralMapQuadWidth)
];

const isCornerTile = (x, y) => {
  const current = new Vector2D(x, y);

  const tiles = [
    new Vector2D(0, 0),
    new Vector2D(1, 0),
    new Vector2D(0, 1),

    new Vector2D(6, 0),
    new Vector2D(7, 0),
    new Vector2D(7, 1),

    new Vector2D(0,6),
    new Vector2D(7,0),
    new Vector2D(7,1),

    new Vector2D(6, 7),
    new Vector2D(7, 7),
    new Vector2D(7, 6)
  ];

  return tiles.some(tile => tile.equals(current));
}

const splitQuadMapIntoTiles = (quadmapCtx, tileCanvas, tileCtx) => {
  const tiles = [];

  for(let col = 0; col < tilesInRow; ++col) {
    const column = [];

    for(let row = 0; row < tilesInRow; ++row) {
      // if (isCornerTile(col, row)) {
      //   tileCtx.fillStyle = 'red';
      //   tileCtx.fillRect(0, 0, tileWidth, tileWidth);
      // } else {
        const tileImageData = quadmapCtx.getImageData(tileWidth * row, tileWidth * col, tileWidth, tileWidth);
        tileCtx.putImageData(tileImageData, 0, 0);
      // }

      column.push(tileCanvas.toDataURL());
    }

    tiles.push(column);
  }

  return tiles;
};

const generateDatasetSnapshots = (viewportCanvas, quadmapCanvas, tiles) => {
  const uuid = uuidv4();
  const dirPath = `snapshots/${uuid}`;

  // const viewportImage = viewportCanvas.toDataURL();
  // const quadmapImage = quadmapCanvas.toDataURL();

  if (!fs.existsSync('snapshots')){
    fs.mkdirSync('snapshots');
  }

  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);

    fs.writeFileSync(
      `${dirPath}/view.html`,
      `<html>
        <head>
          <style>
            .cell {
              border: 1px solid red;
            }
            .select {
              position: absolute;
            }
          </style>
        </head>
        <body>
          ${tiles.map((row, rowIndex) => row.map((col, colIndex) => `<select class="select" data-row-index="${rowIndex}" data-col-index="${colIndex}">${(Object.keys(CLASSES).map(classKey => `<option value="${CLASSES[classKey]}">${CLASSES[classKey]}</option>`)).join(' ')}</select><img class="cell" src="${col}" />`).join('')).join('<br/>')}
          <br />
          <button>Save</button>
        </body>
      </html>`
    );

    open(`${dirPath}/view.html`);
  } else {
    console.log('Error while creating shapshot. UUID in use ?');
  }
};

const viewportCanvas = Canvas.createCanvas(0, 0);
const quadmapPrepareCanvas = Canvas.createCanvas(quadmapPrepareParams.width, quadmapPrepareParams.height);
const quadmapCanvas = Canvas.createCanvas(quadrilateralMapQuadWidth, quadrilateralMapQuadWidth);
const tileCanvas = Canvas.createCanvas(tileWidth, tileWidth);

const viewportCtx = viewportCanvas.getContext('2d');
const quadmapPrepareCtx = quadmapPrepareCanvas.getContext('2d');
const quadmapCtx = quadmapCanvas.getContext('2d');
const tileCtx = tileCanvas.getContext('2d');

(async () => {
  // init bs window
  const bswindow = new BlueStacksWindow();
  bswindow.setForeground();

  // get viewport image data
  const viewport = bswindow.getViewport();
  const viewportImageData = viewport.toImageData();

  // draw viewport image on canvas
  viewportCanvas.width = viewport.width;
  viewportCanvas.height = viewport.height;
  viewportCtx.putImageData(viewportImageData, 0, 0);

  // draw viewport image on quadmap prepare canvas
  quadmapPrepareCtx.drawImage(viewportCanvas, quadmapPrepareParams.offsetX, quadmapPrepareParams.offsetY);

  // apply quadliteral map
  quadmapCtx.drawArbitraryQuadImage(quadmapPrepareCanvas, quadrilateralMapSrcPoints, quadrilateralMapDstPoints);

  // split quadmap grid into tiles
  const tiles = splitQuadMapIntoTiles(quadmapCtx, tileCanvas, tileCtx);

  // generate dataset snapshot
  generateDatasetSnapshots(viewportCanvas, quadmapCanvas, tiles);
})();
