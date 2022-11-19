const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const directoryName = '.'; // root directory
const root = path.normalize(path.resolve(directoryName));

console.log(root);

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};

const port = 8000; // port

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    fs.readFile(root + req.url, (err, data) => {
        let pathname = path.join(root, path.normalize(parsedUrl.pathname));
        const ext = path.parse(pathname).ext;
        if (err) {
            res.writeHead(404, { 'Content-Type': mimeType[ext] });
            res.end('404: File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': mimeType[ext] });
            res.end(data);
        }
    });
}).listen(port);
