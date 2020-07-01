
	(function(){
		socket = io.connect('http://localhost:8000');
		socket.on("connect" , function(){
			console.log("Подключение установлено");
		})
	})();
