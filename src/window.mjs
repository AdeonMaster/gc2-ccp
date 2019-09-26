import User32 from './@adeon/ffi-win32-def/user32';
import WINDOWINFO from './@adeon/ffi-win32-def/user32/structures/windowinfo';
import WINDOWPLACEMENT from './@adeon/ffi-win32-def/user32/structures/windowplacement';

export default class Window {
  constructor(hwnd) {
    this.hwnd = hwnd;
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
    const hwnd = User32.FindWindowA(null, title);

    return new Window(hwnd);
  }

  static getForeground() {
    const hwnd = User32.GetForegroundWindow();

    return new Window(hwnd);
  }
}
