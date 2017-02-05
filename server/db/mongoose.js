var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// configure mongoose and connect to mongodb db 
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}