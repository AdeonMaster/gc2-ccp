import Canvas from 'canvas';

const { createImageData } = Canvas;

// swap BGRA to RGBA - robotjs fix
export const swapBufferChannels = buffer => {
  for (let i = 0, len = buffer.length; i < len; i+=4) {
     const r = i + 2;
     const b = i + 0;
     [buffer[b], buffer[r]] = [buffer[r], buffer[b]];
  }

  return buffer;
}

// robotjs bitmap to canvas imageData
export const bitmapToImageData = ({ image, width, height }) => createImageData(new Uint8ClampedArray(image), width, height);
