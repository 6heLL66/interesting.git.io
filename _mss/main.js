var tch = new tchPlanet(); //create technique

camera = new Camera(new vec3(0, 0, -1), vec3.unitZ(), vec3.unitY()); //create camera

let projectionMatrix = new mat4(); //create projection matrix
mat4.Perspective(projectionMatrix, canvas.width / canvas.height, 0.001, 50, 1); //setup projection matrix

//time_r
let t = 0.0;
let delta = 0.05;

setInterval(function() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    //update camera view matrix
    camera.update();
    //resulting matrix
    let matrix = new mat4(); 
    matrix.copy(camera.viewMatrix);
    matrix.mul(projectionMatrix);
    
    //draw sphere
    tch.Use(matrix, new vec3(t - 5, 3, -1));
    gl.bindBuffer(gl.ARRAY_BUFFER, sun.vertexBuffer);
    tch.SetupAttributes();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sun.indexBuffer);
    gl.drawElements(gl.TRIANGLES, sun.elementCount, gl.UNSIGNED_SHORT, 0);
    tch.DisableAttributes();    
    
    //update timer
    t += delta;
}, 50);