/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {"rows":36,"cols":20,"height":20,"width":20}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jkarp on 12/16/2016.
 */
const gameConfig = __webpack_require__(0);
const ROWS = gameConfig.rows;
const COLS = gameConfig.cols;
const HEIGHT = gameConfig.height;
const WIDTH = gameConfig.width;
const Board = __webpack_require__(2);
const stage = document.getElementById('stage');

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

const gameBoard = new Board();
// let swappers = [];
// swappers[0] = new Swapper(gameBoard,ROWS*COLS-COLS*4,ROWS*COLS -COLS ,10000);
// swappers[1] = new Swapper(gameBoard,ROWS*COLS-COLS*5,ROWS*COLS -COLS*2 ,15000);
// let swappingHap= false;

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
    // swappingHap = false;
    // for(let i = 0; i< swappers.length;i++)
    // {
    //     swappers[i].update(time);
    //     if(swappers[i].swapping)
    //     {
    //         swappingHap = true;
    //     }
    // }
	//
    // if(!swappingHap)
    // {
		gameBoard.update();
    // }



}


requestAnimationFrame(renderer);

//event handlers


document.addEventListener("keydown",keydown);

function keydown(e)
{

    // if(swappingHap)
    // {
    //     return;
    // }
    const key = e.key.toLowerCase();
    if(key == "w" || key == "arrowup")
    {
        gameBoard.activeShape.rotate();
    }
    if(e.key.toLowerCase() == "a"||key == "arrowleft")
    {
        gameBoard.activeShape.moveLeft();
    }
    if(e.key.toLowerCase() == "d"||key == "arrowright")
    {
        gameBoard.activeShape.moveRight();
    }
    if(e.key.toLowerCase() == "s"||key == "arrowdown")
    {
        gameBoard.activeShape.moveDown(gameBoard.stopRow);
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jkarp on 12/20/2016.
 */
const Shape = __webpack_require__(3);
const gameConfig = __webpack_require__(0);
const ROWS = gameConfig.rows;
const COLS = gameConfig.cols;
const HEIGHT = gameConfig.height;
const WIDTH = gameConfig.width;


class Board
{
	constructor()
	{
		this.blocks = document.getElementsByClassName('block');
		this.swapping = false;
		this.updates = 0;
		this.speed = 10;
		this.primed = false;
		this.gameover = false;
		this.activeShape = new Shape(0,this);
		this.activeShape.pickConfig();

		this.stopRow = ROWS*COLS;
		this.score = 0;
		this.linePoints = 100;
		this.linesCleared = 0;

        let temp;
		for(let i = 0; i<this.blocks.length;i++)
		{
			temp = this.blocks.item(i);
			temp.style.width = WIDTH + "px";
			temp.style.height = HEIGHT + "px";
			temp.style.top  = getHeight(i) + "px";
			temp.style.left = getLength(i) + "px";
		}

	}
	//swaps only in dom not style
	swap(obj1,obj2)
	{

		let temp = document.createElement('div');

		obj1.parentNode.insertBefore(temp,obj1);
		obj2.parentNode.insertBefore(obj1,obj2);
		temp.parentNode.insertBefore(obj2,temp);

		temp.parentNode.removeChild(temp);
	}


	update()
	{


		this.speed =  10-Math.floor(this.linesCleared/10);
		if(this.updates == this.speed)
		{
			this.updates = 0;
            if(!(this.activeShape.moveDown(this.stopRow)))
            {
            	if(this.primed)
				{
					if(this.gameover)
					{
						this.gameover = false;
						this.reset();
					}
					this.primed = false;
                    this.clearLine();
                    this.stopRow = (this.stopRow == ROWS*COLS) ? Math.floor(ROWS*COLS)/2 :ROWS*COLS ;
					this.activeShape.pickConfig();
				}else
				{
					this.primed = true;
				}

            }
            else
			{
				this.gameover = false;
				this.primed =false;
			}
		}
		this.updates += 1;
		//console.log(this.updates);
	}
	getNode(index)
	{
		return this.blocks.item(index);
	}


	pickNew()
	{
		this.activeShape.pickConfig();
	}
	reset()
	{
		let temp;
		for(let i = 0; i< this.blocks.length;i++)
		{
			temp = this.blocks.item(i);
			temp.style.backgroundColor = "black";
			temp.className = "block";
		}
		this.score = 0;
		this.linesCleared = 0;

		this.updateScore();
	}
	showDebug()
	{
		for(let i = 0; i< this.blocks.length;i++)
		{
			this.blocks.item(i).style.color = "white";
		}
	}
	hideDebug()
	{
		for(let i = 0; i< this.blocks.length;i++)
		{
			this.blocks.item(i).style.color = "rgba(0,0,0,0)";
		}
	}
	clearLine()
	{

		let clear = false;
		for(let i = ROWS-1;i>=0;i--)
		{
			clear = true;
			for(let j = 0;j < COLS;j++)
			{
				if(this.getNode(this.activeShape.rowColToIndex(i,j)).style.backgroundColor == "black")
				{
					clear = false;
					break;
				}
			}
			if(clear)
			{
				this.shiftDown(i);
				++i;
			}
		}
	}

	updateScore()
	{
		document.getElementById("score").innerText = this.score;
	}

	shiftDown(row)
	{
		this.score += this.linePoints;
		this.linesCleared++;
		this.updateScore();
		let end =  (row > Math.floor(ROWS/2)) ?  Math.floor(ROWS/2)+1:0;
		for(let i = row;i>end;i--)
		{
			let replace,by;
			for(let j = 0; j< COLS;j++)
			{
				replace = this.getNode(this.activeShape.rowColToIndex(i,j));
				by = this.getNode(this.activeShape.rowColToIndex(i-1,j));
            	replace.style.backgroundColor = by.style.backgroundColor;
            	replace.className = by.className;
			}
		}
	}

}

//utilities for game board

function getHeight(index)
{
	if(index < (Math.floor(ROWS/2))*COLS)
		return Math.floor(index/COLS)*HEIGHT;
	return ROWS*HEIGHT -(Math.floor(index/COLS)-(Math.floor(ROWS/2)-1))*HEIGHT;
}
function getLength(index)
{
	return (index%COLS)*WIDTH ;
}

module.exports = Board;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jkarp on 12/22/2016.
 */
const gameConfig = __webpack_require__(0);
const ROWS = gameConfig.rows;
const COLS = gameConfig.cols;
const HEIGHT = gameConfig.height;
const WIDTH = gameConfig.width;

class Shape
{
	constructor(startIndex,activeBoard)
	{
		this.center = startIndex;
		this.indexs = new Array(4);
		this.activeBoard = activeBoard;
		this.color = "black";
		this.timeStamp = 0;
		this.speed = 200;
		this.primed = true;
		this.change = true;
		this.start =1;
	}
	update(time)
	{
		if(time-this.timeStamp<this.speed){return;}
		this.timeStamp = time;
	}
	hide()
	{
		let temp;
		for(let i = 0; i<this.indexs.length;i++)
		{
			temp = this.activeBoard.blocks.item(this.indexs[i]);
			temp.style.backgroundColor = "black";
			temp.className = "block";
		}
	}
	show()
	{
		let temp;
		for(let i = 0; i<this.indexs.length;i++)
		{
			temp = this.activeBoard.blocks.item(this.indexs[i]);
			temp.style.backgroundColor = this.color;
			temp.className = "block filled";
		}
	}

	moveDown(stopRow)
	{
		let newArray = [];
		let temp;
		let passed;

        this.hide();
		for(let i=0;i<this.indexs.length;i++)
		{
			temp = this.downIndex(this.indexs[i]);
			if((temp > stopRow-1 && temp< stopRow+COLS )||
				(this.activeBoard.getNode(temp)&&
					!(this.activeBoard.getNode(temp).style.backgroundColor == "black")))
			{
				if(this.indexs[0] ==Math.floor( COLS/2)||this.indexs[0]== Math.floor(ROWS*COLS/2)+Math.floor( COLS/2))
				{
					this.activeBoard.gameover = true;
				}
                this.show();
				return false;
			}
			newArray[i] = temp%(ROWS*COLS);
		}

		this.indexs = newArray;
		this.show();
		return true;
	}
	moveRight()
	{
		let temp = 0;
		let newArray = [];
		this.hide();
		for(let i =0;i< this.indexs.length;i++ )
		{
			temp = this.getCol(this.indexs[i])+1;
			if(temp ==COLS || this.activeBoard.getNode(this.indexs[i]+1).style.backgroundColor != "black")
			{
				this.show();
				return;
			}
			newArray[i] = this.indexs[i]+1;

		}
		this.indexs = newArray;
        this.show();

    }
    moveLeft()
	{
        let temp = 0;
        let newArray = [];
        this.hide();
        for(let i =0;i< this.indexs.length;i++ )
        {
            temp = this.getCol(this.indexs[i])-1;
            if(temp <0 || this.activeBoard.getNode(this.indexs[i]-1).style.backgroundColor != "black")
            {
                this.show();
                return;
            }
            newArray[i] = this.indexs[i]-1;

        }
        this.indexs = newArray;
        this.show();
	}
	downIndex(index)
	{
		let row = this.getRow(index);
		let col = this.getCol(index);

		return this.rowColToIndex(row+1,col);
	}
	rotate(right)
	{
		this.hide();

		this.center = this.indexs[Math.floor(this.indexs.length/2)];
		let newArray = [];
		let change = true;
		let cy = this.getRow(this.center);
		let cx = this.getCol(this.center);

		let blocked = true;
		let x,y,nx,ny;
		let offset = 0;

		let offsetCount = 0;
		let offsetNeeded = false;
		//debugger;
        for(let i = 0 ; i<this.indexs.length;i++)
        {
            x = this.getCol(this.indexs[i]) -cx;
            y = this.getRow(this.indexs[i]) -cy;

            if(!right)
            {
                nx = y+cx;
                ny = (x*-1)+cy;
            }
            else
            {
                nx = (y*-1)+cx;
                ny = x+cy;
            }
            newArray[i] = this.rowColToIndex(ny,nx+offset*offsetCount);
            if(nx >= COLS || nx < 0 )
            {
                for(let j = i;j>= 0;j--)
                {
                    if(nx >= COLS)
                    {
                        newArray[j]--;
						offset = -1;

                    }
                    else
                    {
                        newArray[j]++;
                        offset = 1;
                    }
                }
                offsetCount++;
            }

        }
		while(blocked)
		{
            blocked = false;
			for(let i = 0;i<newArray.length;i++)
			{
				if(this.activeBoard.getNode(newArray[i]).style.backgroundColor != "black" || newArray[i]>ROWS*COLS)
				{
					blocked = true;
					break;
				}
			}
			if(!blocked)
			{
				this.indexs = newArray;
				break;
			}
			else
			{
				for(let i = 0;i<newArray.length;i++)
				{
					newArray[i] = this.upIndex(newArray[i]);
				}
			}
		}
		this.show();
	}
	rowColToIndex(row,col)
	{
		return (row*COLS + col);
	}
	getRow(index)
	{
		return Math.floor(index/COLS);
	}
	getCol(index)
	{
		return index%COLS;
	}
	upIndex(current)
	{

		var x = this.getRow(current);
		var y = this.getCol(current);

		return this.rowColToIndex(x-1,y);
	}
	pickConfig()
	{
        var picked = Math.floor(Math.random() * 11);
        this.start = (this.start == 0) ? (Math.floor(ROWS*COLS)/2):0;
		this.indexs = [];
		let center = Math.floor(COLS/2) + this.start;
        switch(picked)
		{
			case 0:
				this.color = "#ff0000";
				this.indexs[0] = center;
				this.indexs[1] = center+COLS;
				this.indexs[2] = center+COLS*2;
				this.indexs[3] = center+COLS*2+1;
				this.indexs[4] = center+COLS*2+2;
				break;
			case 1:
				this.color = "#00ff00";
				this.indexs[0] = center;
				this.indexs[1] = center+COLS;
				this.indexs[2] = center+COLS*2;
				this.indexs[3] = center+COLS*2-1;
				this.indexs[4] = center+COLS*2+1;
				break;
			case 2:
                this.color = "#0000ff";
				this.indexs[0] = center;
				this.indexs[1] = center+COLS-1;
				this.indexs[2] = center+COLS;
				this.indexs[3] = center+COLS+1;
                this.indexs[4] = center+COLS+2;
				break;
			case 3:
                this.color = "#ff00ff";
                this.indexs[0] = center;
                this.indexs[1] = center+COLS-2;
                this.indexs[2] = center+COLS-1;
                this.indexs[3] = center+COLS;
                this.indexs[4] = center+COLS+1;

				break;
			case 4:
                this.color = "#ffb700";
                this.indexs[0] = center;
                this.indexs[1] = center+COLS;
              	this.indexs[2] = center+COLS*2;
                this.indexs[3] = center+COLS*3;
                this.indexs[4] = center+COLS*4;
				break;
			case 5:
                this.color = "#9900ff";
                this.indexs[0] = center-1;
                this.indexs[1] = center;
                this.indexs[2] = center+COLS+1;
                this.indexs[3] = center+COLS+2;
                this.indexs[4] = center+COLS;
				break;
			case 6:
				this.color = "#ecff00";
                this.indexs[0] = center;
                this.indexs[1] = center+1;
                this.indexs[2] = center+COLS;
                this.indexs[3] = center+COLS*2;
                this.indexs[4] = center+COLS*2+1;
				break;
            case 7:
                this.color = "#ff0074";
                this.indexs[0] = center;
                this.indexs[1] = center+COLS+1;
                this.indexs[2] = center+COLS;
                this.indexs[3] = center+COLS*2;
                this.indexs[4] = center+COLS*2+1;
                break;
            case 8:
                this.color = "#00ff76";
                this.indexs[0] = center;
                this.indexs[1] = center+COLS+1;
                this.indexs[2] = center+COLS;
                this.indexs[3] = center+COLS*2;
                this.indexs[4] = center+COLS*2+1;
                break;
            case 9:
                this.color = "#0089ff";
                this.indexs[0] = center;
                this.indexs[1] = center+1;
                this.indexs[2] = center+COLS+1;
                this.indexs[3] = center+COLS*2+1;
                this.indexs[4] = center+COLS*2+2;
                break;
            case 10:
                this.color = "#9900ff";
                this.indexs[0] = center-1;
                this.indexs[1] = center;
                this.indexs[2] = center+1;
                this.indexs[3] = center+COLS+1;
                this.indexs[4] = center+COLS+2;
                break;
		}

		this.show();
    }
}

module.exports = Shape;

/***/ })
/******/ ]);