import ffi from 'ffi';

export default ffi.Library('user32.dll', {
  // window
  'FindWindowA': [ 'pointer', [ 'CString', 'CString' ] ],
  'GetForegroundWindow': [ 'pointer', [] ],
  'GetWindowInfo': [ 'bool', [ 'pointer', 'pointer' ]],

  // cursor
  'SetCursorPos': ['bool', ['int', 'int']],
  'GetCursorPos': ['bool', [ 'pointer' ]]
});
