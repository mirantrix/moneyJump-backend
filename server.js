const express = require('express');

const app = express();
const fs = require('fs');
const convert = require('xml-js');
const csvtojsonV1 = require('csvtojson/v1');
const csv = require('csvtojson');
const cors = require('cors');

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// Form Data
const formData = require('express-form-data');
const os = require('os');

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

const methodOverride = require('method-override');
const { File } = require('./models/filesSchema');
const { User } = require('./models/usersSchema');
const api = require('./controllers/apisRoute');

app.use(methodOverride('_method'));

// App Use
app.use(cors(corsOptions));
app.use(express.static('public'));

// Api Route
app.use('/api', api);
const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
