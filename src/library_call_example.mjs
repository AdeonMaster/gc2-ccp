import User32, { RECT } from './windows/User32';

const HWND = User32.GetForegroundWindow();
const rect = new RECT();

User32.GetWindowRect(HWND, rect.ref());
console.log(rect);
