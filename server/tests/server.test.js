// library imports
 const expect = require('expect');
 const request = require('supertest');
 const {ObjectID} = require('mongodb');

 // local imports (need server.js/express app and our todo model)
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo'
}]

// testing lifecycle method to make sure db is empty
beforeEach((done) => {
  // wipe all todos, then call done, which ends method and moves on...
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});



// describe to group routes
  // will have multiple cases for each route
describe('POST /todos', () => {
  
  // test case #1
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    // when make a post request to /todos route w/ text as body...
      // expect a 200 request + a response w/ body as text
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // make a request to db, fetching all todos, verifying that our 1 todo was added...
          // using a mongo method
        Todo.find({text}).then((todos) => {
          // assert that the todo we created exists..
          // assert that there's 1 item in the db (but this assumes there's nothing already in the db, which is handled by the beforeEach lifecycle method)
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  

  // test case #2 to verify that todo isn't created when send bad data
  it('should not create todo w/ invalid body data', (done) => {
    // when make a post request w/ no text, expect a 400 response...
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    // start supertest request
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);

  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    // will need the id of todo in a collection (so add to todos variable)

    // need to convert object id to a string using toHexString
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        // assertion: expect that the response body has a todo prop (set up in server.js) w/ a text property, which we expect TOBE === to the todos[0].text from up above
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);

  });

  it('should return 404 if todo not found', (done) => {
    // make a request using a real obj id (but 1 that doesn't exist in the collection, so should get a 404 back)
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123

    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
})