var collections;
function setCollections(incomingCollections){	
	collections = incomingCollections;
}

function start(callback){

	var loginService = require('./services/login');
	loginService.setCollections(collections);

	var hospitalList = require('./services/hospitalList');
	hospitalList.setCollections(collections);

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

	server.post('/services/hello', function create(req, res, next) {
	  res.send(201, Math.random().toString(36).substr(3, 8));
	  return next();
	});

	server.post('/services/login', loginService.login);

	// server.get('/hello/:name', send);
	// server.head('/hello/:name', send);
	// server.del('hello/:name', function rm(req, res, next) {
	//   res.send(204);t
	//   return next();
	// });

	server.listen(4000);
}

exports.start = start;
exports.setCollections = setCollections;