function state()
{
	this.answer = new Array(30);           //炸彈位置陣列
	for(var i=0;i<30;i++)
		this.answer[i] = new Array(16);
	
	this.clicked = new Array(30);         //已按過位置陣列
	for(var i=0;i<30;i++)
		this.clicked[i] = new Array(16);
	
	var GGornot;                        //已經結束否
	var WOWornot; 						//笑臉出現與否
    var second; 						//計算時間
	var start;							//判斷開始與否
	var timer;
	var timeintervel;
	
	this.Initialize=function()
	{

		for(var i=0;i<30;i++)
			for(var j=0;j<16;j++)
				this.clicked[i][j]='0';

		for(var i=0;i<30;i++)
			for(var j=0;j<16;j++)
				this.answer[i][j]='0';

		this.GGornot=0;
		this.WOWornot=0;
		this.second=0;
		this.start=0;
		this.timer=0;
		
		var counter=0;
		while(counter<99)                //產生99個地雷
		{
			var ranX,ranY;
			ranX = Math.random()
			ranX = Math.round(ranX*29)   //產生0~29之間的隨機數
			ranY = Math.random()
			ranY = Math.round(ranY*15)   //產生0~15之間的隨機數
			
			if(this.answer[ranX][ranY]!='x')
			{
				this.answer[ranX][ranY]='x';  //將隨機數填入格子內
				counter++;
			}
		}
	}
	
	
	this.clicktriger=function(i,j)
	{
		if(this.clicked[i][j]==1)
			return 0;						//已經按過
		else if(this.clicked[i][j]=='f')
			return 0;
		else if(this.clicked[i][j]=='q')
			return 0;
        else if(this.answer[i][j]=='x') 		//按到炸彈
		{
			this.clicked[i][j]='x';
			this.GGornot=1;
			clearInterval(this.timeintervel);		//停止計時
			return 1;
		}else if(this.bombcounter(i,j)==0)    //按到空白
		{
			if(this.zeroclicker(i,j))
			return 1;
		}			
		else if(this.clicked[i][j]==0)			//沒按過
		{
			this.clicked[i][j]=1;
			return 1;
		}

	}

	this.flagtriger=function(i,j)
	{
		if(this.clicked[i][j]=='f')			//已經標過
		{
			this.clicked[i][j]='q';
			return 1;
		}else if(this.clicked[i][j]=='q')
		{
			this.clicked[i][j]='0';
			return 1;
		}
		else if(this.clicked[i][j]==1)     //已經按過
			return 0;
		else if(this.clicked[i][j]==0)     //沒按過
		{
			this.clicked[i][j]='f';
			return 1;
		}
	}
	
	
	
	this.zeroclicker=function(x,y)
	{
		if(this.bombcounter(x,y)==0)
		{
			this.clicked[x][y]=1;
			
			//把空白周圍的數字點出來
			for(var i=-1;i<=1;i++)
				for(var j=-1;j<=1;j++)
				{
					var newx=x+i;
					var newy=y+j;
					if(newx >= 0 && newy >= 0 && newx<30 && newy<16 && this.bombcounter(newx,newy)!=0)
						this.clicked[newx][newy]=1;
				}
				
			
			//把空白附近(上下左右)的空白按光光
			if(x-1>=0 && this.bombcounter(x-1,y)==0 && this.clicked[x-1][y]!=1)
				this.zeroclicker(x-1,y);
			if(y-1>=0 && this.bombcounter(x,y-1)==0 && this.clicked[x][y-1]!=1)
				this.zeroclicker(x,y-1);
			if(x+1<30 && this.bombcounter(x+1,y)==0 && this.clicked[x+1][y]!=1)
				this.zeroclicker(x+1,y);
			if(y+1<16 && this.bombcounter(x,y+1)==0 && this.clicked[x][y+1]!=1)
				this.zeroclicker(x,y+1);		
			return 1;
		}

	}
	
	
		
	//判斷數字旁邊的炸彈數
	this.bombcounter=function(x,y)
	{
		var counter=0;
		
		for(var i=-1;i<=1;i++)
			for(var j=-1;j<=1;j++)
			{
				var newx=x+i;
				var newy=y+j;
				if(newx >= 0 && newy >= 0 && newx<30 && newy<16 && this.answer[newx][newy]=='x')
					counter++;
			}
			
		return counter;
	}
	
	//計算剩餘炸彈數
	this.unflagcounter=function()
	{
		var counter=0;
		
		for(var i=0;i<30;i++)
			for(var j=0;j<16;j++)
			{
				if(this.clicked[i][j]=='f')
					counter++;
			}
			
		if(99-counter>=0)
			return 99-counter;
		else
			return 0;
	}
	
	this.winornot = function()    //增加時間
	{
		for(var i=0;i<30;i++)
			for(var j=0;j<16;j++)
			{
				if(this.clicked[i][j]=='0')
					return false;
			}
		return true;
	}
	
	
}