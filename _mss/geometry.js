function createSphere(parallelsCount, meridiansCount, radius) {
    let vertices = [];
    for(let i = 0; i <= parallelsCount; ++i) {
        let theta = Math.PI * i / parallelsCount;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
        for(let j = 0; j <= meridiansCount; ++j) {
            let phi = DoublePI * j / meridiansCount;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            
            let nx = cosPhi * sinTheta;
            var ny = cosTheta;
            var nz = sinPhi * sinTheta;
            
            let u = 1 - (j / meridiansCount);
            let v = 1 - (i / parallelsCount);
            vertices.push(radius * nx, radius * ny, radius * nz, u, v, nx, ny, nz);
            
        }
    }
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 
    
    let indices = [];
    for(let i = 0; i < parallelsCount; ++i) {
        for(let j = 0; j < meridiansCount; ++j) {
            var first = i * (meridiansCount + 1) + j;
            var second = first + meridiansCount + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer,
    };
}