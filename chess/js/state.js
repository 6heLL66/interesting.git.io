var rules = {
	"bP" : function(x,y){
			console.log(this);
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y - 1 == y) || (this.pos.x - 1 == x && this.pos.y - 1 == y))){
				if(y == 1)choose(this);
				this.steps++;
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == (y + 1) || this.pos.y == (y + 2))){
				if(this.pos.y > y){
					for(let i = this.pos.y - 1;i >= y;i--){
						if(findF(this.pos.x,i))return false;
					}
				}
				this.steps++;
				if(y == 1)choose(this);
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y + 1){
				if(findF(this.pos.x,this.pos.y - 1))return false;
				this.steps++;
				if(y == 1)choose(this);
				return true;	
			}
			return false;
	},
	"wP" : function(x,y){
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y + 1 == y) || (this.pos.x - 1 == x && this.pos.y + 1 == y))){
				if(y == 8)choose(this);
				this.steps++;
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == y - 1 || this.pos.y == y - 2)){
				if(this.pos.y < y){
					for(let i = this.pos.y + 1;i <= y;i++){
						if(findF(this.pos.x,i))return false;
					}
				}
				this.steps++;
				if(y == 8)choose(this);
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y - 1){
				if(findF(this.pos.x,this.pos.y + 1))return false;
				this.steps++;
				if(y == 8)choose(this);
				return true;	
			}
			return false;
	},
	"rook" : function (x,y){
				if(x != this.pos.x && y == this.pos.y){
					if(this.pos.x < x){
						for(let i = this.pos.x + 1;i < x;i++){
							if(findF(i,this.pos.y))return false;
						}
					}
					else if(this.pos.x > x){
						for(let i = this.pos.x - 1;i > x;i--){
							if(findF(i,this.pos.y))return false;
						}
					}		
				}
				else if (x == this.pos.x && y != this.pos.y){
					if(this.pos.y < y){
						for(let i = this.pos.y + 1;i < y;i++){
							if(findF(this.pos.x,i))return false;
						}
					}
					else if(this.pos.y > y){
						for(let i = this.pos.y - 1;i > y;i--){
							if(findF(this.pos.x,i))return false;
						}
					}	
				}
				else return false;

				return true;
	},
	"knight" : function (x,y) {
				if((Math.abs(this.pos.x - x) == 1 && Math.abs(this.pos.y - y) == 2) || (Math.abs(this.pos.x - x) == 2 && Math.abs(this.pos.y - y) == 1))return true;
				else return false;
	},
	"bishop" : function (x,y){
				if(Math.abs(this.pos.x - x) == Math.abs(this.pos.y - y)){
					let x1 = this.pos.x;
					let y1 = this.pos.y;
					if(x > x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x > x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					return true;
				}
				else return false;
	},
	"king" : function(x,y){
				if((Math.abs(x - this.pos.x) > 1 || Math.abs(y - this.pos.y) > 1) && this.steps != 0)return false;
				else if (Math.abs(x - this.pos.x) == 1 || Math.abs(y - this.pos.y) == 1) {
					this.steps++;
					return true;
				}
				else if (this.steps == 0){
					if(x == this.pos.x - 2 && findF(1,this.pos.y).figure.name == "rook" && !findF(4,this.pos.y) && !findF(2,this.pos.y)){
						findF(1,this.pos.y).figure.pos.x = 4;
						this.steps++;
						return true;
					}
					else if (x == this.pos.x + 2 && findF(8,this.pos.y).figure.name == "rook" && !findF(6,this.pos.y) ){
						state[findF(8,this.pos.y).index].pos.x = 6;
						this.steps++;
						return true;
					}
					return false;
				} 
				return false;
	},
	"queen" : function (x,y) {
				if(x != this.pos.x && y == this.pos.y){
					if(this.pos.x < x){
						for(let i = this.pos.x + 1;i < x;i++){
							if(findF(i,this.pos.y))return false;
						}
					}
					else if(this.pos.x > x){
						for(let i = this.pos.x - 1;i > x;i--){
							if(findF(i,this.pos.y))return false;
						}
					}
					return true;		
				}
				else if (x == this.pos.x && y != this.pos.y){
					if(this.pos.y < y){
						for(let i = this.pos.y + 1;i < y;i++){
							if(findF(this.pos.x,i))return false;
						}
					}
					else if(this.pos.y > y){
						for(let i = this.pos.y - 1;i > y;i--){
							if(findF(this.pos.x,i))return false;
						}
					}
					return true;	
				}
				else if(Math.abs(this.pos.x - x) == Math.abs(this.pos.y - y)){
					let x1 = this.pos.x;
					let y1 = this.pos.y;
					if(x > x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x > x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					return true;
				} 
				return false;
	}

}
var state = [
	{
		name : "rook",
		pos : {x : 1,y: 1},
		team : 'white',
		img : "wR.png",
		func : rules.rook
	},
	{
		name : "rook",
		pos : {x : 8,y: 1},
		team : 'white',
		img : "wR.png",
		func : rules.rook
	},
	{
		name : "knight",
		pos : {x : 2,y: 1},
		team : 'white',
		img : "wN.png",
		func : rules.knight
	},
	{
		name : "knight",
		pos : {x : 7,y: 1},
		team : 'white',
		img : "wN.png",
		func : rules.knight
	},
	{
		name : "bishop",
		pos : {x : 3,y: 1},
		team : 'white',
		img : "wB.png",
		func : rules.bishop
	},
	{
		name : "bishop",
		pos : {x : 6,y: 1},
		team : 'white',
		img : "wB.png",
		func : rules.bishop
	},
	{
		name : "queen",
		pos : {x : 4,y: 1},
		team : 'white',
		img : "wQ.png",
		func : rules.queen
	},
	{
		name : "king",
		pos : {x : 5,y: 1},
		team : 'white',
		img : "wK.png",
		steps : 0,
		func : rules.king
	},
	{
		name : "pawn",
		pos : {x : 1,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 2,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 3,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 4,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 5,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 6,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 7,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	{
		name : "pawn",
		pos : {x : 8,y: 2},
		team : 'white',
		img : "wP.png",
		steps : 0,
		func : rules.wP
	},
	//black
	{
		name : "rook",
		pos : {x : 1,y: 8},
		team : 'black',
		img : "bR.png",
		func : rules.rook
	},
	{
		name : "rook",
		pos : {x : 8,y: 8},
		team : 'black',
		img : "bR.png",
		func : rules.rook
	},
	{
		name : "knight",
		pos : {x : 2,y: 8},
		team : 'black',
		img : "bN.png",
		func : rules.knight
	},
	{
		name : "knight",
		pos : {x : 7,y: 8},
		team : 'black',
		img : "bN.png",
		func : rules.knight
	},
	{
		name : "bishop",
		pos : {x : 3,y: 8},
		team : 'black',
		img : "bB.png",
		func : rules.bishop
	},
	{
		name : "bishop",
		pos : {x : 6,y: 8},
		team : 'black',
		img : "bB.png",
		func : rules.bishop
	},
	{
		name : "queen",
		pos : {x : 4,y: 8},
		team : 'black',
		img : "bQ.png",
		func : rules.queen
	},
	{
		name : "king",
		pos : {x : 5,y: 8},
		team : 'black',
		img : "bK.png",
		steps : 0,
		func : rules.king
	},
	{
		name : "pawn",
		pos : {x : 1,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 2,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 3,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 4,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 5,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 6,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 7,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	},
	{
		name : "pawn",
		pos : {x : 8,y: 7},
		team : 'black',
		img : "bP.png",
		steps : 0,
		func : rules.bP
	}		
];
function load(){
	var img = document.createElement('img');
	img.setAttribute('src', './images/wR.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/wQ.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/wK.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/wN.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/wP.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/wB.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bR.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bQ.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bK.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bN.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bP.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', './images/bB.png');
	document.body.appendChild(img);
	img.onload = function(){
		draw();
	}
	let images = document.getElementsByTagName('img');
	for(let i = 0;i<images.length;i++){
		images[i].style.display = 'none';
	}
}
load();
function choose(obj){
	let modal = document.createElement('div');
	let style = `
		position: fixed;
	    top: 0;
	    left : 0;
	    width: `+ window.innerWidth +`px;
	    height : 100vh;
	    display : flex;
	    flex-direction : row;
	    align-items : center;
	    justify-content : center;
	    background-color : rgba(0,0,0,0.9);
    `;
    modal.style.cssText = style;
    if(obj.team == 'black'){
    	let queenImg = findImg("bQ.png");
    	queenImg.style.display = "block";
    	let knightImg = findImg("bN.png");
    	knightImg.style.display = "block";
    	let queen = document.createElement('div');
    	let knight = document.createElement('div');
    	
    	queen.onclick = function () {
	    		obj.name = 'queen';
	    		obj.img = "bQ.png";
	    		obj.func = rules.queen;
				modal.remove();
				load();
				draw();
    		}
    		knight.onclick = function (){
    			obj.name = 'knight';
	    		obj.img = "bN.png";
	    		obj.func = rules.knight;
				modal.remove();
				load();
				draw();
    		}
    	queen.append(queenImg);
    	knight.append(knightImg);
    	modal.append(queen);
    	modal.append(knight);
    	document.body.append(modal);


    }
    else {
		let queenImg = findImg("wQ.png");
    	let knightImg = findImg("wN.png");
    	queenImg.style.display = "block";
    	knightImg.style.display = "block";
    	let queen = document.createElement('div');
    	let knight = document.createElement('div');
    	queen.onclick = function () {
	    		obj.name = 'queen';
	    		obj.img = "wQ.png";
	    		obj.func = rules.queen;
				modal.remove();
				load();
				draw();
				
    		}
    		knight.onclick = function (){
    			obj.name = 'knight';
	    		obj.img = "wN.png";
	    		obj.func = rules.knight;
				modal.remove();
				load();
				draw();
				
    		}
    	
    	queen.append(queenImg);
    	knight.append(knightImg);
    	modal.append(queen);
    	modal.append(knight);
    	document.body.append(modal);
    }   
}
function findImg(src){
	let images = document.getElementsByTagName('img');
	for(let i = 0;i < images.length;i++){
		if(images[i].src.substr(images[i].src.length - 6,6) ==  src)return images[i];
	}
	return false;
}




