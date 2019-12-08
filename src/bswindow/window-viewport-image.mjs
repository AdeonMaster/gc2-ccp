import { bitmapToImageData, bitmapToJimpImage } from './utils';

export default class BlueStacksWindowViewportImage {
  constructor(params) {
    this.image = params.image;
    this.width = params.width;
    this.height = params.height;
  }

  // robotjs bitmap to canvas imageData
  toImageData() {
    return bitmapToImageData(this);
  }

  // robotjs bitmap to jimp image
  toJimpImage() {
    return bitmapToJimpImage(this);
  }
}
