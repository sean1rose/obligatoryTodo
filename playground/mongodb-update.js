const { MongoClient, ObjectID } = require('mongodb');

// CONNECT + DELETE

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // toggle completed to true
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58904337ec52b03af591edbf')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('588dae095d2ac4270fc8ac6e')
  }, {
    $set: {
      name: "John"
    },
    $inc: {
      age: +1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  // db.close()
});