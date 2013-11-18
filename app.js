var http = require("http");
var requests = [];

function onRequest(request, response) {
	requests.push(response);
}

http.createServer(onRequest).listen(8888);

setInterval(function() {
	// respond to each request
	var dTime = new Date();
        var serverTimeString =
		(dTime.getHours()).slice(-2) + ':' +
		(dTime.getMinutes()).slice(-2) + ':' +
	        (dTime.getSeconds()).slice(-2));
	while (requests.length) {
		response = requests.shift();
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.write(serverTimeString);
		response.end();
	}
}, 100);
