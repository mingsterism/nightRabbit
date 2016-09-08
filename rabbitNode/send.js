var amqp = require('amqplib');
var co = require('co');
// amqp.connect('amqp://localhost', function(err, conn) {
// 	conn.createChannel(function(err, ch) {
// 		var q = 'hello';

// 		ch.assertQueue(q, {durable:false});
// 		for (var x = 0; x < 10; x++) {
// 			ch.sendToQueue(q, new Buffer('hey whats up bro', x));
// 			console.log(' data has been sent... ');
// 		}
// 	});
// 	setTimeout(function() {conn.close(); process.exit(0)}, 500);
// });

// var rabbitConn = co.wrap(function* () {
// 	var open = yield Promise.resolve(amqp.connect('amqp://localhost'));
// 	open
// 		.then(function(conn) {
// 			return conn.createChannel();
// 		})
// 		.then(function(ch) {
// 			return ch.assertQueue('hello').then(function(ok) {
// 				return ch.sendToQueue('hello', new Buffer('something to do'));
// 			});
// 		})
// 		.catch(console.warn);
// })

// rabbitConn(
 
 
// Publisher 
// this script works. it sends the message through. however, it will not close. 
// var rabbitConn = co.wrap(function* () {
// 	var open = require('amqplib').connect('amqp://localhost');
// 	var q = 'hello';
// 	yield Promise.resolve(open.then(function(conn) {
// 		  return conn.createChannel();
// 		})
// 		.then(function(ch) {
// 		  return ch.assertQueue(q, {durable:false}).then(function(ok) {
// 		    return ch.sendToQueue(q, new Buffer('something to do'));
// 		  })
// 		})
// 		.catch(console.warn))
// })
// rabbitConn().then((x) => {
// 	Promise.resolve(rabbitConn.close())  // this does not register.. the program will just remain and not close
// 	.then(() => {console.log('message sent')})
// 	.catch((e) => {console.log(e)})  
// })
	// console.log(x);
	// console.log('message sent...')})

var open = require('amqplib').connect('amqp://localhost');
var q = 'hello'
open.then(function(conn) {
	return conn.createChannel();
})
.then(function(ch) { // <<<<<<<<<< this ch does not get passed down. this is the right ch
	return ch.assertQueue(q, {durable:false})
	.then(function() {
		// ch.close()  // <<<<< this closes the channel. the ch here is received...
		return ch.sendToQueue(q, new Buffer('some data'));
	})
	.then((ch) => {console.log(ch); return ch})  // <<<<<<<<<<<<<  need to pass here
})
.then(function(ch) {
	console.log('message')
	console.log(ch);
	// ch.close();   // <<<<<<<<<<<   I intend to close here but unable to do so as ch undefined
	// process.exit(0)
})

