// var mongoose = require('../db/mongoose');
var mongoose = require('mongoose');
// schema vs model: http://stackoverflow.com/questions/22950282/mongoose-schema-vs-model
// create a model,specifying the attributes (in object form, aka a SCHEMA) we want a todo to have...

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};