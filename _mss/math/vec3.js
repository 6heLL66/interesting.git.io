class vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get sqrlen() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    add(v) {
        return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(s) {
        return new vec3(this.x * s, this.y * s, this.z * s);
    }
    div(s) {
        return new vec3(this.x / s, this.y / s, this.z / s);
    }
    divv(v) {
        return new vec3(this.x / v.x, this.y / v.y, this.z / v.z);
    }
    mulv(v) {
        return new vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    
    static norm(v) {
        let k = 1.0 / v.length;
        return new vec3(v.x * k, v.y * k, v.z * k);
    } 
    static inv(v) {
        return new vec3(v.x, v.y, v.z);
    }
    
    static fromScalar(s) {
        return new vec3(s, s, s);
    }
    
    static zero() {
        return new vec3(0.0, 0.0, 0.0);
    }
    static unitX() {
        return new vec3(1.0, 0.0, 0.0);
    }
    static unitY() {
        return new vec3(0.0, 1.0, 0.0);
    }
    static unitZ() {
        return new vec3(0.0, 0.0, 1.0);
    }
}                                   