### This is the Echo/Proxy Server project

#### Starting the server

```
npm install
bodemon index.js  [options]
```


####Options

```
--host : destination server or echo server
--port : default to 8000 if 127.0.0.1, otherwise, 80
--log  : log to a specified file
--url  : echo from content of url specified

```

####Usage

```
Use curl command to test the server.  While the servers are running, open up another terminal and issue:

	1. test the Echo server:

		curl -v -X POST http://127.0.0.1:8000 -d "hello self" -H "x-asdf: yodawg"

	2.
		curl -v http://127.0.0.1:8001/asdf -d "hello proxy"

```

#### Demo
![](walkthrough.gif)
