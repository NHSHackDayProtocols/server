var collections;
var http = require("http");

function setCollections(incomingCollections){	
	collections = incomingCollections;
}


function getByName(req, res, next){
	collections.protocols.findOne({hospitalName: req.params.name},
	 function(err, doc){	 	
	 	console.log(doc);
	 	if(!err && doc != null){			
	 		res.send(doc.protocols);
	 	}else{
	 		res.send(500);
	 	}
	})
}

function updateByName(req, res, next){
	jsonDocument = "";
	req.on("data", function(data){
		jsonDocument += data;
	})
	req.on("end", function(){
		jsonDocument = JSON.parse(jsonDocument);
		console.log(jsonDocument);
		collections.protocols.update({hospitalName: jsonDocument.hospitalName},
			{hospitalName: jsonDocument.hospitalName, protocols: jsonDocument.protocols},
			{upsert: true},
		 function(err){	 	
		 	console.log(req.params);
		 	if(!err){			
		 		res.send(200);
		 	}else{
		 		res.send(500);
		 	}
		})	

	})




}

exports.getByName = getByName;
exports.updateByName = updateByName;
exports.setCollections = setCollections;