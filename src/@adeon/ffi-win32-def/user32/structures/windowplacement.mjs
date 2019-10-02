import Struct from 'ref-struct';

import RECT from './rect';
import POINT from './point';

export default Struct({
  'length': 'uint',
  'flags': 'uint',
  'showCmd': 'uint',
  'ptMinPosition': POINT,
  'ptMaxPosition': POINT,
  'rcNormalPosition': RECT,
  'rcDevice': RECT
});

/*
  typedef struct tagWINDOWPLACEMENT {
    UINT  length;
    UINT  flags;
    UINT  showCmd;
    POINT ptMinPosition;
    POINT ptMaxPosition;
    RECT  rcNormalPosition;
    RECT  rcDevice;
  } WINDOWPLACEMENT;
*/
