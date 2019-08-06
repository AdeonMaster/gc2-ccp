import User32 from './@adeon/ffi-win32-def/user32';
import WINDOWINFO from './@adeon/ffi-win32-def/user32/structures/windowinfo';

export const findWindowByTitle = title => User32.FindWindowA(null, title);

export const getWindowInfo = hwnd => {
  const windowinfo = new WINDOWINFO({
    length: WINDOWINFO.size
  });

  User32.GetWindowInfo(hwnd, windowinfo.ref());

  return windowinfo;
};
