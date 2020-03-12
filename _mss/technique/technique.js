const TECHNIQUE_SHADER_GLSL_VERSION_PREFIX = "#version 300 es\n";
class Technique {
    constructor() {
        this.program = gl.createProgram();  
        this.shaders = [];
    }
    AddShader(type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, TECHNIQUE_SHADER_GLSL_VERSION_PREFIX + source);
        gl.compileShader(shader); 
        console.debug(type, gl.getShaderInfoLog(shader));      
        gl.attachShader(this.program, shader);    
        this.shaders.push(shader);
    }
    Link() {
        gl.linkProgram(this.program);
        let err = gl.getError(); 
        if(err !== gl.NO_ERROR) { console.error(err); }
        for(let i = 0; i < this.shaders.length; i++) {
            gl.deleteShader(this.shaders[i]);
        }
        this.shaders.length = 0;
    }
    Use() {
        gl.useProgram(this.program);
    }
    GetUniformLocation(uniformName) {
        return gl.getUniformLocation(this.program, uniformName);
    }
    GetAttribLocation(attribName) {
        return gl.getAttribLocation(this.program, attribName);
    }
}