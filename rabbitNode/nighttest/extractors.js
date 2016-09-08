"use strict";

exports.amphasisdesign = function() {
	function tryit(x) {
		try {
			return x()
		} catch(e) {
			// just continue
			console.log('there was error. just do nothing')
		}
	}
	var obj = {}
	tryit(() => {
		const productImg = document.getElementsByTagName('img')[0].src
		obj['productImg'] = productImg;
	})
	tryit(() => {
		const productDesc = document.getElementsByTagName('img')[0].alt
		obj['productDesc'] = productDesc
	})
	const productDetails = document.getElementsByTagName('div');
	for (let x of productDetails) {
		var string = x.innerText.split(':');
		strs = string[0].trim()
		try {
			obj[strs] = string[1].trim();
		} catch(e) {};
	}
	return obj;

}
