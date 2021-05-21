var http = require('http');
var fs = require('fs');
var path = require('path');

//var url = require('url');

const avalPath = "/avalanche";

http.createServer(function (req, res) {
    //  console.log(req);
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
    }).on('end', () => {
        console.log(req.url);
        req.url = req.url.substring(avalPath.length);
        if (req.url === "\/avalanche\/") {
            fs.readFile("./docs/index.html", "UTF-8", function (err, html) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            });
        } else if (req.url.match("\.css$")) {
            var cssPath = path.join(__dirname, 'docs', req.url);
            var cssFileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { "Content-Type": "text/css" });
            cssFileStream.pipe(res);
        } else if (req.url.match("\.js$")) {
            var jsPath = path.join(__dirname, 'docs', req.url);
            var jsFileStream = fs.createReadStream(jsPath, "UTF-8");
            res.writeHead(200, { "Content-Type": "text/script" });
            jsFileStream.pipe(res);
        } else if (req.url.match("\.png$")) {
            var pngImagePath = path.join(__dirname, 'docs', req.url);
            var pngFileStream = fs.createReadStream(pngImagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            pngFileStream.pipe(res);
        } else if (req.url.match("\.gif$")) {
            var gifImagePath = path.join(__dirname, 'docs', req.url);
            var gifFileStream = fs.createReadStream(gifImagePath);
            res.writeHead(200, { "Content-Type": "image/gif" });
            gifFileStream.pipe(res);
        } else/* if (req.url.match("\.html$")) */ {
            var htmlPath = path.join(__dirname, 'docs', req.url);
            console.log(htmlPath);
            if (!htmlPath.endsWith(".html")) {
                if (htmlPath.endsWith("/")) {
                    htmlPath.substring(0, htmlPath.length - 1);
                }
                htmlPath += ".html";
            }

            fs.readFile(htmlPath, "UTF-8", function (err, html) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            });
        }/* else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("No Page Found");
        }*/
    });
}).listen(8080);

//https://nodejs.org/api/http.html#http_http_get_options_callback