const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
var state = [ "" , "" , "",
			  "" , "" , "",
			  "" , "" , "",""
			];
var turn = 1;
canvas.height = window.innerHeight - 100;
canvas.width = canvas.height;
canvas.style.marginLeft = window.innerWidth/2 - canvas.width/2 + "px";
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.moveTo(0, Math.round(canvas.height*0.33));
ctx.lineTo(canvas.width, Math.round(canvas.height*0.33));
ctx.moveTo(0, Math.round(canvas.height*0.66));
ctx.lineTo(canvas.width, Math.round(canvas.height*0.66));
ctx.moveTo(Math.round(canvas.height*0.33),0);
ctx.lineTo( Math.round(canvas.height*0.33),canvas.width);
ctx.moveTo(Math.round(canvas.height*0.66),0);
ctx.lineTo(Math.round(canvas.height*0.66),canvas.width);
ctx.stroke();

canvas.onclick = function (e) {
	let x = e.clientX - canvas.getBoundingClientRect().x;
	let y = e.clientY - canvas.getBoundingClientRect().y;
	let rectX = Math.floor(x / canvas.width / 0.33) + 1;
	if (rectX == 4) rectX--;
	let rectY = Math.floor(y / canvas.height / 0.33) + 1;
	if (rectY == 4) rectY--;
	let pos = (rectY-1) * 3 + rectX;
	if(turn == 1 && state[pos] == ""){
		state[pos] = "x";
		drawCross(rectX,rectY);
		turn++;
		botStep();
	}
}
function drawCross(rectX,rectY){
	ctx.moveTo((rectX - 1) * 0.33 * canvas.width + canvas.width*0.33/10, (rectY - 1) * 0.33 * canvas.height + canvas.height*0.33/10);
	ctx.lineTo((rectX - 1) * 0.33 * canvas.width + 0.33 * canvas.width - canvas.width*0.33/10,(rectY - 1) * 0.33 * canvas.height + 0.33 * canvas.height - canvas.height*0.33/10);
	ctx.moveTo((rectX) * 0.33 * canvas.width - canvas.width*0.33/10, (rectY - 1) * 0.33 * canvas.height + canvas.height*0.33/10);
	ctx.lineTo((rectX - 1) * 0.33 * canvas.width  + canvas.width*0.33/10,(rectY - 1) * 0.33 * canvas.height + 0.33 * canvas.height - canvas.height*0.33/10);
	ctx.stroke();
}
function setToe(pos){
	if(pos <= 3){
		var x = pos;
		var y = 0;
	}
	else {
		var y = Math.floor(pos/3-.001);
		var x = pos - (y)*3;
	}
	ctx.beginPath();
	console.log(x * 0.33 * canvas.width - 0.33 * canvas.width/2,y * 0.33 * canvas.width + 0.33 * canvas.width/2);
	ctx.arc(x * 0.33 * canvas.width - 0.33 * canvas.width/2, y * 0.33 * canvas.width + 0.33 * canvas.width/2  , canvas.width*0.33/2.6 , 0 , 2 * Math.PI );
	ctx.stroke();
	state[pos] = "o";
	turn = 1;
}
function botStep(){
	var check = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
	if(!checkWin() && !checkLoose()){
		while (true) {
			if(state[5] == ""){
				setToe(5);
				state[5] = "o";
				break;
			}
			let num = Math.round(Math.random() * 8 + 1);
			if(state[num] != "x"){
				state[num] = 'o';
				setToe(num);
				break;
			}
		}
	}
	function checkWin(){
		for(let i = 0;i < check.length;i++){
			let c = 0;
			let v = 0;
			if(state[check[i][0]] == "o")c++;
			if(state[check[i][0]] == "")v = check[i][0];
			if(state[check[i][1]] == "")v = check[i][1];
			if(state[check[i][2]] == "")v = check[i][2];
			if(state[check[i][1]] == "o")c++;
			if(state[check[i][2]] == "o")c++;
			if(v != 0 && c == 2){
				setToe(v);
				if(check[i][0] <= 3){
					var x1 = check[i][0];
					var y1 = 0;
					var x2 = v;
					var y2 = 0;
				}
				else {
					var y1 = Math.floor(check[i][0]/3-.001);
					var x1 = check[i][0] - (y1)*3;
					var y2 = Math.floor(v/3-.001);
					var x2 = v - (y1)*3;
				}
				moveTo(x1,y1);
				lineTo(x2,y2);
				ctx.stroke();
				return true;
			}
		}
		return false;
	}
	function checkLoose(){
		for(let i = 0;i < check.length;i++){
			let c = 0;
			let v = 0;
			if(state[check[i][0]] == "x")c++;
			if(state[check[i][0]] == "")v = check[i][0];
			if(state[check[i][1]] == "")v = check[i][1];
			if(state[check[i][2]] == "")v = check[i][2];
			if(state[check[i][1]] == "x")c++;
			if(state[check[i][2]] == "x")c++;
			if(v != 0 && c == 2){
				setToe(v);
				return true;
			}
		}
		return false;
	}
	
}

