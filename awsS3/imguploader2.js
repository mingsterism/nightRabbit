"use strict";

var AWS = require('aws-sdk');
AWS.config.region = 'ap-southeast-1';
var sharp = require('sharp');
var s3bucket = new AWS.S3({params: {Bucket: 'productimages.bucket.1'}});
var request = require('request');

/**
* This function stores images in s3 buffer format after conversion through sharp. 
* @param {string} path - The relative/full path to the image that is locally stored.
* @param {string} imageName - The Key for the aws s3 object.
* @param {string} contentType - The type of image. eg: 'image/jpg'
*/ 
function imageBufferUpload(path, imageName, contentType) {
	var image = sharp(path)
		image.toBuffer(function(err, outputBuffer) {
			if (err) {throw err; }
			console.log(outputBuffer);
			let params = {Key: imageName, ContentType: contentType, Body: outputBuffer}
			s3bucket.upload(params, function(err, data) {
			    if (err) {
			      console.log("Error uploading data: ", err);
			    } else {
			      console.log("Successfully uploaded", imageName,  "data to bucket");
			    }
			});
		})
}

// imageBufferUpload('./image1.jpg', 'csimage1.jpg')
var request = require('request')

function upload(url, key, type) {
	function downloadImageBuffer(url, callback) {
		let params = {
			method: 'GET', 
			uri: url,
			encoding: null
		}
		request(params, function (error, response, body) {
			// body is the decompressed response body
			console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
			console.log('the decoded data is: ', body.length, ' and type is ', typeof body)
			return callback(body);
		})
	}

	downloadImageBuffer(url, function(a) {
		let params = {Key: key, ContentType: type, Body: a}
		s3bucket.upload(params, function(err, data) {
			if (err) {
				console.log('Error uploading data: ', err);
			} else {
				console.log('upload successful');
			}
		})
	})
}

upload('https://upload.wikimedia.org/wikipedia/en/d/d2/Gears_of_War_logo.PNG', 'cs2000', 'image/jpg')