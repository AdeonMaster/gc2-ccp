import { findWindowByTitle, getWindowInfo } from './window';

setTimeout(() => {
  const hwnd = findWindowByTitle('Untitled - Notepad');
  const windowInfo = getWindowInfo(hwnd);

  console.log(windowInfo);
}, 3000);
