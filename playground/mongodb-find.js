const { MongoClient, ObjectID } = require('mongodb');

// CONNECT + FIND

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // find() retrieves all documents cursor (not based on certain values)
    // find({completed: true}) w/ an obj {} is a query-based find
  // toArray() converts from cursor to array of documents (returns a promise)
  // db.collection('Todos').find({
  //   _id: new ObjectID('588da8aa88fa2322d15b0090')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count ${count}`);
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Sean'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    db.collection('Users').find({name: 'Sean'}).count().then((count) => {
      console.log(`There are ${count} number of Seans in the db`);
    });
  });

  // db.close()
});