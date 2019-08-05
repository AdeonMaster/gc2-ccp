import User32, { RECT, POINT, WINDOWPLACEMENT } from './windows/User32';

const HWND = User32.GetForegroundWindow();
// const rect = new RECT();

// User32.GetWindowRect(HWND, rect.ref());
// console.log(rect);

// const styles = User32.GetWindowLongA(HWND, -16);
// console.log(styles);

// User32.SetCursorPos(512, 512);

// const point = new POINT();
// User32.GetCursorPos(point.ref());
// console.log(point);

const windowplacement = new WINDOWPLACEMENT();
windowplacement.length = WINDOWPLACEMENT.size;

// User32.GetWindowPlacement(HWND, windowplacement.ref());
console.log(WINDOWPLACEMENT);