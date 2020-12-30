require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { NODE_ENV } = require('./config');
const recipeRouter = require('./src/recipe/recipe-router');
const spiritRouter = require('./src/spirit/spirit-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/recipe', recipeRouter);
app.use('/spirit', spiritRouter);

app.get('/', (req, res) => {
  res.send('SMASHING COCKTAILS v1.1.3! Node Env: ' + process.env.NODE_ENV + ' Port: ' + process.env.PORT);
})

app.get('/xss', (req, res) => {
  res.cookie('secretToken', '1234567890');
  res.sendFile(__dirname + '/xss.example.html');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app