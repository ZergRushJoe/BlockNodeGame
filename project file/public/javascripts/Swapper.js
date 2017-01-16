/**
 * Created by jkarp on 1/4/2017.
 */

class Swapper
{

	//takes a Board , a row with a lower y and a row with a higher y
	constructor(board,upperRow,lowerRow,timeLength)
	{
		this.board = board;
		this.upperRow = upperRow;
		this.lowerRow = lowerRow;
		this.upperRowHeight = parseInt(this.board.getNode(upperRow).style.top.replace("px",""));
		this.lowerRowHeight = parseInt(this.board.getNode(upperRow).style.top.replace("px",""));
		this.swapping = false;
		//time is in ms
		this.timerLenght = timeLength;
		this.lastSwap = 0;

		this.offsetSpeed =3;

	}

	//takes the index and return the nodes height as an INT
	getNodeHeight(index)
	{
		return parseInt(this.board.getNode(index).style.top.replace("px",""))
	}

	update(time)
	{
		if(time- this.lastSwap> this.timerLenght && !this.swapping)
		{
			this.swapping = true;
			this.swapDom();
		}
		if(this.swapping)
		{
			if(this.canMove())
			{
				this.moveCloser();
			}
			else
			{
				this.lastSwap = time;
				this.swapping = false;
			}
		}
	}
	swapDom()
	{
		let activeIndex;
		for(let i = 0; i < this.board.activeShape.indexs.length;i++)
		{
			activeIndex = this.board.activeShape.indexs[i];
			if((activeIndex >= this.upperRow && activeIndex< this.upperRow +COLS)
			||(activeIndex >= this.lowerRow && activeIndex< this.lowerRow +COLS))
			{
				this.lastSwap = 0;
				this.swapping = false;
				return;
			}
		}
		let temp;
		for(let i = 0;i<COLS;i++)
		{
			this.board.swap( this.board.getNode(this.upperRow+i),this.board.getNode(this.lowerRow+i));
		}
	}
	canMove()
	{
		if(this.board.getNode(this.upperRow).style.top == this.upperRowHeight+"px")
		{
			return false;
		}
		return true;
	}
	moveCloser()
	{
		let offset = this.offsetSpeed;
		if(this.getNodeHeight(this.upperRow)-offset<this.upperRowHeight)
		{
			offset = Math.floor( this.getNodeHeight(this.upperRow)-this.upperRowHeight);
		}
		for(var i = 0 ; i<COLS;i++)
		{
			this.board.getNode(this.upperRow+i).style.top  = (this.getNodeHeight(this.upperRow+i)-offset) +"px";
			this.board.getNode(this.lowerRow+i).style.top  = (this.getNodeHeight(this.lowerRow+i)+offset) +"px";
		}

	}
}