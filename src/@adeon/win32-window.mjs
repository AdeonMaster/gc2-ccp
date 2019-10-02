import ref from 'ref';

import User32 from './ffi-user32-def';
import { WINDOWINFO, WINDOWPLACEMENT } from './ffi-user32-def/structures';

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

  static findByTitle(title) {
    return User32.FindWindowA(null, title);
  }

  static getForeground() {
    return User32.GetForegroundWindow();
  }
}
