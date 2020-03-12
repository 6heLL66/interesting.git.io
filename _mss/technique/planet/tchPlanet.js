class tchPlanet extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchPlanet_frag);
        super.AddShader(gl.VERTEX_SHADER, tchPlanet_vert);
        super.Link();
        this.locationMatrix = super.GetUniformLocation("uMatrix");
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.locationPosition = super.GetAttribLocation("vPosition");
        this.locationTexCoords = super.GetAttribLocation("vTexCoords");
        this.locationNormal = super.GetAttribLocation("vNormal");
        this.stride = 4 * (3 + 2 + 3);
        this.offsetPosition = 0;
        this.offsetTexCoords = 4 * 3;
        this.offsetNormal = 4 * (3 + 2);
        console.log(this);
    }
    Use(matrix, sunPosition) {
        super.Use();
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
        gl.uniform3f(this.locationSunPosition, sunPosition.x, sunPosition.y, sunPosition.z);
    }
    SetupAttributes() {
        gl.enableVertexAttribArray(this.locationPosition); 
        gl.vertexAttribPointer(this.locationPosition, 3, gl.FLOAT, false, this.stride, this.offsetPosition);
        gl.enableVertexAttribArray(this.locationTexCoords); 
        gl.vertexAttribPointer(this.locationTexCoords, 2, gl.FLOAT, false, this.stride, this.offsetTexCoords);
        gl.enableVertexAttribArray(this.locationNormal); 
        gl.vertexAttribPointer(this.locationNormal, 3, gl.FLOAT, false, this.stride, this.offsetNormal);
    }
    DisableAttributes() {
        gl.disableVertexAttribArray(this.locationPosition); 
        gl.disableVertexAttribArray(this.locationTexCoords); 
        gl.disableVertexAttribArray(this.locationNormal); 
    }
}