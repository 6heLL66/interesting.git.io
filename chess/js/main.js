var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight - 20;
canvas.width = canvas.height;
canvas.style.marginLeft = window.innerWidth / 2 - canvas.width / 2 + "px";
canvas.style.marginTop ="10px";
var size = canvas.width / 8;
var current = -1;


function posToCords(pos){
	pos++;
	let y = Math.floor(pos / 8 - 0.01) + 1;
	let x = pos - ((y-1)*8);
	return {
		x : x,
		y : y
	}
}

function draw(){
	for(let i = 0;i < 64;i++){
		let x = posToCords(i).x;
		let y = posToCords(i).y;
		if((y % 2 == 0 && x % 2 == 0) || (y % 2 != 0 && x % 2 != 0))ctx.fillStyle = "#ffff95";
		else ctx.fillStyle = "#227022";
		ctx.fillRect((x-1)*size,(y-1)*size,size,size);
	}
	for(let i = 0;i < state.length;i++){
		let images = document.getElementsByTagName('img');
		for(let k = 0;k<images.length;k++){
			if(images[k].src.substr(images[k].src.length - 6,6) == state[i].img){
				ctx.drawImage(images[k],(state[i].pos.x-1)*size,(state[i].pos.y-1)*size,size,size);
				break;
			}
		}
	}	
}
function findF(x,y){
	if(x < 1 || x > 8 || y > 8 || y < 1)return false;
	for(let i = 0;i < state.length;i++){
		if(state[i].pos.x == x && state[i].pos.y == y)return {figure:state[i],index:i};
	}
	return false;
}
function findFName(name){
	let arr = [];
	for(let i = 0;i < state.length;i++){
		if(state[i] === undefined )console.log(state);
		if(state[i].name == name)arr.push(state[i]);
	}
	return arr;
}
canvas.onclick = function(e){
	let x = e.clientX - canvas.getBoundingClientRect().left;
	let y = e.clientY - canvas.getBoundingClientRect().top;
	let y1 = Math.floor(y / canvas.width * 10 * 0.8) + 1 ;
	let x1 = Math.floor(x / canvas.width * 10 * 0.8) + 1 ;
	if(current == -1 && !findF(x1,y1)){
		
	}
	else if (current == -1 && findF(x1,y1)){
		current = findF(x1,y1).figure;
	}
	else if (current != -1 && findF(x1,y1)){
		if(findF(x1,y1).figure.team == current.team){
			current = findF(x1,y1).figure;
		}
		else if(current.func(x1,y1)){
			state.splice(state.length-1,1);
			current.pos.x = x1;
			current.pos.y = y1;		
			draw();
			//if(current.team == "black")checkMat("white");
			//else checkMat("black");
			current = -1;
		}
	}
	else if (current != -1 && !findF(x1,y1)){
		if(current.func(x1,y1)){
			current.pos.x = x1;
			current.pos.y = y1;
			draw();
			//if(current.team == "black")checkMat("white");
			//else checkMat("black");
			current = -1;
		}
		else current = -1;
	}
	
}
