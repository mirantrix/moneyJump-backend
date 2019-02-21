var express = require('express');
var app = express();
var fs = require('fs');
var convert = require('xml-js');
const csvtojsonV1 = require("csvtojson/v1");
var csv = require('csvtojson');
var User = require('./models/usersSchema').User;


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


// Template View
app.set('view engine', 'pug');

app.get('/api/users', (req, res) => {

  var uber = new User({name: "Uber", amount: '150', category: 'Transportation', date: new Date()});
  var amazon = new User({name: "Amazon", amount: '550', category: 'Online-Shopping', date: new Date()});

  var services = [uber, amazon];

  console.log(services);
  res.json(services);

})


// Route
//app.use('/', express.static('public'));



app.get('/api/upload', (req, res) => {
  console.log("In");
  res.render('index', {hi:"HI"});
});



app.post('/api/post-file', (req, res) => {

  var extension = req.body.uploadFile.path.split(".").pop();

  fs.rename(req.body.uploadFile.path, 'public/assets/files/' + req.body.title + '.' + extension, function(err){
    if(!err){
      console.log('public/assets/files/' + req.body.title + '.' + extension);
      res.redirect('/api/showroom');
    } else {
      res.send("ERROR");
    }
  });
});


app.get('/api/showroomXML', (req, res) => {
  var readXML = fs.readFileSync("*****************", 'utf8');
  var json = convert.xml2json(readXML, {compact: false, spaces: 4});
  var objectData = JSON.parse(json, null, 2);
  var rfc = objectData.elements[0].elements[0].attributes.Rfc;
  console.log(rfc);
  res.render('showroom', { json : rfc});
});


app.get('/api/showroomCSV', (req, res) => {
  var readCSV = "*****************";
  csv()
  .fromFile(readCSV)
  .then((objectData)=>{
      console.log(objectData[0]);
      res.render('showroom', { json : objectData[0]});
  })
});


const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
