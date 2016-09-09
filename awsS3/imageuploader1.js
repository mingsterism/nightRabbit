var Upload = require('s3-uploader');

var client = new Upload('productimages002.merchandise', {
  aws: {
    path: 'testimages/',
    region: 'ap-southeast-1',
    acl: 'public-read',
    accessKeyId: 'AKIAI5KCIKJDTZCGD6SA', 
    secretAccessKey: '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'
  },

  cleanup: {
    versions: true,
    original: false
  },

  original: {
    awsImageAcl: 'private'
  },

  versions: [{
    maxWidth: 320,
    aspect: '16:9!h',
    suffix: '-small'
  },{
    maxHeight: 100,
    aspect: '1:1',
    format: 'png',
    suffix: '-thumb1'
  },{
    maxHeight: 250,
    maxWidth: 250,
    aspect: '1:1',
    suffix: '-thumb2'
  }]
});

// var imgUrl = ''
client.upload('./image1.jpg', {}, function(err, versions, meta) {
  if (err) { throw err; }

  versions.forEach(function(image) {
    console.log(image.width, image.height, image.url);
    // 1024 760 https://my-bucket.s3.amazonaws.com/path/110ec58a-a0f2-4ac4-8393-c866d813b8d1.jpg
  });
});