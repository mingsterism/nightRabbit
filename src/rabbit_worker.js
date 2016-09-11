"use strict";

var amqp = require('amqplib/callback_api');
var awsUpload = require('./awsImgUploader.js');
var C = require('./config.json');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      let output = JSON.parse(msg.content)
      let imgUrl = output['productImg']
      let productDesc = output['productDesc']
      awsUpload.imgUrlUpload(imgUrl, productDesc, 'image/jpg')
      ch.ack(msg);
    }, {noAck: false});
  });
});