const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// mongoose methods: 
  // Todo.remove({})
  // Todo.findOneAndRemove({})
  // Todo.findByIdAndRemove('id')

Todo.remove({}).then((result) => {
  console.log(result);
});

use this if need to query based on something other than id
Todo.findOneAndRemove({_id: '5896a179de48dbd4f12d6d98'}).then((todo) => {
  console.log(todo);
});


ƒind by id and remove and return
Todo.findByIdAndRemove('5896a179de48dbd4f12d6d98').then((todo) => {
  console.log(todo);
});