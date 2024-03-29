import robotjs from 'robotjs';

import { swapBufferChannels, bitmapToImageData } from '../utils/image';

export default class BlueStacksWindowViewport {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  capture() {
    const bitmap = robotjs.screen.capture(this.x, this.y, this.width, this.height);

    return {
      ...bitmap,
      image: swapBufferChannels(bitmap.image)
    };
  }

  toImageData() {
    return bitmapToImageData(this.capture());
  }
}
