
const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;


    if (url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>My First Page</title></head>');
        response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        response.write('</html>');
        return response.end();
    }


    response.statusCode =404
    return response.end('<h1>Page not foutd</h1>');

});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});