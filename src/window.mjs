import ref from 'ref';

import User32 from './@adeon/ffi-win32-def/user32';
import WINDOWINFO from './@adeon/ffi-win32-def/user32/structures/windowinfo';
import WINDOWPLACEMENT from './@adeon/ffi-win32-def/user32/structures/windowplacement';

const transformRect = rect => {
  const { Left, Top, Right, Bottom } = rect;

  const x = Left;
  const y = Top;
  const width = Right - Left;
  const height = Bottom - Top;

  return {
    x, y, width, height
  };
};

export default class Window {
  constructor(hwnd) {
    this.hwnd = hwnd;
  }

  getText(size = 128) {
    let buffer = Buffer.alloc(size);

    return User32.GetWindowTextA(this.hwnd, buffer, size)
      ? ref.readCString(buffer)
      : '';
  }

  getInfo() {
    const windowinfo = new WINDOWINFO({
      length: WINDOWINFO.size
    });
  
    User32.GetWindowInfo(this.hwnd, windowinfo.ref());

    return windowinfo;
  }

  getPlacement() {
    const windowplacement = new WINDOWPLACEMENT({
      length: WINDOWPLACEMENT.size
    });
  
    User32.GetWindowPlacement(this.hwnd, windowplacement.ref());

    return windowplacement;
  }

  setForeground() {
    return User32.SetForegroundWindow(this.hwnd);
  }

  // custom functions
  getShownState() {
    const windowPlacement = this.getPlacement();

    return windowPlacement.showCmd;
  }

  getPosition() {
    const info = this.getInfo();

    const { rcWindow } = info;

    return transformRect(rcWindow);
  }

  getViewportPosition() {
    const info = this.getInfo();

    const { rcClient } = info;

    return transformRect(rcClient);
  }

  // static functions
  static findByTitle(title) {
    const hwnd = User32.FindWindowA(null, title);

    return new Window(hwnd);
  }

  static getForeground() {
    const hwnd = User32.GetForegroundWindow();

    return new Window(hwnd);
  }
}
