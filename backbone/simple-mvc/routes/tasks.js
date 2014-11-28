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


// on routes that end in /task
// ----------------------------------------------------
router.route('/task')
    .post(function(req, res) {
        var newModel = server.create(req.body.title);
        if (newModel) {
            res.json(
                newModel
            );
        } else {
            res.json({
                message: 'Something went wrong with the CREATE'
            });
        }
    })

.get(function(req, res) {
    res.json(server.getAll());
});

// on routes that end in /task/:task_id
// ----------------------------------------------------
router.route('/task/:task_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/task/:task_id)
.delete(function(req, res) {
    var result = server.delete(req.params.task_id);
    if (result.length !== 0) {
        res.json({
            message: 'Task deleted: ' + req.params.task_id
        });
    } else {
        res.json({
            message: 'Task not deleted!'
        });
    }
})

// get the bear with that id (accessed at GET http://localhost:8080/api/task/:task_id)
.get(function(req, res) {
    res.json(server.findById(req.params.task_id));
})

// update the bear with this id (accessed at PUT http://localhost:8080/api/task/:task_id)
.put(function(req, res) {

    // use our bear model to find the bear we want
    var id = server.findById(req.params.task_id);

    if (id) {
        var result = server.update(req.params.task_id, req.body.title);
        if (result) {
            res.json({
                message: 'Task updated with new title: ' + req.body.title
            });
        } else {
            res.json({
                message: 'Something went wrong with the UPDATE'
            });
        }
    } else {
        res.json({
            message: 'Invalid cena!'
        });
    }
});

module.exports = router;
