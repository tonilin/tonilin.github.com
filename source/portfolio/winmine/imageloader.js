
function imageloader()
{
	this.bg_img = new Image();
	this.WOW_img = new Image();
	this.die_img = new Image();
	this.smile_img = new Image();
	this.block_img = new Image();
	this.flag_img = new Image();
	this.flagfail_img = new Image();
	this.ques_img = new Image();
	this.bomb_img = new Image();
	this.bombclick_img = new Image();
	this.zero_img = new Image();
	this.one_img = new Image();
	this.two_img = new Image();
	this.three_img = new Image();
	this.four_img = new Image();
	this.five_img = new Image();
	this.six_img = new Image();
	this.seven_img = new Image();
	this.eight_img = new Image();	
	this.digi0_img = new Image();
	this.digi1_img = new Image();
	this.digi2_img = new Image();
	this.digi3_img = new Image();
	this.digi4_img = new Image();		
	this.digi5_img = new Image();
	this.digi6_img = new Image();	
	this.digi7_img = new Image();
	this.digi8_img = new Image();	
	this.digi9_img = new Image();	
	
    this.bg_img.src = "";
    this.WOW_img.src = "";
    this.die_img.src = "";
    this.smile_img.src = "";
	this.block_img.src = "";
	this.flag_img.src = "";
	this.flagfail_img.src = "";
	this.ques_img.src = "";
	this.bomb_img.src = "";
	this.bombclick_img.src = "";
    this.zero_img.src = "";
	this.one_img.src = "";
	this.two_img.src = "";
	this.three_img.src = "";
	this.four_img.src = "";
	this.five_img.src = "";
	this.six_img.src = "";
	this.seven_img.src = "";
	this.eight_img.src = "";
	this.digi0_img.src = "";
	this.digi1_img.src = "";
	this.digi2_img.src = "";
	this.digi3_img.src = "";	
	this.digi4_img.src = "";
	this.digi5_img.src = "";	
	this.digi6_img.src = "";
	this.digi7_img.src = "";
	this.digi8_img.src = "";
	this.digi9_img.src = "";

	
	this.bg_img.src = "./bg.gif";
	this.WOW_img.src = "./wow.gif";
	this.smile_img.src = "smile.gif";
	this.die_img.src = "die.gif";
	this.block_img.src = "./block.gif";
	this.flag_img.src = "./flag.gif";
	this.flagfail_img.src = "./flagfail.gif";
	this.ques_img.src = "./ques.gif";
	this.bomb_img.src = "./bomb.gif";
	this.bombclick_img.src = "./bombclick.gif";
    this.zero_img.src = "./0.gif";
	this.one_img.src = "./1.gif";
	this.two_img.src = "./2.gif";
	this.three_img.src = "./3.gif";
	this.four_img.src = "./4.gif";
	this.five_img.src = "5.gif";
	this.six_img.src = "6.gif";
	this.seven_img.src = "7.gif";
	this.eight_img.src = "8.gif";
	this.digi0_img.src = "digi0.gif";
	this.digi1_img.src = "digi1.gif";
	this.digi2_img.src = "digi2.gif";
	this.digi3_img.src = "digi3.gif";	
	this.digi4_img.src = "digi4.gif";
	this.digi5_img.src = "digi5.gif";	
	this.digi6_img.src = "digi6.gif";
	this.digi7_img.src = "digi7.gif";
	this.digi8_img.src = "digi8.gif";
	this.digi9_img.src = "digi9.gif";
	

	this.getbg=function()
	{
		return this.bg_img;
	}
	this.getWOW=function()
	{
		return this.WOW_img;
	}
	this.getsmile=function()
	{
		return this.smile_img;
	}
	this.getdie=function()
	{
		return this.die_img;
	}
	this.getblock=function()
	{
		return this.block_img;
	}	
	this.getflag=function()
	{
		return this.flag_img;
	}	
	this.getflagfail=function()
	{
		return this.flagfail_img;
	}	
	this.getques=function()
	{
		return this.ques_img;
	}	
	this.getbomb=function()
	{
		return this.bomb_img;
	}	
	this.getbombclick=function()
	{
		return this.bombclick_img;
	}	
	this.getnum=function(num)
	{
		switch (num)
		{
			case 0:
				return this.zero_img;
				break;
			case 1:
				return this.one_img;
				break;
			case 2:
				return this.two_img;
				break;
			case 3:
				return this.three_img;
				break;
			case 4:
				return this.four_img;
				break;
			case 5:
				return this.five_img;
				break;
			case 6:
				return this.six_img;
				break;
			case 7:
				return this.seven_img;
				break;
			case 8:
				return this.eight_img;
				break;
			default:
				alert("error");
		}
	}	
	this.getdigi=function(digi)
	{
		switch (digi)
		{
			case 0:
				return this.digi0_img;
				break;
			case 1:
				return this.digi1_img;
				break;
			case 2:
				return this.digi2_img;
				break;
			case 3:
				return this.digi3_img;
				break;
			case 4:
				return this.digi4_img;
				break;
			case 5:
				return this.digi5_img;
				break;
			case 6:
				return this.digi6_img;
				break;
			case 7:
				return this.digi7_img;
				break;
			case 8:
				return this.digi8_img;
				break;
			case 9:
				return this.digi9_img;
				break;
			default:
				alert("error");
		}
	}		
	
	
}




