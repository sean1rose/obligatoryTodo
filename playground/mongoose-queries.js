const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// mongoose queries
// http://mongoosejs.com/docs/queries.html

var id = '589450d5a8a851e2347f70d6';
// var id = '689450d5a8a851e2347f70d611';


// returns true if valid (use to validate id)
// ObjectId.isValid

if (!ObjectID.isValid) {
  // checks whether obj id is not valid
  console.log('ID not valid');
}

/*
  // find -> allows u to query as many as u like (no args), or can query for a specific id or anything else
    // can just pass in the id as the query
      // if no match -> will return empty array
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos - ', todos);
});

// findOne -> grabs first match of query...
  // use this if need just one match and searching by something other than id
  // if no match -> returns null
Todo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }
  console.log('todo match - ', todo);
});

// findById -> don't have to make query object
// if no match -> returns null
  // use catch if object id isn't just invalid, but has extra digits
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }
  console.log('Todo - ', todo);
}).catch((e) => console.log(e))
*/


var userId = '5892fb0a195787fc118b8bf8';
// query users collection
// userId
  // case where query works but no user ->
  // case where user found -> print
  // catch -> print error obj
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('user not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log('error - ', e));