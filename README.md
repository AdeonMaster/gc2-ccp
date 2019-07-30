# Description
Computer Vision - AI powered computer-controlled player for a Greedy Cave 2 mobile game

# Simple algorithm steps
- Run game using BlueStacks emulator (https://www.bluestacks.com)
- Get image from viewport of BlueStacks window
- Apply "arbitrary 2D quadrilateral" map on captured image to transform isometric view into pure 2D
- Split captured image into cells and construct grid
- Cell visual classification with neural network
- Cell "smart" classification based on position & map tiles (there could be golden chest & loot jug mimics)
- Build/update player "local world" state
- Perform "move" on a "chess deck"

# Useful links
- http://sudokugrab.blogspot.com/2009/07/how-does-it-all-work.html
- https://observablehq.com/@shaunlebron/texture-drawing-for-html-canvas

# Possible cell classes
- wall
- pathway
- pressure plate (3 plates used to unlock a arena door)
- door (next level entrance)
- secret door (secret room entrance)
- arena door (arena entrance)
- golden chest
- simple chest
- bones
- loot jug
- rune
- trap
- fog
- enemy