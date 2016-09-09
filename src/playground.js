var JSONB = require('json-buffer')
var Buffer = require('buffer').Buffer

var obj1 = { Code: 'FPP1000',
  'Colour Available': '',
  Material: 'Plastic',
  Name: 'Gablex Ball Pen',
  Size: '1cm(W) x 14.5cm(H)',
  productDesc: 'FPP1000,Gablex Ball Pen',
  productImg: 'http://www.amphasisdesign.com/userfiles/pictures/3208/box/5686.jpg' 
}

console.log( obj1)
var buffObj = new Buffer(JSON.stringify(obj1))
console.log(buffObj);
var abc = JSON.parse(buffObj)
console.log(typeof abc);
// var arr1 = []
// arr1['code'] = 'Hello'
// arr1['Color'] = 'Yello', 
// arr1['name'] = 'james'
// console.log(arr1)

var C = require('./config.js');
console.log(C.reddit)
var obj = {}
for (let x in C.reddit) {
	obj[x] = C.reddit[x]
}

console.log(obj)