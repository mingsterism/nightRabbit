// var JSONB = require('json-buffer')
// var Buffer = require('buffer').Buffer

// var obj1 = { Code: 'FPP1000',
//   'Colour Available': '',
//   Material: 'Plastic',
//   Name: 'Gablex Ball Pen',
//   Size: '1cm(W) x 14.5cm(H)',
//   productDesc: 'FPP1000,Gablex Ball Pen',
//   productImg: 'http://www.amphasisdesign.com/userfiles/pictures/3208/box/5686.jpg' 
// }

// console.log( obj1)
// var buffObj = new Buffer(JSON.stringify(obj1))
// console.log(buffObj);
// var abc = JSON.parse(buffObj)
// console.log(typeof abc);
var arr1 = []
arr1['code'] = 'Hello'
arr1['Color'] = 'Yello', 
arr1['name'] = 'james'
console.log(arr1)
console.log(arr1.constructor)

var names = {name1: "james", name2: "jenny", name3: "oscar"}
console.log(names.constructor)

// var C = require('./config.js');
// console.log(C.reddit)
// var obj = {}
// for (let x in C.reddit) {
// 	obj[x] = C.reddit[x]
// }

// console.log(obj)

// var db = require('./config.json')
// console.log(db['mongoDB'])

