// library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

// local imports
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

// mongodb uri:
// mongodb://heroku_lptdfbfk:85vea6g2flpafe1kemvh6gl4t8@ds143449.mlab.com:43449/heroku_lptdfbfk

// heroku app name: dry-dawn-37807

const port = process.env.PORT || 3000;

var app = express();

// MIDDLEWARE = bodyParser.json() function
// bodyParser takes [json body data] that was passed from the client and converts it to an object and attaches it to the request object (request.body)
  // allows you to send json data and then access it in route handlers via 'req.body'
app.use(bodyParser.json());
// can now send json to express app (can access it in route-callback functions)


// CONFIGURE ROUTES / ENDPOINTS

// POST /todos
  // send resouce as body -> send (json object) w/ text property to server
  //  server will create new model, then send that completed model (id + properties) back to client
// app.post(url, callback)
app.post('/todos', (req, res) => {
  // POST HANDLER callback func -> create the todo using the info passed from the user on request.body
  // create todo from request data
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  });
  // save todo to mongodb using mongoose
  todo.save().then((doc) => {
    // send the saved doc back to the user in response
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
// Can test ^ this post todo endpoint using postman


// GET /todos route handler...
app.get('/todos', (req, res) => {
  // grab all todos from db
  Todo.find().then((todos) => {
    // send it back as an obj rather than array, for more flexibility to modify/add properties
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});


// GET individual /todos/:id
  // need to use a URL PARAMATER (:id) -> allows us to query by id passed in
  // http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js
app.get('/todos/:id', (req, res) => {
  // need to use _ off of req obj (req.params === {"id": "123"})
  // can access url parameter using 'req.params.id'
  var id = req.params.id;
  
  // validate id using 'isValid'
  if (!ObjectID.isValid(id)){
    // if not valid -> return out w/ a 404, send back empty body
    return res.status(404).send();
  } else {
    // if valid, query db using findById looking for matching doc
    Todo.findById(id).then((todo) => {
      if (!todo){
        // if no todo -> (call succeeded by id not found in collection) -> send back 404 w/ empty body
        return res.status(404).send();
      }
      // if success..
        // if todo -> send it back, as an obj w/ todo property...
     res.send({todo});
    }).catch((e) => {
      // if error -> send back 400, saying request not valid + send back nothing
      res.status(400).send();
    });
  }
});


// ROUTE TO DELETE TODOS
app.delete('/todos/:id', (req, res) => {
  // use req obj params
  // validate id using isValid
  // find By Id then send back deleted todo
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }
    // success...
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

// patch to update a resource
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // req body is where updates will be stored. body has subset of things user passed to us (we don't want user to update anything and everything)
  // need to pull off only properties that we want user to update, use _pick
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // check completed value, and using that to set completedAt to timestamp if true
  if (_.isBoolean(body.completed) && body.completed) {
    // set body.completedAt
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // make query to update db (findByIdAndUpdate)
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
      return res.status(404).send()
    }

    res.send({todo: todo});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`Server is litty!!! Poppin on port ${port}`);
});

module.exports = {app};