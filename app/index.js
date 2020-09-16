'use strict';

const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('<h1>Hello from pure NodeJS</h1>');
  })
  .listen(80, () => {
    console.log('Server is listening on port 3000');
  });
