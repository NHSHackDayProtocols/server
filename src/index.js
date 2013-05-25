var restify = require('restify');

var server = restify.createServer({
//  certificate:,
//  key: 
  name: 'ProtocolsApp'
});

server.use(restify.authorizationParser());

console.log(__dirname + '/www');

server.get('/', function indexHTML(req, res, next) {
    fs.readFile(__dirname + '/www/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
}


server.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: __dirname + '/www'
}));

server.listen(4000);