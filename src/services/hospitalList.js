var collections;
var http = require("http");

function setCollections(incomingCollections){	
	collections = incomingCollections;
}


function hospitalList(req, res, next){
	// var hospitalList = "";

	// res.writeHead(200, {'content-type': 'application/json'});
	// http.get("http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=uk_nhs_hospitals&query=select%20name%2C%20lat%2C%20lng%20from%20%60swdata%60",
	// 	function(getres){
	// 		getres.on("data", function(data){
	// 			hospitalList += data;
	// 		})
	// 		getres.on("end", function(){
	// 			var hospitalListObject = JSON.parse(hospitalList);
	// 			var dateTimeStamp = new Date().getTime();
	// 			for (var i = 0; i < 3; i++) {
	// 				hospitalListObject[i].dateModified = dateTimeStamp;					
	// 			};
	// 			for (var i = 3; i < hospitalListObject.length; i++) {
	// 				hospitalListObject[i].dateModified = 0;					
	// 			};
	// 			res.write(JSON.stringify(hospitalListObject));
	// 			res.end();
	// 		})
	// 	});

	collections.hospitals.find().toArray(
	 function(err, docs){
	 	if(!err && docs != null){
	 		res.send(docs);			
	 	}else{
	 		res.send(500);
	 	}
	})
}


exports.hospitalList = hospitalList;
exports.setCollections = setCollections;