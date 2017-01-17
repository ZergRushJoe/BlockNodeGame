/**
 * Created by jkarp on 12/22/2016.
 */
const ROWS = 30;
const COLS = 12;
const HEIGHT = 25;
const WIDTH = 25;

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
				if(this.indexs[0] < COLS||this.indexs[0]> Math.floor(ROWS*COLS)+COLS)
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
        var picked = Math.floor(Math.random() * 7);
        this.start = (this.start == 0) ? (Math.floor(ROWS*COLS)/2):0;
		this.indexs = [];
		let center = Math.floor(COLS/2) + this.start;
        switch(picked)
		{
			case 0:
				this.color = "#ff0000";
				this.indexs[0] = center;
				this.indexs[1] = center+1;
				break;
			case 1:
				   this.color = "#00ff00";
				   this.indexs[0] = center;
				   this.indexs[1] = center+COLS;
				   this.indexs[2] = center+COLS+1;
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
				this.indexs[1] = center+COLS;
				this.indexs[2] = center+COLS*2;

				break;
			case 4:

                this.indexs[0] = center;
                this.indexs[1] = center+COLS;
                if(Math.floor(Math.random()*2) == 1)
				{
					this.color = "#ffff00";
					this.indexs[2] = center+COLS*2+1;
				}
				else
				{
					this.color = "#ff9900";
					this.indexs[2] = center+COLS*2-1;
				}
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
				this.color = "#0099ff";
                this.indexs[0] = center;
                this.indexs[1] = center+1;
                this.indexs[2] = center+COLS;
                this.indexs[3] = center+COLS*2;
                this.indexs[4] = center+COLS*2+1;
				break;
		}

		this.show();
    }
}