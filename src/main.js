"use strict";
var co = require('co');
var extract = require('./extractors.js');
var amqp = require('amqplib/callback_api');
var broker = require('./rabbit_broker.js');
var JSONB = require('json-buffer')
var Buffer = require('buffer').Buffer;
var C = require('./config.js');
// function BaseSpider() {
// 	this.Nightmare = require('nightmare');
// 	this.nightmare = this.Nightmare({show: true});
// 	// this.dbInstance = actions.dbConnection(config['co99'].DBConfigs);
// 	// this.baseurl = config['co99'].BaseUrl;
// }

// var spider1 = new BaseSpider()


var Nightmare = require('nightmare');
var nightmare = Nightmare({show: false});
var rabbitConn = function() {
	return amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {
			var q = 'hello';
			ch.assertQueue(q, {durable:false});
			return ch
		})
	})
}
// var rabbitSend = co.wrap(function* (data) {
// 	amqp.connect('amqp://localhost', function(err, conn) {
// 		conn.createChannel(function(err, ch) {
// 			var q = 'hello';

// 			ch.assertQueue(q, {durable:false});
// 			ch.sendToQueue(q, new Buffer(data));
// 			console.log(' data has been sent... ');
// 		});
// 		setTimeout(function() {conn.close(); process.exit(0)}, 500);
// 	});
// })



var fn = co.wrap(function* (broker) {
	for (let x = 3200; x < 3210; x++) {
		console.log('initiating now...', x);
		let url = "http://www.amphasisdesign.com/product-detail.php?productid=" + x;
		yield Promise.resolve(nightmare
			.goto(url)
			.wait(0)
			.evaluate(extract.amphasisdesign)
			.then((x) => {
				console.log(x); 
				broker(JSON.stringify(x))})
			.catch((err) => {console.log(err)})
	)};
	yield Promise.resolve(nightmare.end())
	broker.end()
})


// fn(broker.connectBroker).then((x) => {console.log('ended...', x)})


nightmare
	.goto(C.reddit.url)
	.evaluate(extract.extract)
	.then((x) => {
		console.log(x);
		return nightmare.end();
	})
	.then(() => {
		console.log('end...');
	})
