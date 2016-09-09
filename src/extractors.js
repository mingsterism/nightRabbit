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
	var results = {}
	tryit(() => {
		const productImg = document.getElementsByTagName('img')[0].src
		results['productImg'] = productImg;
	})
	tryit(() => {
		const productDesc = document.getElementsByTagName('img')[0].alt
		results['productDesc'] = productDesc
	})
	const productDetails = document.getElementsByTagName('div');
	for (let x of productDetails) {
		var string = x.innerText.split(':');
		strs = string[0].trim()
		try {
			results[strs] = string[1].trim();
		} catch(e) {};
	}
	return results;
}

exports.extract = function() {
	const title = Array.from(document.querySelectorAll('#siteTable div.entry.unvoted a.title'));
	return title.map((x) => {
		return x.innerText
	})
}
