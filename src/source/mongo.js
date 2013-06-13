var collections = {};

function start(callback){
	var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server("localhost", {port: 27017});
    db_connector = new mongodb.Db("protocols", mongoserver, {w:1, journal: true});
    path = require("path");
    db_connector.open(function(err, db){
    db.createCollection("users", function(err, users){
	        collections.users = users;
	        db.createCollection("protocols", function(err, protocols){
	        	collections.protocols = protocols;
	        	db.createCollection("hospitals", function(err, hospitals){
		        	collections.hospitals = hospitals;
		        	callback();
		    	}); 
	    	}); 
		}); 
	});	
}


exports.collections = collections;
exports.start = start;