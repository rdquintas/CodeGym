var express = require('express'); // call express
var router = express.Router(); // get an instance of the express Router
var server = require('../models/server');

// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    // res.json({
    //     message: 'hooray! welcome to our api!'
    // });
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    .post(function(req, res) {
        var id = server.create(req.body.name);
        res.json({
            message: 'Bear created with ID: ' + id
        });
    })

.get(function(req, res) {
    res.json(server.getAll());
});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
.delete(function(req, res) {
    var result = server.delete(req.params.bear_id);    
    if (result.length !== 0) {
        res.json({
            message: 'Bear deleted: ' + req.params.bear_id
        });
    } else {
        res.json({
            message: 'Bear not deleted!'
        });
    }
})

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
.get(function(req, res) {
    res.json(server.findById(req.params.bear_id));
})

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
.put(function(req, res) {

    // use our bear model to find the bear we want
    var id = server.findById(req.params.bear_id);

    if (id) {
        server.update(req.params.bear_id, req.body.name);
        res.json({
            message: 'Bear updated with new name: ' + req.body.name
        });
    } else {
        res.json({
            message: 'Invalid cena!'
        });
    }
});

module.exports = router;
