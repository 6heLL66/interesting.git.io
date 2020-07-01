const express 	= require('express')
const app 		= express()
const port 		= 8000
var server  	= require('http').createServer(app);
var io			= require('socket.io').listen(server)


app.get('/', (request, response) => {
    response.sendFile('index.html',{root : __dirname})
})

app.get('/game', (request, response) => {
    response.sendFile('game.html',{root : __dirname})
})

app.use('/public',express.static('public'));



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})


io.sockets.on('connection',(socket) => {
		let clientIp = (socket.request.connection.remoteAddress).slice(7)
		console.log(1);
		console.log("New client connected with : " , clientIp)
})