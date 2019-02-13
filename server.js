var express = require('express');
var app = express();


app.get('/api/customers', (req, res) => {

  var customers = [
    {id: 1, firstName: ' Alex', lastName: 'Smith'},
    {id: 2, firstName: ' Carl', lastName: 'Sagan'},
    {id: 3, firstName: ' Elon', lastName: 'Musk'},
    {id: 4, firstName: ' Michael', lastName: 'Jordan'},
    {id: 5, firstName: ' Marvin', lastName: 'Minsky'},
    {id: 6, firstName: ' Jerry', lastName: 'Seinfeld'}
  ];

  res.json(customers);

})

const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
