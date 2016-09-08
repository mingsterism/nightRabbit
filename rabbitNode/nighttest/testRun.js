"use strict";
// var actions = require('../actions1.js')
var co = require('co');
// var config = require('../configs.json')
var extract = require('./extractors');



// function BaseSpider() {
// 	this.Nightmare = require('nightmare');
// 	this.nightmare = this.Nightmare({show: true});
// 	// this.dbInstance = actions.dbConnection(config['co99'].DBConfigs);
// 	// this.baseurl = config['co99'].BaseUrl;
// }

// var spider1 = new BaseSpider()


var Nightmare = require('nightmare');
var nightmare = Nightmare({show: false});


var fn = co.wrap(function* () {
	for (let x = 3200; x < 3210; x++) {
		console.log('initiating now...', x);
		let url = "http://www.amphasisdesign.com/product-detail.php?productid=" + x;
		yield Promise.resolve(nightmare
			.goto(url)
			.wait(0)
			.evaluate(extract.amphasisdesign)
			.then((x) => {console.log(x)})
			.catch((err) => {console.log(err)})
	)};
		yield Promise.resolve(nightmare.end())
})


fn().then((x) => {console.log('ended...', x)})