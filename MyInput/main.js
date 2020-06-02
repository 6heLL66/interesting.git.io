class MyInput {
	constructor(style){
		this.onClick = this.onClick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
		this.draw = this.draw.bind(this);
		this.update = this.update.bind(this);
		this.box = document.createElement('div');
		this.box.style.cssText = style;
		this.box.setAttribute('class', 'mybox');
		this.canvas = document.createElement('canvas');
		this.canvas1 = document.createElement('canvas');
		this.canvas.style.cssText = "position:absolute;top:0;left:0;cursor:text;"
		this.canvas1.style.cssText = "position:absolute;top:0;left:0;cursor:text;"
		this.ctx = this.canvas.getContext('2d');
		this.ctx1 = this.canvas1.getContext('2d');
		this.text = "";
		this.letters = [];
		this.objects = [];
		document.addEventListener("click" , this.onClick);
		document.addEventListener("keydown" , this.onkeydown);
		this.focus = false;
		this.time = 0;	
	}
	addMiddle(main,index,child){
		let result = [];
		for(let i = 0;i < main.length;i++){
			result.push(main[i]);
			if(i == index){
				for(let k = 0;k<child.length;k++){
					result.push(child[k]);
				}
			}			
		}
		return result;

	}
	add(id){
		this.box.append(this.canvas);
		this.box.append(this.canvas1);
		document.getElementById(id).append(this.box);
		this.canvas.width = document.getElementsByClassName('mybox')[0].clientWidth;
		this.canvas.height = document.getElementsByClassName('mybox')[0].clientHeight;
		this.canvas1.width = document.getElementsByClassName('mybox')[0].clientWidth;
		this.canvas1.height = document.getElementsByClassName('mybox')[0].clientHeight;
		this.cursor = {
			'posX' : 1,
			'posY' : this.canvas.height/8,
			'width' : 1,
			'height' : this.canvas.height*0.75,
			'color' : "rgba(0,0,0,1)"
		}	
	}
	onClick (e) {
		let x = e.clientX - this.canvas.getBoundingClientRect().x - 1;
		let y = e.clientY - this.canvas.getBoundingClientRect().y - 1;
		console.log(x , this.letters);
		if(e.target == this.canvas1){
			this.time = 0;
			this.cursor.color = "rgba(0,0,0,1)";
			
			if(this.text != ""){
				let best = 999999;
				let index;
				for(let i = 0;i < this.letters.length - 1;i++){
					if(x > this.letters[this.letters.length-1].posX){
						index = this.letters.length-1;
						break;
					}
					if(Math.abs(x - this.letters[i].posX) < best){
						best = x - this.letters[i].posX;
						index = i;
					}
				}
				if(best < this.letters[index].width/2)this.cursor.posX = this.letters[index].posX;
				else this.cursor.posX = this.letters[index].posX + this.letters[index].width;
				
			}
			
			if(this.focus == false)this.cycle = setInterval(this.update,1);
			this.focus = true;
		}
		else {
			this.focus = false;
			this.cursor.color = "rgba(0,0,0,0)";
			this.draw();
			if(this.cycle)clearInterval(this.cycle);			
		} 
	}
	onkeydown(e){
		if(this.focus == false || e.key == "Tab" || e.key == "Shift" || e.key == "CapsLock" || e.key == "Enter" || e.key == "ArrowRight" 
			|| e.key == "ArrowLeft"|| e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Alt" || e.key == "Control" || e.key == "Meta" 
			|| e.key == "Esc")return 0; 
		this.time = 0;
		this.cursor.color = "rgba(0,0,0,1)";
		if(e.key == "Backspace"){
			if(this.text == "")return 0;
			if(this.letters.length == 1)this.letters.splice(0,1);
			for(let i = 0;i < this.letters.length;i++){
				if(this.cursor.posX - this.letters[i].posX == this.letters[i].width){
					this.cursor.posX -= this.letters[i].width;
					for(let k = i + 1;k < this.letters.length;k++)this.letters[k].posX -= this.letters[i].width;
					this.letters.splice(i,1);
					this.text.split('').splice(i,1).join();
				}
			}
			if(this.letters.length == 0)this.cursor.posX = 1;
			
			console.log(this.text);
			return 0;
		}
		this.text += e.key;
		this.ctx.font = this.cursor.height*0.7 + 'px Arial';
		let width = this.ctx.measureText(e.key).width;

		let obj = {
			'text' : e.key,
			'posX' : this.cursor.posX,
			'posY': this.cursor.height/1.15,
			'font' : this.cursor.height*0.7,
			'width' : width
		}
		this.cursor.posX += width;
		this.letters.push(obj);
	}
	draw () {
		this.canvas.width = this.canvas.width;
		if(this.focus == true){
			this.ctx.fillStyle = this.cursor.color;
			this.ctx.fillRect(this.cursor.posX, this.cursor.posY , this.cursor.width , this.cursor.height);
		}
		for(let i = 0;i < this.letters.length;i++){
			let obj = this.letters[i];
			this.ctx.font = obj.font + "px Arial";
			this.ctx.fillStyle = "black";
			this.ctx.fillText(obj.text, obj.posX , obj.posY);
		}
	}
	update () {
		this.time++;
		if(this.time == 150)this.cursor.color = "rgba(0,0,0,0)";
		if(this.time == 300){
			this.cursor.color = "rgba(0,0,0,1)";
			this.time = 0;
		}
		this.draw();
	}

	
}
var input = new MyInput("border : 1px solid black;box-shadow : 2px 2px 2px 0px rgba(0,0,0,0.2);margin:10px;width : 50%;height : 30px;position:absolute;");
input.add("body");