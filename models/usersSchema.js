const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/moneyJumpApp', { useNewUrlParser: true })

const usersSchema = new Schema({
  name: String,
  amount: Number,
  category: String,
  date: String
})

const User = mongoose.model('User', usersSchema)

module.exports.User = User
