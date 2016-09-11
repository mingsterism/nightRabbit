var co = require('co'); 

 exports.dbConnection = function(D) {
  return co(function* () {
    const MongoClient = require('mongodb').MongoClient
    const url = 'mongodb://' + D.ip + ':' + D.port + '/' + D.dbName;
    var db = yield MongoClient.connect(url);
    console.log('connection to db successful...');
    return {
      db: db, 
      D: D
    }
  })
}


exports.dbExecute = function(x, DI) {
    var fn = co.wrap(function*(DI) {
      var DI = yield Promise.resolve(DI)
      var col = DI.db.collection(DI.D.collection);
      if (x.constructor == Array) {
        try {
          console.log('inserting Array data now...');
          var r = yield col.insertMany(x);
        } catch(e) {
          console.log('there was error at database Insertion...');
          console.log(e);
          }
      } else if (x.constructor == Object) {
        try {
          console.log('inserting Object data now...');
          var r = yield col.insert(x);
        } catch(e) {
          console.log('there was error at database Insertion...');
         console.log(e)
          }
      } else {
        console.error("Please send data as either Object or Array type");
      }
      return db
    })
    fn(DI);
  }