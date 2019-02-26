var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/moneyJumpApp', {useNewUrlParser: true});

var fileSchema = new Schema({
  title: {type: String},
  owner: {type: String},
  extension: {type: String}
});

var File = mongoose.model('File', fileSchema);

module.exports.File = File;
