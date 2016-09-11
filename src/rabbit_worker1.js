"use strict";

var amqp = require('amqplib/callback_api');
// var awsUpload = require('./awsImgUploader.js');
var C = require('./config.json');
var md = require('./rabbit_mongo.js');
var mdConn = md.dbConnection(C['mongoDB'])
console.log(mdConn);

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
  	var q1 = 'mongo_queue'  
  	ch.assertQueue(q1, {durable: true});
  	ch.prefetch(1);
  	console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q1);
  	ch.consume(q1, function(msg) {
  		var data = JSON.parse(msg.content);
	    // console.log('-----------------------------------------------------------------', JSON.stringify(JSON.parse(msg.content)));
	    md.dbExecute(data, mdConn)
	    ch.ack(msg);
  	}, {noAck: false});
  });
});