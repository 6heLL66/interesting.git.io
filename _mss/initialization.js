canvas = document.createElement('canvas');
document.body.appendChild(canvas);
//canvas = document.getElementById("canva");     
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl = canvas.getContext("webgl2");  

gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.GEQUAL);
gl.clearDepth(0);
gl.clearColor(0, 0, 0, 1);