'use strict';

const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('<h1>Hello! This is Zakir H. with my Final Project.</h1>');
  })
  .listen(80, () => {
    console.log('Server is listening on port 80');
  });
