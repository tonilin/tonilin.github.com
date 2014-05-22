
function game()
{
	var _canvas;
    var _canvasContext;
    var _canvasBuffer;
    var _canvasBufferContext;
	var _imageloader;
	var _state;

    this.Initialize = function () {
		_imageloader=new imageloader;					//建立圖片物件
		_state=new state;								//建立狀態物件
        _canvas = document.getElementById('game');		//取得canvas
		_canvasContext = null;
		
		
		_state.Initialize();     //初始化狀態
		
        if (_canvas && _canvas.getContext) {
			_canvasContext = _canvas.getContext('2d');
			_canvasBuffer = document.createElement('canvas');		//建立buffer
			_canvasBuffer.width = _canvas.width;					//取得原canvas長和寬
			_canvasBuffer.height = _canvas.height;
			_canvasBufferContext = _canvasBuffer.getContext('2d');
			return true;
		}
		return false;
    }

	this.run = function(){
		this.play();            //開始遊戲
	}
	
	
	this.play = function()
	{
		this.drawer();
	}
	
	this.drawer=function()
	{
		var block_start_x=9;
		var block_start_y=52;
		_canvasBufferContext.clearRect(0, 0, 497,316);
		_canvasBufferContext.drawImage(_imageloader.getbg(), 0, 0);

	
		if(_state.WOWornot==1)        //mousedown出現笑臉
			_canvasBufferContext.drawImage(_imageloader.getWOW(),236,12);
	

			
		
		//畫出時間
		_canvasBufferContext.drawImage(_imageloader.getdigi(_state.timer%10),469,13);
		_canvasBufferContext.drawImage(_imageloader.getdigi( Math.floor((_state.timer%100)/10 )),456,13);	
		_canvasBufferContext.drawImage(_imageloader.getdigi(Math.floor(_state.timer/100)),443,13);		
		
		//畫出炸彈數
		_canvasBufferContext.drawImage(_imageloader.getdigi(_state.unflagcounter()%10),40,13);
		_canvasBufferContext.drawImage(_imageloader.getdigi( Math.floor((_state.unflagcounter()%100)/10 )),27,13);	
		_canvasBufferContext.drawImage(_imageloader.getdigi(Math.floor(_state.unflagcounter()/100)),14,13);			
		
		if(_state.GGornot==0)          //遊戲沒結束
		{
			for(i=0;i<30;i++)
				for(j=0;j<16;j++)
				{
					if(_state.clicked[i][j]=='1')
					{
						_canvasBufferContext.drawImage(_imageloader.getnum( _state.bombcounter(i,j) ), block_start_x+16*i, block_start_y+16*j);

					}else if(_state.clicked[i][j]=='p')
					{
						_canvasBufferContext.drawImage(_imageloader.getnum(0), block_start_x+16*i, block_start_y+16*j);
						_state.clicked[i][j]='0';
					}
					else if(_state.clicked[i][j]=='f')
					{
						_canvasBufferContext.drawImage(_imageloader.getflag(), block_start_x+16*i, block_start_y+16*j);
					}else if(_state.clicked[i][j]=='q')
					{
						_canvasBufferContext.drawImage(_imageloader.getques(), block_start_x+16*i, block_start_y+16*j);
					}
					else if(_state.clicked[i][j]=='0')
					{
						_canvasBufferContext.drawImage(_imageloader.getblock(), block_start_x+16*i, block_start_y+16*j);
					}
				}
		}
		
		if(_state.winornot() && _state.GGornot!=1)        //勝利
		{
			_canvasBufferContext.drawImage(_imageloader.getsmile(),236,12);
			clearInterval(_state.timeintervel);		//停止計時
		}
		
		if(_state.GGornot==1)  			//遊戲結束
		{


			for(i=0;i<30;i++)
				for(j=0;j<16;j++)
				{
					if(_state.clicked[i][j]=='1')
							_canvasBufferContext.drawImage(_imageloader.getnum( _state.bombcounter(i,j) ), block_start_x+16*i, block_start_y+16*j);
					else if(_state.clicked[i][j]=='x')
							_canvasBufferContext.drawImage(_imageloader.getbombclick(), block_start_x+16*i, block_start_y+16*j);
					else if(_state.clicked[i][j]=='f' &&_state.answer[i][j]!='x')
							_canvasBufferContext.drawImage(_imageloader.getflagfail(), block_start_x+16*i, block_start_y+16*j);	
					else if(_state.clicked[i][j]=='f' &&_state.answer[i][j]=='x')
							_canvasBufferContext.drawImage(_imageloader.getflag(), block_start_x+16*i, block_start_y+16*j);	
					else if(_state.answer[i][j]=='x')
							_canvasBufferContext.drawImage(_imageloader.getbomb(), block_start_x+16*i, block_start_y+16*j);
					else
						_canvasBufferContext.drawImage(_imageloader.getblock(), block_start_x+16*i, block_start_y+16*j);
				}
			_canvasBufferContext.drawImage(_imageloader.getdie(),236,12);  //畫死掉笑臉
		}
			

		
			
		_canvasContext.drawImage(_canvasBuffer, 0, 0);	
			

	}
	


	this.mouseup = function(event,gameoffset)
	{
		if(event.which==1)							//確認是左鍵
		{
			if(_state.start!=1)						//將遊戲設定為啟動
			{
				_state.start=1;
				_state.timeintervel=setInterval("document.winmine.timeadder()",1000);   //開始計時
				
			}
			
			var block_start_x=9;
			var block_start_y=52;
			_state.WOWornot=0;						//取消笑臉
			
			clickX=event.pageX-gameoffset.left;     //判斷點到物件的座標
			clickY=event.pageY-gameoffset.top;

			
			if(clickX>=block_start_x && clickY>=block_start_y && _state.GGornot==0)    //按在方塊上
			{
				tempX=Math.floor( (clickX-block_start_x)/16);
				tempY=Math.floor( (clickY-block_start_y)/16);
				
				if(_state.clicktriger(tempX,tempY))
					this.drawer();
			}
			if(clickX<=261 && clickX >=236 && clickY<=37 && clickY>=13)    //按在笑臉上
			{
				clearInterval(_state.timeintervel);		//停止計時
				delete _state;
				_state=new state;
				_state.Initialize();
				this.drawer();
			}
		}
	}
	
	
	this.mousedown = function(event,gameoffset)
	{
		if(event.which==1)							//確認是左鍵
		{
			var block_start_x=9;
			var block_start_y=52;
			
			clickX=event.pageX-gameoffset.left;     //判斷點到物件的座標
			clickY=event.pageY-gameoffset.top;

			
			if(clickX>=block_start_x && clickY>=block_start_y && _state.GGornot==0)    //按在方塊上
			{
				_state.WOWornot=1;
				tempX=Math.floor( (clickX-block_start_x)/16);
				tempY=Math.floor( (clickY-block_start_y)/16);
				if(_state.clicked[tempX][tempY]==0)
				{
					_state.clicked[tempX][tempY]='p';
					this.drawer();
				}
			}
			if(clickX<=261 && clickX >=236 && clickY<=37 && clickY>=13)    //按在笑臉上
			{
				_state.WOWornot=1;
				this.drawer();
			}
		}
		
	}
	
	this.rightclick = function(event)
	{
		if(event.which==3)							//確認是右鍵
		{
			var block_start_x=9;
			var block_start_y=52;
			
			clickX=event.pageX-gameoffset.left;     //判斷點到物件的座標
			clickY=event.pageY-gameoffset.top;

			
			if(clickX>=block_start_x && clickY>=block_start_y && _state.GGornot==0)    //按在方塊上
			{
				tempX=Math.floor( (clickX-block_start_x)/16);
				tempY=Math.floor( (clickY-block_start_y)/16);
				
				if(_state.flagtriger(tempX,tempY))
					this.drawer();
			}
		}
	}
	
	this.timeadder = function()    //增加時間
	{
		_state.timer++;
		this.drawer();
	}
	

	
	
}


	
	

	


