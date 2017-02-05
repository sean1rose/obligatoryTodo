// const MongoClient = require('mongodb').MongoClient;
// can call connect on MongoClient to conenct to db
const { MongoClient, ObjectID } = require('mongodb');


// CONECT + INSERT

// 1st arg - string - url where db lives (w/ prod it would be a heroku url, in dev - it's local port - 27017) [port + / + db we want to connect to (don't use default test one, but create a new one)]
// 2nd arg - callback func fires after connection succeeds/fails (2nd arg is db obj which can use to make db commands)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // 2 collections in this app - users collection and todos collection


    // don't need to explicitly create the collection 1st
    // .collection -> takes string name of collection u want to insert into
      // insertOne - lets u insert a new document into your collection (obj w/ key-value pairs + callback func are the arguments)
  /*
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert todo - ', err);
    }
    // RESULT.OPS == all documents inserted into collection (in this case just 1, since it's insertOne)
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  */
  // insert document into Users collection
  db.collection('Users').insertOne({
    name: 'Sean',
    age: 25,
    location: 'LA'
  }, (err, result) => {
    if (err) { return console.log('unable to inser user into collection')}
    console.log(result.ops[0]._id.getTimestamp());
  });

  // closes connection
  db.close()
})