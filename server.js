const express = require('express');
const cors = require('cors');
const api = require('./controllers/apisRoute');

const app = express();

// Form Data
const formData = require('express-form-data');
const os = require('os');

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.union());

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Static
app.use(express.static('public'));

// Api Route
app.use('/api', api);
const port = 5000;

app.listen(port, () => console.log(`Server satarted on port ${port}`));
