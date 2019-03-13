const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/moneyJumpApp', { useNewUrlParser: true });

const fileSchema = new Schema({
  title: { type: String },
  owner: { type: String },
  extension: { type: String },
});

const File = mongoose.model('File', fileSchema);

module.exports.File = File;
