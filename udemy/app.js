const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
});

const port = process.env.PORT || 3000;

server.listen(port);
