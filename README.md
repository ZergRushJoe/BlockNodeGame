# BlockNodeGame

###Basic game mechanics 
* blocks fall down
* blocks passing through the middle with move to other side of the board
* blocks can only pass through the middle once
* blocks stop if can any part of them can not move down
* when line of blocks are made the line is cleared and everything on that side of the board moves down
* each block can be rotated, moved left,moved down ,and moved right.
* the game is over when blocks reach the top of other side of the game board

###Controls
* ←/a - left arrow/a key will move the current block left
* →/d - right arrow/d key will move the current block right
* ↑/w - up arrow/w key will rotate the block counter clockwize
* ↓/s - down arrow/s key will move the block down

##Instruction to run
1. download project
+ run npm install in the root of the project
+ run node ./bin/www to run server in the root of the folder
+ open web browser and put the localhost + port into the url and hit enter

the game will run automaticly if the node server is running correctly.

###Plans
  a swapper will be add to later versions. This swapper will swap blocks form one side of the game board to the other.
