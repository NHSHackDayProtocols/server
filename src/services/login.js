var collections;

function setCollections(incomingCollections){	
	collections = incomingCollections;
}


function login(req, res, next){
	console.log(req.params);
	collections.users.findOne({user: req.authorization.basic.username,
		pass: req.authorization.basic.password}
		, function(err, doc){
		if(!err && doc != null){
			res.send(200);
		}else{
			res.send(500);
		}
	});
}


exports.login = login;
exports.setCollections = setCollections;
