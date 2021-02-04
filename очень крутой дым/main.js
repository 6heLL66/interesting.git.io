let canvas = document.getElementById('canvas')
let gl = canvas.getContext("webgl", { premultipliedAlpha: true })
canvas.width = window.innerHeight
canvas.height = canvas.width
let img = new Image()
img.src = 'https://i.ibb.co/n6QNSp9/smoke2.png'
img.crossOrigin = "anonymous"
let ismousedown = false
let scaleProportionally=  true
let mousePos
let texture
img.onload = () => {
	console.log(img)
	texture = loadTexture(img)
}
let settingsSmoke = {
	rate: 1,
	color: { r: 0.7, g: 0.7, b: 0.7, a: 0.03 },
	scaleMin: { x: 0.001, y: 0.001 },
	scaleMax: { x: 0.01, y: 0.01 },
	maxVel: { x: 0.00035, y: 0.0025 },
	minVel: { x: 0.00015, y: 0.001 },
	maxLife: 4000,
	minLife: 800,
	minRotVel: 0.006,
	maxRotVel: 0.01,
	minScaleVel: { x: 0.00005, y: 0.00005 },
	maxScaleVel: { x: 0.00085, y: 0.00085 },
	minColorVel: { r: 0, g: 0, b: 0, a: -0.0002 },
	maxColorVel: { r: 0.0, g: 0.0, b: 0.0, a: -0.0001 }
}
let settingsFlame = {
	rate: 4,
	color: { r: 1, g: 1, b: 0, a: 0.5 },
	scaleMin: { x: 0.004, y: 0.004 },
	scaleMax: { x: 0.02, y: 0.02 },
	maxVel: { x: 0.00095, y: 0.0055 },
	minVel: { x: -0.00095, y: 0.0031 },
	maxLife: 500,
	minLife: 200,
	minRotVel: 0.0001,
	maxRotVel: 0.001,
	minScaleVel: { x: 0.00005, y: 0.00005 },
	maxScaleVel: { x: 0.00035, y: 0.00035 },
	minColorVel: { r: 0, g: -0.2, b: 0, a: 0 },
	maxColorVel: { r: 0.0, g: -0.005, b: 0.0, a: 0 }
}





let particles = []



let buffer

function createPosMat3(pos) {
	let arr = [
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		pos.x, -pos.y, 1.0
	]

	return new Float32Array(arr)
}
function createScaleMat3(scale) {
	let arr = [
		scale.x, 0.0, 0.0,
		0.0, scale.y, 0.0,
		0.0, 0.0, 1.0
	]
	return new Float32Array(arr)
}
function createRotMat3(angle) {
	let sin = Math.sin(angle)
	let cos = Math.cos(angle)
	let arr = [
		cos, -sin, 0.0,
		sin, cos, 0.0,
		0.0, 0.0, 1.0
	]

	return new Float32Array(arr)
}
function multMat3(m1, m2) {
	let arr = new Float32Array(9)

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			for (let k = 0; k < 3; k++) {
				arr[i * 3 + j] += m1[i * 3 + k] * m2[k * 3 + j]
			}
		}
	}

	return arr
}

function addParticles(pos, settings) {
	for (let i = 0; i < settings.rate; i++){
		let scaleX = Math.random() * (settings.maxScaleVel.x - settings.minScaleVel.x) + settings.minScaleVel.x
		let obj = {
			pos: { x: pos.x, y: pos.y },
			color: { r: settings.color.r, g: settings.color.g, b: settings.color.b, a: settings.color.a },
			rotation: Math.random() * 6.28319,
			scale: { x: Math.random() * (settings.scaleMax.x - settings.scaleMin.x) + settings.scaleMin.x, y: Math.random() * (settings.scaleMax.y - settings.scaleMin.y) + settings.scaleMin.y},
			vel: { x: Math.random() * (settings.maxVel.x - settings.minVel.x) + settings.minVel.x, y: Math.random() * (settings.maxVel.y - settings.minVel.y) + settings.minVel.y },
			life: Math.random() * (settings.maxLife - settings.minLife) + settings.minLife,
			rotVel: Math.random() * (settings.maxRotVel - settings.minRotVel) + settings.minRotVel,
			scaleVel: { x: scaleX, y: scaleX },
			colorVel: { r: Math.random() * (settings.maxColorVel.r - settings.minColorVel.r) + settings.minColorVel.r, g: Math.random() * (settings.maxColorVel.g - settings.minColorVel.g) + settings.minColorVel.g, b: Math.random() * (settings.maxColorVel.b - settings.minColorVel.b) + settings.minColorVel.b, a: Math.random() * (settings.maxColorVel.a - settings.minColorVel.a) + settings.minColorVel.a}
		}
		particles.push(obj)
	}
}

function loadTexture(image) {
	let texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)

    return texture
}

function getShader(tieblan, type) {
    let shader = gl.createShader(type === "fragment" ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER)

    gl.shaderSource(shader, tieblan)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader))
        return null
    }

    return shader
}
canvas.onmousedown = () => ismousedown = true
canvas.onmouseup = () => ismousedown = false
canvas.onmousemove = (e) => mousePos = { x: e.clientX / canvas.width * 2 - 1, y: e.clientY / canvas.height * 2 - 1 } 


vertexShader = getShader(vertexShader, "daniklox")
fragmentShader = getShader(fragmentShader, "fragment")
let samplerUniform
let shaderProgram
let lightUniform
function initShaders() {
    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders")
    }

    gl.useProgram(shaderProgram)

    let vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "a_position")
    gl.enableVertexAttribArray(vertexPositionAttribute)

    let texturePositionAttribute = gl.getAttribLocation(shaderProgram, "a_texcoord")
    gl.enableVertexAttribArray(texturePositionAttribute)

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(vertexPositionAttribute, 2, gl.FLOAT, false, 16, 0)
    gl.vertexAttribPointer(texturePositionAttribute, 2, gl.FLOAT, false, 16, 8)

    samplerUniform = gl.getUniformLocation(shaderProgram, "u_texture")
    lightUniform = gl.getUniformLocation(shaderProgram, "u_light")
    gl.uniform1i(samplerUniform, 0)
}
function createBuffer() {
	vertices = [
    	1.0, 1.0, 1.0, 1.0,
    	-1.0, 1.0, 0.0, 1.0,
    	1.0, -1.0, 1.0, 0.0,
    	-1.0, -1.0, 0.0, 0.0
	]

	buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
}


let c = 0
function draw(color) {
	gl.viewport(0, 0, canvas.width, canvas.height)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	gl.clearColor(0, 0, 0, 1)
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
	gl.enable(gl.BLEND)

	if(ismousedown === true){
		addParticles(mousePos, settingsFlame)
		addParticles({ x: mousePos.x, y: mousePos.y - 0.06}, settingsSmoke)
	}

	gl.activeTexture(gl.TEXTURE0)
	gl.bindTexture(gl.TEXTURE_2D, texture)
	let pMatrixUniform = gl.getUniformLocation(shaderProgram, "u_matrix")
	for (let i = 0; i < particles.length; i++) {
		let p = particles[i]
		let wMatrix = multMat3(createRotMat3(p.rotation), createScaleMat3({ x: p.scale.x, y: p.scale.y }))

		wMatrix = multMat3(wMatrix, createPosMat3({ x: p.pos.x, y: p.pos.y }))

	    gl.uniformMatrix3fv(pMatrixUniform, false, new Float32Array(wMatrix))

	  	gl.uniform1i(samplerUniform, 0)
	  	gl.uniform4f(lightUniform, p.color.r, p.color.g, p.color.b, p.color.a)

	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

	    //update

	    p.pos.x += p.vel.x
	    p.pos.y -= p.vel.y
	    p.rotation += p.rotVel
	    p.scale.x += p.scaleVel.x
	    p.scale.y += p.scaleVel.y
	    p.life -= 16
	    p.color.a += p.colorVel.a
	    p.color.r += p.colorVel.r
	    p.color.g += p.colorVel.g
	    p.color.b += p.colorVel.b

	    if(p.life <= 0){
	    	particles.splice(i, 1)
	    }

	}
}
createBuffer()
initShaders()
setInterval(draw, 16, { r: 1, g: 0, b: 0, a: 1 })
