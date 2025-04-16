
const http = require('http');
const fs = require('fs');
const { exit } = require('process');


const server = http.createServer((req, res) => {

    console.log(req);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'Node.js');
    res.statusCode = 200;

    
    return res.end(); 

});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});