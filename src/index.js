var restify = require('restify');

var server = restify.createServer({
//  certificate:,
//  key: 
  name: 'ProtocolsApp'
});

server.use(restify.authorizationParser());

console.log(__dirname + '/www');

server.get(/^(?!services).*$/, restify.serveStatic({
  directory: __dirname + '/www',
  default: "index.html",
  maxAge: 1
}));



server.listen(4000);