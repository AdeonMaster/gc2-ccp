import Struct from 'ref-struct';

import RECT from './rect';

export default Struct({
  'cbSize': 'ulong',
  'rcWindow': RECT,
  'rcClient': RECT,
  'dwStyle': 'ulong',
  'dwExStyle': 'ulong',
  'dwWindowStatus': 'ulong',
  'cxWindowBorders': 'uint',
  'cyWindowBorders': 'uint',
  'atomWindowType': 'short',
  'wCreatorVersion': 'ulong'
});

/*
  typedef struct tagWINDOWINFO {
    DWORD cbSize;
    RECT rcWindow;
    RECT rcClient;
    DWORD dwStyle;
    DWORD dwExStyle;
    DWORD dwWindowStatus;
    UINT cxWindowBorders;
    UINT cyWindowBorders;
    ATOM atomWindowType;
    WORD wCreatorVersion;
  } WINDOWINFO,*PWINDOWINFO,*LPWINDOWINFO;
*/
