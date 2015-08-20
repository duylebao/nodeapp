let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv;
let scheme = 'http://'; 
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80);
let destinationUrl = argv.url || scheme + argv.host + ':' + port;

let http = require('http');
let request = require('request');

let path = require('path');
let fs = require('fs');
let logPath = argv.log && path.join(__dirname, argv.log);
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout;

http.createServer((req, res) => {
    console.log('Request received at: ' + req.url);
    req.pipe(res);
    for (let header in req.headers) {
    	res.setHeader(header, req.headers[header]);
	}
    logStream.write('Request headers: ' + JSON.stringify(req.headers));
    req.pipe(logStream, {end: false});
}).listen(8000);


http.createServer((req, res) => {
  	console.log('Proxying request to: ' + destinationUrl + req.url );
    let options = {
        headers: req.headers,
        url: destinationUrl + req.url
    }

    options.method = req.method;

	let downstreamResponse = req.pipe(request(options));
	process.stdout.write(JSON.stringify(downstreamResponse.headers));
	downstreamResponse.pipe(process.stdout);
	downstreamResponse.pipe(res);
}).listen(8001);
