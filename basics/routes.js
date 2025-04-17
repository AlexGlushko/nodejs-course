const fs = require('fs');


const requestHandler = (request, response) => {
    const url = request.url;
    const method = request.method;


    if (url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>My First Page</title></head>');
        response.write('<body><form action="/message" method="POST"><input name="message" type="text"></input><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    return response.end('Error writing file');
                }
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            });
            
        });
    }


    response.statusCode =404
    return response.end('<h1>Page not foutd</h1>');
}

module.exports = {
    handler: requestHandler,
};