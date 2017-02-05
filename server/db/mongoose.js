var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// configure mongoose and connect to mongodb db 
  // mongodb uri: mongodb://heroku_lptdfbfk:85vea6g2flpafe1kemvh6gl4t8@ds143449.mlab.com:43449/heroku_lptdfbfk

// check if mongodb uri exists else use localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}