/**
 * Created by jkarp on 12/16/2016.
 */

let stage = document.getElementById('stage');
let temp;

stage.style.width = (COLS*WIDTH) + "px";
stage.style.height = ROWS*HEIGHT + "px";

for(let i = 0; i <ROWS*COLS;i++)
{
    temp = document.createElement('div');
    temp.className = "block";
    temp.innerText = i;
    stage.appendChild(temp);
}

var gameBoard = new Board();
let swappers = [];
swappers[0] = new Swapper(gameBoard,ROWS*COLS-COLS*4,ROWS*COLS -COLS ,10000);
swappers[1] = new Swapper(gameBoard,ROWS*COLS-COLS*5,ROWS*COLS -COLS*2 ,15000);
let swappingHap= false;

let lastTime = 0;
gameBoard.reset();
gameBoard.hideDebug();
function renderer(time)
{

    if(time-lastTime<17)
    {
        requestAnimationFrame(renderer);
        return;
    }
    requestAnimationFrame(renderer);
    lastTime = time;
    swappingHap = false;
    for(let i = 0; i< swappers.length;i++)
    {
        swappers[i].update(time);
        if(swappers[i].swapping)
        {
            swappingHap = true;
        }
    }

    if(!swappingHap)
    {
		gameBoard.update();
    }



}


requestAnimationFrame(renderer);

//event handlers


document.addEventListener("keypress",keydown);

function keydown(e)
{
    if(swappingHap)
    {
        return;
    }

    if(e.key.toLowerCase() == "w")
    {
        gameBoard.activeShape.rotate();
    }
    if(e.key.toLowerCase() == "a")
    {
        gameBoard.activeShape.moveLeft();
    }
    if(e.key.toLowerCase() == "d")
    {
        gameBoard.activeShape.moveRight();
    }
    if(e.key.toLowerCase() == "s")
    {
        gameBoard.activeShape.moveDown();
    }
}