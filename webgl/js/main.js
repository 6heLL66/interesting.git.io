


var gl;

function initGL(canvas){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl = canvas.getContext('experimental-webgl');
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
}


function getShader(gl,id){
	var shaderScript = document.getElementById(id);
	var str = "";
	var k = shaderScript.firstChild;
	while(k){
        if (k.nodeType == 3) {
        	str += k.textContent;
        }
        k = k.nextSibling;
    }
	var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } 
    else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram;

function initShaders(){
	var fragmentShader = getShader(gl,'shader-fs');
	var vertexShader = getShader(gl,'shader-vs');
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader); 
	gl.attachShader(shaderProgram,fragmentShader); 
	gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
	
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}



var sphereVertexPositionBuffer;
var sphereVertexNormalBuffer;
var sphereVertexTextureCoordBuffer;
var sphereVertexIndexBuffer;
function initBuffers(){
    var latitudeBands = 60;
    var longitudeBands = 60;
    var r = 2;
    var positionArray = [];
    var normalArray = [];
    var textureCoordsArray = [];
    for(let i = 0;i <= latitudeBands;i++){
        var alpha = i * Math.PI/latitudeBands;
        var cosA = Math.cos(alpha);
        var sinA = Math.sin(alpha);
        for (let j = 0;j <= longitudeBands;j++){
           var phi = j * 2 * Math.PI/longitudeBands;
           var sinP = Math.sin(phi);
           var cosP = Math.cos(phi);
           var x = cosP * sinA;
           var y = cosA;
           var z = sinP * sinA;
           var u = 1 - (j/latitudeBands);
           var v = 1 - (i/longitudeBands);
           normalArray.push(x);
           normalArray.push(y);
           normalArray.push(z);
           positionArray.push(r * x);
           positionArray.push(r * y);
           positionArray.push(r * z);
           textureCoordsArray.push(u);
           textureCoordsArray.push(v);
        }
    }
    var indexArray = [];
    for (let i = 0; i < latitudeBands; i++) {
        for(let j = 0; j < longitudeBands; j++){
            let first = (i * (longitudeBands + 1))+ j;
            let second = first + longitudeBands + 1;
            indexArray.push(first);
            indexArray.push(second);
            indexArray.push(first + 1);

            indexArray.push(second);
            indexArray.push(second + 1);
            indexArray.push(first + 1);
        }
    }
    sphereVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,sphereVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positionArray), gl.STATIC_DRAW);
    sphereVertexPositionBuffer.itemSize = 3;
    sphereVertexPositionBuffer.numItems = positionArray.length / 3;

    sphereVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,sphereVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(normalArray), gl.STATIC_DRAW);
    sphereVertexNormalBuffer.itemSize = 3;
    sphereVertexNormalBuffer.numItems = normalArray.length / 3;

    sphereVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,sphereVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(textureCoordsArray), gl.STATIC_DRAW);
    sphereVertexTextureCoordBuffer.itemSize = 2;
    sphereVertexTextureCoordBuffer.numItems = textureCoordsArray.length / 2;


    sphereVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,sphereVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexArray), gl.STATIC_DRAW);
    sphereVertexIndexBuffer.itemSize = 1;
    sphereVertexIndexBuffer.numItems = indexArray.length ;
	
}
var c = Math.PI;
function drawScene(){
	c += Math.PI / 300;
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix, [0, 0.0, -15.0]);
	mat4.rotate(mvMatrix,c,[1,1,1]);
	

    

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, sphereVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sunTexture);
    console.log(sunTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);


    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES,sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(drawScene);
}
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    drawScene();
}

var sunTexture;

function initTexture() {
    sunTexture = gl.createTexture();
    sunTexture.image = new Image();
    
    sunTexture.image.onload = function(){
        handleLoadedTexture(sunTexture);
    }
    
   sunTexture.image.crossOrigin = 'anonymous';
   sunTexture.image.src = 'https://i.ibb.co/BrZ4jRf/8k-sun.jpg';

   
}

window.onload = function(){
	var canvas = document.getElementById("canvas");
	initGL(canvas);
	initShaders();
	initBuffers();
    initTexture();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	
}




	
