class Camera {
    constructor(pos, forward, up) {
        this.position = pos;
        this.forward = vec3.norm(forward);
        this.up = vec3.norm(up);
        this.viewMatrix = new mat4();
        this.rotationMatrix = new mat4();
        this.update();
    }
    get right() {
        return this.viewMatrix.right;
    }
    update() {
        mat4.LookAt(this.viewMatrix, this.position, this.position.add(this.forward), this.up);
    }
    rotateX(dAngX) {
        mat4.RotationX(this.rotationMatrix, dAngX); 
        this.forward = this.rotationMatrix.transformDirection(this.forward);
        //this.up = this.rotationMatrix.transformDirection(this.up);
    }
    rotateY(dAngY) {
        mat4.RotationY(this.rotationMatrix, dAngY); 
        this.forward = this.rotationMatrix.transformDirection(this.forward);
        //this.up = this.rotationMatrix.transformDirection(this.up);
    }
    setPosition(pos) {
        this.position = pos; 
    }
    
}