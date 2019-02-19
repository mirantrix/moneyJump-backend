

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/moneyJumpApp', {useNewUrlParser: true});

var usersSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: String,
  date: String
});

var User = mongoose.model('User', usersSchema);

module.exports.User = User;
