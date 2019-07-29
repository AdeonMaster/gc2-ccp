# Description
Computer Vision - AI powered computer-controlled player for a Greedy Cave 2 mobile game

# Simple algorithm steps
- Run game using BlueStacks emulator (https://www.bluestacks.com)
- Get image from viewport of BlueStacks window
- Apply "arbitrary 2D quadrilateral" map on captured image to transform isometric grid to pure 2D grid
- Split captured image into cells and conststruct grid
- Traverse grid cells and classify it with neural network
- Build/update player "local world" state
- Perform "move" on a "chess deck"

# Useful links
 - http://sudokugrab.blogspot.com/2009/07/how-does-it-all-work.html
 - https://observablehq.com/@shaunlebron/texture-drawing-for-html-canvas
 