import robotjs from 'robotjs';

import WindowViewportImage from './window-viewport-image';
import { swapBufferChannels } from './utils';

export default class WindowViewport {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  capture() {
    const bitmap = robotjs.screen.capture(this.x, this.y, this.width, this.height);

    return new WindowViewportImage({
      ...bitmap,
      image: swapBufferChannels(bitmap.image)
    });
  }
}
