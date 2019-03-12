const express = require('express')
const app = express()
const fs = require('fs')
const convert = require('xml-js')
const csvtojsonV1 = require('csvtojson/v1')
const csv = require('csvtojson')
const User = require('./models/usersSchema').User
const File = require('./models/filesSchema').File
const cors = require('cors')

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// Form Data
const formData = require('express-form-data')
const os = require('os')
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// App Use
app.use(cors(corsOptions))
app.use(express.static('public'))

// Response
app.get('/api/users/moneyJump', (req, res) => {
  const moneyJump = {
    id: new Date().getTime(),
    name: 'Uber',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()
  }

  res.json(moneyJump)
})

app.get('/api/users', (req, res) => {
  const moneyJump = {
    id: 'Ixwuh376UHIhslI',
    name: 'moneyJump',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()
  }

  const chatBot = {
    id: 'QoijhsuHQGIIYIUH',
    name: 'ChatBot',
    amount: '250',
    category: 'Transportation',
    image: 'http://localhost:5000/assets/files/5c74c3d9ae51cb11a4ea5aed.png',
    date: new Date()
  }

  const users = [moneyJump, chatBot]
  res.json(users)
})

app.get('/api/input-data', (req, res) => {
  const ownersList = [
    { id: '1', name: 'Alex' },
    { id: '2', name: 'Luis' }
  ]

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
    { id: '12', month: 'December' }
  ]

  const yearList = [
    { id: '1', year: '2019' },
    { id: '2', year: '2018' }
  ]

  const inputFields = { ownersList: ownersList, monthList: monthList, yearList: yearList }

  res.json(inputFields)
})

// From Client
app.post('/api/upload-bank-statement-file', (req, res) => {
  const owner = req.body.owner
  const title = req.body.title
  const extension = req.body.uploadFile.path.split('.').pop()

  const newFile = new File({
    owner: owner,
    title: title,
    extension: extension
  })

  newFile.save((err) => {
    if (!err) {
      fs.rename(req.body.uploadFile.path, 'public/assets/files/' + newFile._id + '.' + extension, (err) => {
        if (!err) {
          File.find((err, doc) => {
            if (!err) {
              console.log(doc)
              res.send('POSTED!!!')
            } else {
              res.send('NOT POSTED')
            }
          })
        } else {
          res.send('Unable to RENAME data')
        }
      })
    } else {
      res.send('Unable to SAVE data')
    }
  })
})

const port = 5000

app.listen(port, () => console.log(`Server satarted on port ${port}`))
