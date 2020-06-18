var buffer = [];
var rules = {
	"bP" : function(x,y,bool){
			let x1 = this.pos.x;
			let y1 = this.pos.y;
			if(findF(x,y)){
				buffer.push(findF(x,y).figure);
				state.splice(findF(x,y).index,1);
			}
			this.pos.x = x;
			this.pos.y = y;
			if(checkShah()){
				if(checkShah() == this.team){
					this.pos.x = x1;
					this.pos.y = y1;
					state.push(buffer[0]);
					buffer.pop();
					return false;
				}
			}
			if(buffer.length!=0){
				state.push(buffer[0]);
				buffer.pop();
			}
			this.pos.x = x1;
			this.pos.y = y1;
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y - 1 == y) || (this.pos.x - 1 == x && this.pos.y - 1 == y))){
				if(y == 1 && !bool)choose(this);
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
	"wP" : function(x,y,bool){
			let x1 = this.pos.x;
			let y1 = this.pos.y;
			if(findF(x,y)){
				buffer.push(findF(x,y).figure);
				state.splice(findF(x,y).index,1);
			}
			this.pos.x = x;
			this.pos.y = y;
			if(checkShah()){
				if(checkShah() == this.team){
					this.pos.x = x1;
					this.pos.y = y1;
					state.push(buffer[0]);
					buffer.pop();
					return false;
				}
			}
			if(buffer.length!=0){
				state.push(buffer[0]);
				buffer.pop();
			}
			this.pos.x = x1;
			this.pos.y = y1;
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y + 1 == y) || (this.pos.x - 1 == x && this.pos.y + 1 == y))){
				if(y == 8 && !bool)choose(this);
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
				let x1 = this.pos.x;
				let y1 = this.pos.y;
				if(findF(x,y)){
					buffer.push(findF(x,y).figure);
					state.splice(findF(x,y).index,1);
				}
				this.pos.x = x;
				this.pos.y = y;
				if(checkShah()){
					if(checkShah() == this.team){
						this.pos.x = x1;
						this.pos.y = y1;
						state.push(buffer[0]);
						buffer.pop();
						return false;
					}
				}
				if(buffer.length!=0){
					state.push(buffer[0]);
					buffer.pop();
				}
				this.pos.x = x1;
				this.pos.y = y1;
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
				let x1 = this.pos.x;
				let y1 = this.pos.y;
				if(findF(x,y)){
					buffer.push(findF(x,y).figure);
					state.splice(findF(x,y).index,1);
				}
				this.pos.x = x;
				this.pos.y = y;
				if(checkShah()){
					if(checkShah() == this.team){
						this.pos.x = x1;
						this.pos.y = y1;
						state.push(buffer[0]);
						buffer.pop();
						return false;
					}
				}
				if(buffer.length!=0){
					state.push(buffer[0]);
					buffer.pop();
				}
				this.pos.x = x1;
				this.pos.y = y1;
				if((Math.abs(this.pos.x - x) == 1 && Math.abs(this.pos.y - y) == 2) || (Math.abs(this.pos.x - x) == 2 && Math.abs(this.pos.y - y) == 1))return true;
				else return false;
	},
	"bishop" : function (x,y){
				let x1 = this.pos.x;
				let y1 = this.pos.y;
				if(findF(x,y)){
					buffer.push(findF(x,y).figure);
					state.splice(findF(x,y).index,1);
				}
				this.pos.x = x;
				this.pos.y = y;
				if(checkShah()){
					if(checkShah() == this.team){
						this.pos.x = x1;
						this.pos.y = y1;
						state.push(buffer[0]);
						buffer.pop();
						return false;
					}
				}
				if(buffer.length!=0){
					state.push(buffer[0]);
					buffer.pop();
				}
				this.pos.x = x1;
				this.pos.y = y1;
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
				let x1 = this.pos.x;
				let y1 = this.pos.y;
				if(findF(x,y)){
					buffer.push(findF(x,y).figure);
					state.splice(findF(x,y).index,1);
				}
				this.pos.x = x;
				this.pos.y = y;
				if(checkShah()){
					if(checkShah() == this.team){
						this.pos.x = x1;
						this.pos.y = y1;
						state.push(buffer[0]);
						buffer.pop();
						return false;
					}
				}
				if(buffer.length!=0){
					state.push(buffer[0]);
					buffer.pop();
				}
				this.pos.x = x1;
				this.pos.y = y1;
				if((Math.abs(x - this.pos.x) > 1 || Math.abs(y - this.pos.y) > 1) && this.steps != 0)return false;
				else if (Math.abs(x - this.pos.x) == 1 || Math.abs(y - this.pos.y) == 1) {
					this.steps++;
					return true;
				}
				else if (this.steps == 0 && !checkShah()){
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
				let x1 = this.pos.x;
				let y1 = this.pos.y;
				if(findF(x,y)){
					buffer.push(findF(x,y).figure);
					state.splice(findF(x,y).index,1);
				}
				this.pos.x = x;
				this.pos.y = y;
				if(checkShah()){
					if(checkShah() == this.team){
						this.pos.x = x1;
						this.pos.y = y1;
						state.push(buffer[0]);
						buffer.pop();
						return false;
					}
				}
				if(buffer.length!=0){
					state.push(buffer[0]);
					buffer.pop();
				}
				this.pos.x = x1;
				this.pos.y = y1;
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

function checkShah(){
	let kings = findFName("king");
	let knightSteps = [[1,2],[2,1],[-1,2],[2,-1],[1,-2],[-2,1],[-1,-2],[-2,-1]];
	for(let h = 0;h < kings.length;h++){
		let king = kings[h];
		if(findF(king.pos.x + 1, king.pos.y + 1)){
			if(findF(king.pos.x + 1, king.pos.y + 1).figure.name == "pawn" && findF(king.pos.x + 1, king.pos.y + 1).figure.team != king.team && findF(king.pos.x + 1, king.pos.y + 1).figure.func(king.pos.x,king.pos.y,1)){
				return king.team;
			}
		}
		if (findF(king.pos.x - 1, king.pos.y - 1)){
			if(findF(king.pos.x - 1, king.pos.y - 1).figure.name == "pawn" && findF(king.pos.x - 1, king.pos.y - 1).figure.team != king.team && findF(king.pos.x - 1, king.pos.y - 1).figure.func(king.pos.x,king.pos.y,1)){
				return king.team;
			}
		}
		if (findF(king.pos.x - 1, king.pos.y + 1)){
			if(findF(king.pos.x - 1, king.pos.y + 1).figure.name == "pawn" && findF(king.pos.x - 1, king.pos.y + 1).figure.team != king.team && findF(king.pos.x - 1, king.pos.y + 1).figure.func(king.pos.x,king.pos.y,1)){
				return king.team;
			}
		}
		if (findF(king.pos.x + 1, king.pos.y - 1)){
			if(findF(king.pos.x + 1, king.pos.y - 1).figure.name == "pawn" && findF(king.pos.x + 1, king.pos.y - 1).figure.team != king.team && findF(king.pos.x + 1, king.pos.y - 1).figure.func(king.pos.x,king.pos.y,1)){
				return king.team;
			}
		}
		for(let i = king.pos.y + 1;i <= 8;i++){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.team != king.team && (findF(king.pos.x,i).figure.name == "queen" || findF(king.pos.x,i).figure.name == "rook")){
					return king.team;
				}
				else if (findF(king.pos.x,i).figure.team == king.team) break;
			}
		}
		for(let i = king.pos.y - 1;i >= 1;i--){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.team != king.team && (findF(king.pos.x,i).figure.name == "queen" || findF(king.pos.x,i).figure.name == "rook")){
					return king.team;
				}
				else if (findF(king.pos.x,i).figure.team == king.team) break;
			}
		}
		for(let i = king.pos.x - 1;i >= 1;i--){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.team != king.team && (findF(i,king.pos.y).figure.name == "queen" || findF(i,king.pos.y).figure.name == "rook")){
					return king.team;
				}
				else if (findF(i,king.pos.y).figure.team == king.team) break;
			}
		}
		for(let i = king.pos.x + 1;i <= 8;i++){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.team != king.team && (findF(i,king.pos.y).figure.name == "queen" || findF(i,king.pos.y).figure.name == "rook")){
					return king.team;
				}
				else if (findF(i,king.pos.y).figure.team == king.team) break;
			}
		}
		for(let i = 1;true;i++){
			if(king.pos.x + i > 8 || king.pos.y + i > 8)break;
			if(findF(king.pos.x + i,king.pos.y + i)){
				if(findF(king.pos.x + i,king.pos.y + i).figure.team != king.team && (findF(king.pos.x + i,king.pos.y + i).figure.name == "queen" || findF(king.pos.x + i,king.pos.y + i).figure.name == "bishop")){
					return king.team;
				}
				else if (findF(king.pos.x + i,king.pos.y + i).figure.team == king.team) break;
			}
		}
		for(let i = 1;true;i++){
			if(king.pos.x - i < 1 || king.pos.y - i < 1)break;
			if(findF(king.pos.x - i,king.pos.y - i)){
				if(findF(king.pos.x - i,king.pos.y - i).figure.team != king.team && (findF(king.pos.x - i,king.pos.y - i).figure.name == "queen" || findF(king.pos.x - i,king.pos.y - i).figure.name == "bishop")){
					return king.team;
				}
				else if (findF(king.pos.x - i,king.pos.y - i).figure.team == king.team) break;
			}
		}
		for(let i = 1;true;i++){
			if(king.pos.x + i > 8 || king.pos.y - i < 1)break;
			if(findF(king.pos.x + i,king.pos.y - i)){
				if(findF(king.pos.x + i,king.pos.y - i).figure.team != king.team && (findF(king.pos.x + i,king.pos.y - i).figure.name == "queen" || findF(king.pos.x + i,king.pos.y - i).figure.name == "bishop")){
					return king.team;
				}
				else if (findF(king.pos.x + i,king.pos.y - i).figure.team == king.team) break;
			}
		}
		for(let i = 1;true;i++){
			if(king.pos.x - i < 1 || king.pos.y + i > 8)break;
			if(findF(king.pos.x - i,king.pos.y + i)){
				if(findF(king.pos.x - i,king.pos.y + i).figure.team != king.team && (findF(king.pos.x - i,king.pos.y + i).figure.name == "queen" || findF(king.pos.x - i,king.pos.y + i).figure.name == "bishop")){
					return king.team;
				}
				else if (findF(king.pos.x - i,king.pos.y + i).figure.team == king.team) break;
			}
		}
		for(let i = 0;i < knightSteps.length;i++){
			if(findF(king.pos.x + knightSteps[i][0],king.pos.x + knightSteps[i][1])){
				if(findF(king.pos.x + knightSteps[i][0],king.pos.x + knightSteps[i][1]).figure.name == "knight" && findF(king.pos.x + knightSteps[i][0],king.pos.x + knightSteps[i][1]).figure.team != king.team){
					return king.team;
				}
			}
			else break;
		}
	}
	return false;
}
function checkMat(team){
	var figures = [];
	for(let i = 0;i < state.length;i++)if(state[i].team == team)figures.push(state[i]);
	for(let i = 0;i < figures.length;i++){
		if(figures[i].name == "pawn"){
			if(figures[i].func(figures[i].pos.x + 1,figures[i].pos.y + 1) || figures[i].func(figures[i].pos.x - 1,figures[i].pos.y + 1) || figures[i].func(figures[i].pos.x + 1,figures[i].pos.y - 1) || figures[i].func(figures[i].pos.x - 1,figures[i].pos.y - 1)){
				return false;
			}
		}
		if(figures[i].name == "rook"){
			for(let i = 0;i <= 8;i++){
				if(figures[i].func(figures[i].pos.x + i,figures[i].pos.y) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y) || figures[i].func(figures[i].pos.x,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x ,figures[i].pos.y - i)){
					return false;
				}
			}
		}
		if(figures[i].name == "bishop"){
			for(let i = 0;i <= 8;i++){
				if(figures[i].func(figures[i].pos.x + i,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y - i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y + i)){
					return false;
				}
			}
		}
		if(figures[i].name == "knight"){
			let knightSteps = [[1,2],[2,1],[-1,2],[2,-1],[1,-2],[-2,1],[-1,-2],[-2,-1]];
			for(let i = 0;i < knightSteps.length;i++){
				if(figures[i].func(figures[i].pos.x + knightSteps[i][0],figures[i].pos.y + knightSteps[i][0])){
					return false;
				}
			}
		}
		if(figures[i].name == "queen"){
			for(let i = 0;i <= 8;i++){
				if(figures[i].func(figures[i].pos.x + i,figures[i].pos.y) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y) || figures[i].func(figures[i].pos.x,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x ,figures[i].pos.y - i)){
					return false;
				}
			}
			for(let i = 0;i <= 8;i++){
				if(figures[i].func(figures[i].pos.x + i,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y - i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y + i) || figures[i].func(figures[i].pos.x - i,figures[i].pos.y + i)){
					return false;
				}
			}
		}
	}
	let text = team + " WINS";
	let span = document.createElement("span");
	span.style.cssText =  "position:fixed;top:0;left : 50%;color:green;font-size:22px;";
	span.innerText = text;
	document.body.append(span);
}

