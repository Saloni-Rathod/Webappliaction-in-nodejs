const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const app = express();
 



const morgan = require('morgan');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(express.static(path.join(`${__dirname}/public`)));
app.use('/css', express.static(path.join(`${__dirname}/node_modules/bootstrap/dist/css`)));
app.use('/js', express.static(path.join(`${__dirname}/node_modules/bootstrap/dist/js`)));
app.use('/js', express.static(path.join(`${__dirname}/node_modules/bootstrap/dist`)));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { list: ['a', 'b'], title: 'Library' });
});



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.listen(port, () => {
  console.log(`listening on port ${chalk.green('port')}`);
});
