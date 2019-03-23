const express = require('express');
const fs = require('fs');
const convert = require('xml-js');
const csv = require('csvtojson');
const cors = require('cors');
const File = require('./../models/filesSchema').File;


const api = express.Router();


// Response
api.get('/', (req, res) => {
  console.log("Console");
  res.send("In");
});


api.get('/users/moneyJump', (req, res) => {
  const moneyJump = {
    id: new Date().getTime(),
    name: 'Uber',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date(),
  };

  res.json(moneyJump);
});

api.get('/users', (req, res) => {
  const moneyJump = {
    id: 'Ixwuh376UHIhslI',
    name: 'moneyJump',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date(),
  };

  const chatBot = {
    id: 'QoijhsuHQGIIYIUH',
    name: 'ChatBot',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date(),
  };

  const users = [moneyJump, chatBot];
  res.json(users);
});

api.get('/input-data', (req, res) => {
  const ownersList = [{ id: '1', name: 'Alex' }, { id: '2', name: 'Luis' }];

  const monthList = [
    { id: '1', month: 'January' },
    { id: '2', month: 'February' },
    { id: '3', month: 'March' },
    { id: '4', month: 'April' },
    { id: '5', month: 'May' },
    { id: '6', month: 'June' },
    { id: '7', month: 'July' },
    { id: '8', month: 'August' },
    { id: '9', month: 'September' },
    { id: '10', month: 'October' },
    { id: '11', month: 'November' },
    { id: '12', month: 'December' },
  ];

  const yearList = [{ id: '1', year: '2019' }, { id: '2', year: '2018' }];
  const inputFields = { ownersList, monthList, yearList };
  res.json(inputFields);
});

// From Client
api.post('/upload-bank-statement-file', (req, res) => {
  const { owner } = req.body;
  const { title } = req.body;
  const extension = req.body.uploadFile.path.split('.').pop();

  const newFile = new File({
    owner,
    title,
    extension,
  });

  newFile.save(err => {
    if (!err) {
      fs.rename(req.body.uploadFile.path, `public/assets/files/${newFile._id}.${extension}`, err => {
        if (!err) {
          File.find((err, doc) => {
            if (!err) {
              console.log(doc);
              res.send('POSTED!!!');
            } else {
              res.send('NOT POSTED');
            }
          });
        } else {
          res.send('Unable to RENAME data');
        }
      });
    } else {
      res.send('Unable to SAVE data');
    }
  });
});


api.get('/display-csv-file-by-date', (req, res) => {
  var getCSVFile = "./public/assets/files/5c919cd3a6e0b70ca91e1171.csv";
  csv()
  .fromFile(getCSVFile)
  .then((data)=>{
      console.log(data);
      res.json(data);
  })
});

module.exports = api;
