var buffer = [];
var rules = {
	"bP" : function(x,y){
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y - 1 == y) || (this.pos.x - 1 == x && this.pos.y - 1 == y))){
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == (y + 1) || this.pos.y == (y + 2))){
				if(this.pos.y > y){
					for(let i = this.pos.y - 1;i >= y;i--){
						if(findF(this.pos.x,i))return false;
					}
				}
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y + 1){
				if(findF(this.pos.x,this.pos.y - 1))return false;
				return true;	
			}
			return false;
	},
	"wP" : function(x,y){
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y + 1 == y) || (this.pos.x - 1 == x && this.pos.y + 1 == y))){
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == y - 1 || this.pos.y == y - 2)){
				if(this.pos.y < y){
					for(let i = this.pos.y + 1;i <= y;i++){
						if(findF(this.pos.x,i))return false;
					}
				}
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y - 1){
				if(findF(this.pos.x,this.pos.y + 1))return false;
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
	"king" : function(x,y,bool){				
				if ((Math.abs(x - this.pos.x) == 1 || Math.abs(x - this.pos.x) == 0) && (Math.abs(y - this.pos.y) == 1 || Math.abs(y - this.pos.y) == 0)) {
					return true;
				}
				else if (this.steps == 0 && bool == false){
					if(x == this.pos.x - 2 && findF(1,this.pos.y).figure.name == "rook" && !findF(3,this.pos.y)){
						findF(1,this.pos.y).figure.pos.x = 3;
						return true;
					}
					else if (x == this.pos.x + 2 && findF(8,this.pos.y).figure.name == "rook" && !findF(7,this.pos.y) && !findF(5,this.pos.y)){
						state[findF(8,this.pos.y).index].pos.x = 5;
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
var state = [];
function fillState(){
	state = [];
	for(let i = 0;i < 32;i++){
		if(i < 16){
			if(i < 8){
				let obj = {
					name : "pawn",
					pos : {x : i + 1, y : 2},
					team : "white",
					img : "wP.png",
					steps : 0,
					func : rules.wP
				}
				state.push(obj);
			}
			if(i == 8 || i == 9){
				let obj = {
					name : "rook",
					pos : {x : i == 8 ? 1 : 8, y : 1},
					team : "white",
					img : "wR.png",
					func : rules.rook
				}
				state.push(obj);
			}
			if(i == 10 || i == 11){
				let obj = {
					name : "knight",
					pos : {x : i == 10 ? 2 : 7, y : 1},
					team : "white",
					img : "wN.png",
					func : rules.knight
				}
				state.push(obj);
			}
			if(i == 12 || i == 13){
				let obj = {
					name : "bishop",
					pos : {x : i == 12 ? 3 : 6, y : 1},
					team : "white",
					img : "wB.png",
					func : rules.bishop
				}
				state.push(obj);
			}
			if(i == 14){
				let obj = {
					name : "king",
					pos : {x : 4, y : 1},
					team : "white",
					steps : 0,
					img : "wK.png",
					func : rules.king
				}
				state.push(obj);
			}
			if(i == 15){
				let obj = {
					name : "queen",
					pos : {x : 5, y : 1},
					team : "white",
					img : "wQ.png",
					func : rules.queen
				}
				state.push(obj);
			}
		}
		else {
			if(i < 24){
				let obj = {
					name : "pawn",
					pos : {x : i - 15, y : 7},
					team : "black",
					img : "bP.png",
					steps : 0,
					func : rules.bP
				}
				state.push(obj);
			}
			if(i == 24 || i == 25){
				let obj = {
					name : "rook",
					pos : {x : i == 24 ? 1 : 8, y : 8},
					team : "black",
					img : "bR.png",
					func : rules.rook
				}
				state.push(obj);
			}
			if(i == 26 || i == 27){
				let obj = {
					name : "knight",
					pos : {x : i == 26 ? 2 : 7, y : 8},
					team : "black",
					img : "bN.png",
					func : rules.knight
				}
				state.push(obj);
			}
			if(i == 27 || i == 28){
				let obj = {
					name : "bishop",
					pos : {x : i == 27 ? 3 : 6, y : 8},
					team : "black",
					img : "bB.png",
					func : rules.bishop
				}
				state.push(obj);
			}
			if(i == 29){
				let obj = {
					name : "king",
					pos : {x : 4, y : 8},
					team : "black",
					steps : 0,
					img : "bK.png",
					func : rules.king
				}
				state.push(obj);
			}
			if(i == 30){
				let obj = {
					name : "queen",
					pos : {x : 5, y : 8},
					team : "black",
					img : "bQ.png",
					func : rules.queen
				}
				state.push(obj);
			}
		}
	}
	draw();
}
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
	let images = document.getElementsByTagName('img');
	for(let i = 0;i<images.length;i++){
		images[i].style.display = 'none';
		images[i].onload = function(){
			draw();
		}
	}
}
load();
function choose(obj,y){
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
    if(obj.team == 'black' && y == 1){
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
    else if (obj.team == "white" && y == 8){
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
function change(fig,pos,kill){
	buffer = [];
	if(kill){
		buffer.push({x : fig.pos.x,y:fig.pos.y})
		buffer.push(findF(kill.x,kill.y).figure);
		state.splice(findF(kill.x,kill.y).index,1);
		fig.pos.x = pos.x;
		fig.pos.y = pos.y;
	}
	else{
		buffer.push({x : fig.pos.x,y:fig.pos.y})
		fig.pos.x = pos.x;
		fig.pos.y = pos.y;
	}
}
function checkShah(team){
	let kings = findFName("king");
	let knightSteps = [[1,2],[2,1],[-1,2],[2,-1],[1,-2],[-2,1],[-1,-2],[-2,-1]];
	console.log(1);
	for(let h = 0;h < kings.length;h++){
		let king = kings[h];
		if(king.team != team)continue;
		for(let i = king.pos.y - 1;i >= 1;i--){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x,i).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.y + 1;i <= 8;i++){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x,i).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.x - 1;i >= 1;i--){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.func(king.pos.x,king.pos.y) && findF(i,king.pos.y).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.x + 1;i <= 8;i++){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.func(king.pos.x,king.pos.y) && findF(i,king.pos.y).figure.team != king.team)return true
				else break;
			}
		}
		let check = [0,0,0,0];
		for(let i = 1;i <= 8;i++){ 
			if(findF(king.pos.x + i,king.pos.y + i) && check[0] == 0){
				if(findF(king.pos.x + i,king.pos.y + i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + i,king.pos.y + i).figure.team != king.team)return true
				else check[0] == 1;
			}
			if(findF(king.pos.x - i,king.pos.y + i) && check[1] == 0){
				if(findF(king.pos.x - i,king.pos.y + i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x - i,king.pos.y + i).figure.team != king.team)return true
				else check[1] == 1;
			}
			if(findF(king.pos.x + i,king.pos.y - i) && check[2] == 0){
				if(findF(king.pos.x + i,king.pos.y - i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + i,king.pos.y - i).figure.team != king.team)return true
				else check[2] == 1;
			}
			if(findF(king.pos.x - i,king.pos.y - i) && check[3] == 0){
				if(findF(king.pos.x - i,king.pos.y - i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x - i,king.pos.y - i).figure.team != king.team)return true
				else check[3] == 1;
			}
		}
		for(let i = 0;i < knightSteps.length;i++){
			if(findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1])){
				if(findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1]).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1]).figure.team != king.team)return true;
			}
		}
	}
	return false;
}
function checkMat(team){
	console.log("check");
	let num = state.length;
	for(let i = 0;i < num;i++){
		if(state[i].team != team)continue;
		let fig = state[i];
		let arr = [];
		for(let y = 1;y <= 8;y++){
			for(let x = 1;x <= 8;x++){
				if(!state[i].func(x,y))continue;
				else {
					if(findF(x,y)){
						if(findF(x,y).figure.team != fig.team)arr.push({x : x,y : y})
					}
					else arr.push({x : x,y : y});
				}
			}
		}
		console.log(fig);
		console.log(arr);
		for(let k = 0;k < arr.length;k++){
			if(findF(arr[k].x,arr[k].y)){
				change(fig,{x : arr[k].x, y : arr[k].y},{x : arr[k].x, y : arr[k].y});
				if(checkShah(fig.team)){
					state.push(buffer[1]);
					change(fig,buffer[0]);
					buffer = [];					
				}
				else {
					state.push(buffer[1]);
					change(fig,buffer[0]);
					buffer = [];
					current = -1;
					return false;
				}		
			}
			else{
				change(fig,{x : arr[k].x, y : arr[k].y});
				if(checkShah(fig.team)){
					change(fig,buffer.pop());	
				}				
				else {
					change(fig,buffer.pop());
					current = -1;
					return false;
				}
			}
		}
	}
	let text = ""
	if(team == "black")text = "white" + " WINS";
	else text = "black" + " WINS";
	
	let modal = document.createElement("div");
	let cross = document.createElement("div");
	cross.innerHTML = '<i class="fas fa-times"></i>';
	cross.style.cssText = 'position : absolute;top : 15px; right : 15px;cursor:pointer';
	cross.onclick = function(){
		modal.style.display = "none";
	}
	let css = `
		width : ` + String(0.2 * window.innerWidth) + `px;
		height : ` + String(0.2 * window.innerWidth) + `px;
		position:fixed;
		top: ` + String(window.innerHeight / 2 - 0.1 * window.innerWidth) + `px;
		left : ` + String(window.innerWidth / 2 - 0.1 * window.innerWidth) + `px;
		color:green;
		background-color:#fbf6f6;
		box-shadow : 0 0 10px 0 rgba(0,0,0,0.7);
		font-size:22px;
		text-align:center;
		padding : 15px;
	`
	modal.style.cssText =  css;

	modal.innerText = text;
	modal.append(cross);
	document.body.append(modal);
}
