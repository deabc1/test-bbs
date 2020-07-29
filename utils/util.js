var _ = require('./_');
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var bson = mongodb.BSONPure;
var db = null;
// const MongoClient = require('mongodb').MongoClient
// console.log('in ++++');
// var db=null;
mongo.connect('mongodb://localhost:27017/dev', function (err, client) {
  if (err) throw err

  db = client.db('dev')
  _.db=db
  _.event.emit('dbready');
  // db.collection('test').find().toArray(function (err, result) {
  //   if (err) throw err

  //   console.log(result)
  //   console.log('db',db);
   
    
  // })
})

module.exports = _;



