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
var rabbitConn = co.wrap(function* () {
	var open = require('amqplib').connect('amqp://localhost');
	var q = 'hello';
	yield Promise.resolve(open
		.then(function(conn) {
			return conn.createChannel();
		})
		.then(function(ch) {
			return ch.assertQueue(q, {durable:false})
				.then(function(ok) {
					console.log('sending message now...')
					return ch.sendToQueue(q, new Buffer('something to do'));
				})
				.then((result) => {
					console.log('message has been sent', result); 
					return ch;
					// setTimeout(function() {ch.close(); process.exit(0)}, 500);  // <<<<< this works. but it closes within the function
			})
		})
		.catch(console.warn))
})

rabbitConn().then((ch) => {console.log(ch)})  // <<<<  want to close it here. but ch is 'undefined'
// rabbitConn().then((ch) => {
// 	Promise.resolve(rabbitConn.close())  // this does not register.. the program will just remain and not close
// 	.then(() => {console.log('message sent')})
// 	.catch((e) => {console.log(e)})  
// })
// 	console.log(x);
// 	console.log('message sent...')}

// var open = require('amqplib').connect('amqp://localhost');
// var q = 'hello'
// open.then(function(conn) {
// 	return conn.createChannel();
// })
// .then(function(ch) { // <<<<<<<<<< this ch does not get passed down. this is the right ch
// 	return ch.assertQueue(q, {durable:false})
// 	.then(function() {
// 		console.log('sending message now...')
// 		return ch.sendToQueue(q, new Buffer('this is the data data'));
// 	})
// 	.then((result) => {
// 		console.log('message sent: ', result) 
// 		console.log('closing channel now...')
// 		return ch.close()
// 		})  // <<<<<<<<<<<<<  need to pass here
// })
// .then(function(ch) {
// 	console.log('message is ready........')
	// console.log(ch);
	// ch.close();   // <<<<<<<<<<<   I intend to close here but unable to do so as ch undefined
	// process.exit(0)
// })

