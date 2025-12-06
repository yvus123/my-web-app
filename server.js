const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
        filePath = "./index.html"; 
    }

    const ext = String(path.extname(filePath)).toLowerCase();

    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end("Page not found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
