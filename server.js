var express = require('express');
var app = express();
var User = require('./models/usersSchema').User;

app.get('/api/users', (req, res) => {

  var uber = new User({name: "Uber", amount: '150', category: 'Transportation', date: new Date()});
  var amazon = new User({name: "Amazon", amount: '550', category: 'Online-Shopping', date: new Date()});

  var services = [uber, amazon];

  console.log(services);
  res.json(services);

})

const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
