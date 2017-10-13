const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose'); //Node Tool for MongoDb
const config = require('./config/database'); //Mongo Config
const path = require('path'); // NodeJS Package for file paths
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err){
    console.log('could NOT connect to database: ', err);
  }else{
    console.log('Connected to database :' + config.db);
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

// Connect server to Angular 2 Index.html
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
} )
