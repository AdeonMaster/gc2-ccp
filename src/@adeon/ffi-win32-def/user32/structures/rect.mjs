import Struct from 'ref-struct';

export default Struct({
  'Left': 'long',
  'Top': 'long',
  'Right': 'long',
  'Bottom': 'long'
});

/*
  typedef struct tagRECT {
    LONG left;
    LONG top;
    LONG right;
    LONG bottom;
  } RECT,*PRECT,*NPRECT,*LPRECT;
*/