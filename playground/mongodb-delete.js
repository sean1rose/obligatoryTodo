const { MongoClient, ObjectID } = require('mongodb');

// CONNECT + DELETE

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Users').deleteMany({name: 'Mike'}).then((result) => {
  //   console.log('result - ', result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log('result - ', result);
  // });

  

  // findOneAndDelete (returns the deleted one)
  db.collection('Users').findOneAndDelete({age: 33}).then((result) => {
    console.log('result - ', JSON.stringify(result, undefined, 2));
  });

  // db.close()
});