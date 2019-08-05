import ffi from 'ffi';
import ref from 'ref';
import Struct from 'ref-struct';

export const RECT = Struct({
  'Left': 'int',
  'Top': 'int',
  'Right': 'int',
  'Bottom': 'int'
});
const RECT_Ptr = ref.refType(RECT);

const User32 = ffi.Library('User32', {
  'GetForegroundWindow': [ 'int', [] ],
  'GetWindowRect': [ 'int', [ 'int', RECT_Ptr ]],
  'SetForegroundWindow': [ 'int', ['int'] ], 
  'GetWindowLongA': [ 'int', ['int', 'int']], // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlonga
  'SetCursorPos': ['int', ['int', 'int']]
});

export default User32;
