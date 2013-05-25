var mongo = require("./source/mongo");
var restifyServer = require("./restify");

mongo.start(function(){
  //restifyServer.collections = mongo.collections;
  restifyServer.setCollections(mongo.collections);
  restifyServer.start(function(){
    console.log("started")
  })
})