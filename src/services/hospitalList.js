var collections;
var http = require("http");

function setCollections(incomingCollections){	
	collections = incomingCollections;
}


function hospitalList(req, res, next){
	res.writeHead(200);
	http.get("http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=uk_nhs_hospitals&query=select%20name%20from%20%60swdata%60",
		function(getres){
			getres.pipe(res);	
		});
}


exports.hospitalList = hospitalList;
exports.setCollections = setCollections;