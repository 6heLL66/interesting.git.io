var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth - 4;
canvas.height = document.documentElement.clientHeight - 4;
document.body.style.height = document.documentElement.clientHeight - 4 + "px";

var rectWidth = 14;
var rectHeight = 14;
var rectColor = "black";
var rectMargin = 6;
var rectSpeed = 1;
var appleSize = 10;

var rectangles = [];
var apples = [];

var key = true;
var countApples = 0;
var timeNow = "0:00";



for(let i = 0;i < 10;i++){
	let obj = {
		'turn' : 'right',
		'posx' : i * rectWidth + i * rectMargin ,
		'posy' : 250 ,
		'width' : rectWidth,
		'height' : rectHeight,
		'stack' : ''
	}
	rectangles.push(obj);
}

function inRad(num) {
	return num * Math.PI / 180;
}

function drawRect(){
	canvas.width = canvas.width;
	ctx.fillStyle = "rgba(0,0,0,0.04)";
	ctx.font = "italic 250pt Arial";
	ctx.fillText("WASD",canvas.width/2 - ctx.measureText('WASD').width/2,canvas.height/1.7);
	for(let i = 0;i < rectangles.length;i++){

		if(i == rectangles.length - 1){
			for(let j = 0;j<rectangles.length - 1;j++){
				if(Math.abs(rectangles[i].posx - rectangles[j].posx) < rectHeight/2 &&  Math.abs(rectangles[i].posy - rectangles[j].posy) < rectHeight/2){
					clearInterval(gameCycle);
					document.getElementById('window').style.display = 'flex';
				}
			}
		}



		if(i == rectangles.length - 1){
			if(rectangles[i].posx == canvas.width - rectWidth/2)turnRect(rectangles[i].posx,rectangles[i].posy,'left');
			if(rectangles[i].posx == 0)turnRect(rectangles[i].posx,rectangles[i].posy,'right');
			if(rectangles[i].posy == 0)turnRect(rectangles[i].posx,rectangles[i].posy,'bottom');
			if(rectangles[i].posy == canvas.height - rectHeight/2)turnRect(rectangles[i].posx,rectangles[i].posy,'top');
		}

		if(apples.length > 0){

			for(let k = 0;k<apples.length;k++){
				if(i == rectangles.length - 1 && Math.abs(rectangles[i].posx - apples[k][0]) < rectHeight && Math.abs(rectangles[i].posy - apples[k][1]) < rectHeight){
					apples.splice(k,1);
					addPart();
					i++;
					continue;
				}
				ctx.fillStyle = '#ff0000';
				ctx.fillRect(apples[k][0], apples[k][1], appleSize, appleSize);
			}
		}

		if(rectangles[i].stack != ''){
			if(rectangles[i].posx == rectangles[i].stack[0].posx && rectangles[i].posy == rectangles[i].stack[0].posy){
				rectangles[i].turn = rectangles[i].stack[0].side;
				rectangles[i].stack.splice(0,1);
			}
		}
		
		if(rectangles[i].turn == 'top'){
			rectangles[i].posy -= rectSpeed;	
		}
		if(rectangles[i].turn == 'left'){
			rectangles[i].posx -= rectSpeed;	
		}
		if(rectangles[i].turn == 'bottom'){
			rectangles[i].posy += rectSpeed;
		}
		if(rectangles[i].turn == 'right')rectangles[i].posx += rectSpeed;
		ctx.fillStyle = '#8080FF';
		ctx.fillRect(rectangles[i].posx, rectangles[i].posy, rectangles[i].width, rectangles[i].height);
	}
}
var gameCycle = setInterval(drawRect,4);

function turnRect(posx,posy,side){

	rectangles[rectangles.length - 1].turn = side;
	for(let i = 0;i < rectangles.length - 1;i++){
		if(rectangles[i].stack != '')rectangles[i].stack.push({'side' : side,"posx" :posx , 'posy' : posy});
		else rectangles[i].stack = [{'side' : side,"posx" :posx , 'posy' : posy}];
	}	
}

document.onkeydown = function(e){
		if(key == false)return  0;
		let posx = rectangles[rectangles.length - 1].posx;
		let posy = rectangles[rectangles.length - 1].posy;
		if(e.key == 'w' || e.key == 'ц')turnRect(posx,posy,'top');
		if(e.key == 's' || e.key == 'ы')turnRect(posx,posy,'bottom');
		if(e.key == 'a' || e.key == 'ф')turnRect(posx,posy,'left');
		if(e.key == 'd' || e.key == 'в')turnRect(posx,posy,'right');
		key = false;
		setTimeout(unlockKey,15);
}

function spawnApple () {
	if(apples.length > 9)return 0;
	let posx = Math.round(Math.random() * (canvas.width - 10) + 5);
	let posy = Math.round(Math.random() * (canvas.height - 10) + 5);
	apples.push([posx,posy]);
}

function addPart () {
	countApples++;
	document.getElementById('apple').innerText = String(countApples);
	let posx;
	let posy;
	let stack = [];
	for(let i = 0;i<rectangles[0].stack.length;i++){
		let obj = {
			'side' : rectangles[0].stack[i].side,
			'posx' : rectangles[0].stack[i].posx,
			'posy' : rectangles[0].stack[i].posy
		}
		stack.push(obj);
	}

	if(rectangles[0].turn == 'left' ){
		posx = rectangles[0].posx + rectWidth + rectMargin;
		posy = rectangles[0].posy;
	}
	if(rectangles[0].turn == 'right' ){
		posx = rectangles[0].posx - rectWidth - rectMargin;
		posy = rectangles[0].posy;
	}
	if(rectangles[0].turn == 'top' ){
		posx = rectangles[0].posx ;
		posy = rectangles[0].posy + rectHeight + rectMargin;
	}
	if(rectangles[0].turn == 'bottom' ){
		posx = rectangles[0].posx;
		posy = rectangles[0].posy - rectHeight - rectMargin;
	}
	let obj = {
		'turn' : rectangles[0].turn,
		'posx' : posx,
		'posy' : posy ,
		'width' : rectWidth,
		'height' : rectHeight,
		'stack' : stack
	}
	rectangles.unshift(obj);
}

setInterval(spawnApple,2500,8);

function unlockKey(){
	key = true;
}

var sec = 0;
var min = 0;

function updateTime(){
	if(sec!=60)sec++;
	else {sec = 0;min++};
	if(sec < 10)timeNow = String(min) + ":0" + String(sec);
	else timeNow = String(min) + ":" + String(sec);
	document.getElementById('time').innerText = timeNow;
}
setInterval(updateTime,1000);
