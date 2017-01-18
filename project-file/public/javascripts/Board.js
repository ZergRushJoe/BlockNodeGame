/**
 * Created by jkarp on 12/20/2016.
 */




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


