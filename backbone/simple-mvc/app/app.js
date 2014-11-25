// http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routerIndex = require('./routes/index');
var routerTask = require('./routes/tasks');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES -------------------------------
app.use('/', routerIndex);
app.use('/api', routerTask);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
