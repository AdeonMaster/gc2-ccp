import ffi from 'ffi';

export default ffi.Library('user32.dll', {
  // window
  'FindWindowA': [ 'pointer', [ 'CString', 'CString' ] ],
  'GetForegroundWindow': [ 'pointer', [] ],
  'GetWindowInfo': [ 'bool', [ 'pointer', 'pointer' ] ],
  'GetWindowPlacement': [ 'bool', [ 'pointer', 'pointer' ] ],
  'GetWindowTextA': [ 'int', [ 'pointer', 'string', 'int' ] ],
  'SetForegroundWindow': [ 'bool', [ 'pointer' ] ],

  // cursor
  'SetCursorPos': [ 'bool', [ 'int', 'int' ] ],
  'GetCursorPos': [ 'bool', [ 'pointer' ] ]
});
