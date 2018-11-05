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
  res.render('index', { list: ['about', 'services','portfolio','pricing','contact','signup'], title: 'Library' });
});



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/webapplication");

  var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String

});



var comments = new mongoose.Schema({
    name: String,
    email: String,
    comments:String

});

var User = mongoose.model("User", nameSchema);
  var contact_us  = mongoose.model("contact_us", comments);
app.post("/signup", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Successfully signed in");
        })
        .catch(err => {
            res.status(400).send("Unable to sign-in");
        });
});




app.post("/contact_us", (req, res) => {
    var myData = new contact_us(req.body);
    myData.save()
        .then(item => {
            res.send("Our team will soon get in touch with u");
        })
        .catch(err => {
            res.status(400).send("Sorry unable to proceed");
        });
});


app.listen(port, () => {
  console.log(`listening on port ${chalk.green('port')}`);
});
