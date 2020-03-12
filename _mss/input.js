let rotationSpeed = 1.2;
let moveSpeed = 0.05;
let mouseDown = false;
let prevX = 0;
let prevY = 0;

window.onmousedown = function(e) {
    mouseDown = true;
    prevX = e.clientX;
    prevY = e.clientY;
}
window.onmouseup = function(e) {
    mouseDown = false;
}
window.onmousemove = function (e) {
  if (mouseDown) {
      let deltaAngY = -rotationSpeed * (e.clientX - prevX) / canvas.width;
      let deltaAngX = rotationSpeed * (e.clientY - prevY) / canvas.height; 
      camera.rotateX(deltaAngX);
      camera.rotateY(deltaAngY);
      prevX = e.clientX;
      prevY = e.clientY;
  }
}

window.onkeydown = function(e) {
    if(e.code == 'Space') {
        console.log(camera);
    }
    if (e.code == 'KeyW') {
        camera.position = camera.position.add(camera.forward.mul(moveSpeed));
    }
    if (e.code == 'KeyA') {
        camera.position = camera.position.sub(camera.right.mul(moveSpeed));
    }
    if (e.code == 'KeyS') {
        camera.position = camera.position.sub(camera.forward.mul(moveSpeed));
    }
    if (e.code == 'KeyD') {
        camera.position = camera.position.add(camera.right.mul(moveSpeed));
    }
}
