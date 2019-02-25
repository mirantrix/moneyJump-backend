var express = require('express');
var app = express();
var fs = require('fs');
var convert = require('xml-js');
const csvtojsonV1 = require("csvtojson/v1");
var csv = require('csvtojson');
var User = require('./models/usersSchema').User;
var cors = require('cors');

// CORS
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// Form Data
var formData = require('express-form-data');
const os = require("os");
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

var methodOverride = require('method-override');
app.use(methodOverride('_method'));



// App Use
app.use(cors(corsOptions));
app.use(express.static('public'));



// Response
app.get('/api/users/moneyJump', (req, res) => {

  var moneyJump = {
    id: new Date().getTime(),
    name: 'Uber', amount: '250',
    category: 'Transportation',
    image:'http://localhost:5000/assets/files/1550992119148.png',
    date: new Date()};

  res.json(moneyJump);

})


app.get('/api/users', (req, res) => {

  var moneyJump = {
    id: 'Ixwuh376UHIhslI',
    name:'moneyJump',
    amount:'250',
    category:'Transportation',
    image:'http://localhost:5000/assets/files/1550992119148.png',
    date: new Date()
  };

  var chatBot = {
    id: 'QoijhsuHQGIIYIUH',
    name: 'ChatBot',
    amount: '250',
    category: 'Transportation',
    image:'http://localhost:5000/assets/files/1550992119148.png',
    date: new Date()
  };

  var users = [moneyJump, chatBot];

  res.json(users);

})



// From Client

app.post('/api/upload-data', (req, res) => {

  var fileName = new Date().getTime();
  var extension = req.files.uploadFile.path.split(".").pop();

  fs.rename(req.files.uploadFile.path, 'public/assets/files/' + fileName + '.' + extension, function(err){
   if(!err){
     res.send('POSTED!!!');
   } else {
     res.send("ERROR");
   }
 });
});




const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
