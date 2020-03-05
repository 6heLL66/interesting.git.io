var canvas = document.getElementById('canva');
var ctx = canvas.getContext("2d");
canvas.width = document.getElementById('canva').offsetWidth;
canvas.height = document.getElementById('canva').offsetHeight;
var pixels = [];
var myImageData = ctx.createImageData(canvas.width, canvas.height);
var canvasTest = document.getElementById('canvaTest');
var ctxTest = canvasTest.getContext("2d");
var c = 0;
var animated = false;



document.getElementById('btn').onclick = function(){
	if(animated)return 0;
	c++;
	if(c>1){
		for(let i = 0;i<pixels.length;i++){
			let x = Math.round(Math.random()*canvas.width);
			let y =  Math.round(Math.random()*canvas.height);
			pixels[i].to[0] = x;
			pixels[i].to[1] = y;
			pixels[i].speed[0] = (x - pixels[i].pos[0]);
			pixels[i].speed[1] = (y - pixels[i].pos[1]);
			var time = 0;
			up = setInterval(update,20);
			return 0;
		}
	}
	ctxTest.fillStyle = "#000";
	ctxTest.font = "100pt Arial";
	ctxTest.fillText(document.getElementById('in').value, 0, 100);
	var text = ctxTest.measureText(document.getElementById('in').value);
	canvasTest.width = text.width;
	ctxTest.fillStyle = "#000";
	ctxTest.font = "100pt Arial";
	ctxTest.fillText(document.getElementById('in').value, 0, 100);
	var wordPixels = ctxTest.getImageData(0,0,canvasTest.width,canvasTest.height);
	var to = [];
	var time = 0;
	for(let i = 3;i < wordPixels.data.length;i+=4){
		if(wordPixels.data[i] == 255){
			let y = Math.round(i/4/canvasTest.width);
			let x = (i/4)%canvasTest.width;
			to.push([x,y]);
		}
	}
	setPixels(to.length);
	drawPixels();
	var up = setInterval(update,20);

	function setPixels(n){
		for(let i = 0;i<n;i++){
			var posX = Math.round(Math.random()*(canvas.width));
			var posY = Math.round(Math.random()*(canvas.height));
			var speed = [];
			speed[0] = (to[i][0] - posX)/5;
			speed[1] = (to[i][1] - posY)/5;
			var obj = {
				"color" : [0,0,0,255],
				"pos" : [posX,posY],
				"to" : [to[i][0],to[i][1]],
				"speed" : speed
			}
			pixels.push(obj);
		}
	}

	function drawPixels(){
		canvas.width = canvas.width;
		myImageData = ctx.createImageData(canvas.width, canvas.height);
		
		for(let i = 0;i<pixels.length;i++){
			let color = pixels[i].color;    
			let x = Math.round(pixels[i].pos[0]),
				y = Math.round(pixels[i].pos[1]);
			myImageData.data[ (y*canvas.width*4)+ ((x)*4 )] = color[0];
			myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +1] = color[1];
			myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +2] = color[2];
			myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +3] = color[3];
		}
		ctx.putImageData(myImageData, 0, 0);			
	}

	function update(){
		time += 20;
		console.log(time);
		animated = true;
		if(time == 5000){
			time = 0;
			clearInterval(up);
			animated = false;
		}
		for(let i = 0;i<pixels.length;i++){
			pixels[i].pos[0] += pixels[i].speed[0]/50;
			pixels[i].pos[1] += pixels[i].speed[1]/50;
		}
		drawPixels();
	}
}

