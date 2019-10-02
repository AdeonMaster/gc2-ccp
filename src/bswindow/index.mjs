import Win32Window from '../@adeon/win32-window';

import { BSWINDOW } from './constants';
import BlueStacksWindowViewport from './bswindow-viewport';

export default class BluestacksWindow {
  constructor() {
    const hwnd = Win32Window.findByTitle('BlueStacks');

    if (!hwnd) {
      throw new Error('Can\'t find BlueStacks window');
    }

    this.window = new Win32Window(hwnd);
  }

  setForeground() {
    this.window.setForeground();
  }

  getPosition() {
    const info = this.window.getInfo();
    const { rcWindow } = info;
    const { Left, Top, Right, Bottom } = rcWindow;

    const x = Left;
    const y = Top;
    const width = Right - Left;
    const height = Bottom - Top;

    return {
      x, y, width, height
    };
  }

  getViewport() {
    const info = this.window.getInfo();
    const { rcWindow } = info;
    let { Left, Top, Right, Bottom } = rcWindow;

    Left += (BSWINDOW.BORDER + BSWINDOW.INNER_PADDING);
    Top += (BSWINDOW.BORDER + BSWINDOW.HEADER + BSWINDOW.INNER_PADDING);
    Right -= (BSWINDOW.BORDER + BSWINDOW.INNER_PADDING);
    Bottom -= (BSWINDOW.BORDER + BSWINDOW.HEADER + BSWINDOW.INNER_PADDING);

    const x = Left;
    const y = Top;
    const width = Right - Left;
    const height = Bottom - Top;

    return new BlueStacksWindowViewport(x, y, width, height);
  }
};
