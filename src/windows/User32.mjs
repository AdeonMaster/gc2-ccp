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

export const POINT = Struct({
  'x': 'int',
  'y': 'int'
});
const POINT_Ptr = ref.refType(POINT);

export const WINDOWPLACEMENT = Struct({
  'length': 'int', 
  'flags': 'int',  
  'showCmd': 'int', 
  'ptMinPosition': POINT_Ptr,
  'ptMaxPosition': POINT_Ptr,
  'rcNormalPosition': RECT_Ptr,
  'rcDevice': RECT_Ptr
});
const WINDOWPLACEMENT_Ptr = ref.refType(WINDOWPLACEMENT);

export default ffi.Library('User32', {
  'SetForegroundWindow': [ 'int', ['int'] ], 
  'GetForegroundWindow': [ 'int', [] ],
  'GetWindowRect': [ 'int', [ 'int', RECT_Ptr ]],
  'GetWindowLongA': [ 'int', ['int', 'int']],
  'GetWindowPlacement': ['int', [ 'int', WINDOWPLACEMENT_Ptr ]],

  'SetCursorPos': ['int', ['int', 'int']],
  'GetCursorPos': ['int', [ POINT_Ptr ]]
});
