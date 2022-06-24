const http = require('http');

http.createServer((req, res) => {
    console.log('Server run on port 8000');
}).listen(8000);

console.log('Hello');