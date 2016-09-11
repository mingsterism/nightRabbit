var amqp = require('amqplib/callback_api');


exports.connectBroker = function(msg) {
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q1 = 'task_queue';
	    ch.assertQueue(q1, {durable: true});
	    ch.sendToQueue(q1, new Buffer(msg), {persistent: true});
	    console.log("Data sent to queue: '%s'", q1);

	    var q2 = 'mongo_queue';
	    ch.assertQueue(q2, {durable: true});
	    ch.sendToQueue(q2, new Buffer(msg), {persistent: true});
	    console.log('Data sent to queue: ', q2)
	  });
	});
}

