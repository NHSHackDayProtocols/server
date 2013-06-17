var collections;
var http = require("http");

function setCollections(incomingCollections){	
	collections = incomingCollections;
}


function hospitalList(req, res, next){
	collections.hospitals.find().toArray(
	 function(err, docs){
	 	if(!err && docs != null){
	 		res.send(docs);			
	 	}else{
	 		res.send(500);
	 	}
	})
}

function scheduleScraper(){
	setTimeout(function(){
		var spawn = require('child_process').spawn,
	    scraper    = spawn('python', ['./src/services/hospitalScraper.py']);

	    console.log("Starting Scrape");

		scraper.stdout.on('data', function (data) {
		  // console.log('stdout: ' + data);
		});

		scraper.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		});

		scraper.on('close', function (code) {
		  console.log('child process exited with code ' + code);
		});	
	}, 3000)
}

scheduleScraper();


exports.hospitalList = hospitalList;
exports.setCollections = setCollections;