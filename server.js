var express = require('express');
var app = express();
var fs = require('fs');
var convert = require('xml-js');
const csvtojsonV1 = require("csvtojson/v1");
var csv = require('csvtojson');
var User = require('./models/usersSchema').User;
var File = require('./models/filesSchema').File;
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
    image:'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()};

  res.json(moneyJump);

})


app.get('/api/users', (req, res) => {

  var moneyJump = {
    id: 'Ixwuh376UHIhslI',
    name: 'moneyJump',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()
  };

  var chatBot = {
    id: 'QoijhsuHQGIIYIUH',
    name: 'ChatBot',
    amount: '250',
    category: 'Transportation',
    image:'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()
  };

  var users = [moneyJump, chatBot];

  res.json(users);

})



// From Client

app.post('/api/upload-data', (req, res) => {

  var owner = req.body.owner;
  var title = req.body.title;
  var extension = req.body.uploadFile.path.split(".").pop();

  var newFile = new File({
    owner : owner,
    title: title,
    extension : extension
  });

  newFile.save((err) => {
    if(!err){
      fs.rename(req.body.uploadFile.path, 'public/assets/files/' + newFile._id + '.' + extension, function(err){
        if(!err){
          File.find(function(err, doc){
            console.log(doc);
            res.send('POSTED!!!');
          });
         } else {
           res.send("Unable to RENAME data");
         }
       });
    } else {
      res.send("Unable to SAVE data");
    }
  });

});

const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
