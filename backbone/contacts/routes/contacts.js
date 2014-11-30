var express = require('express'); // call express
var router = express.Router(); // get an instance of the express Router
var server = require('./server');

// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
    // INSERT NEW records
    .post(function(req, res) {
        res.json(server.create(req.body.first_name,
            req.body.last_name, req.body.email_address, req.body.description));
    })

// GET ALL records
.get(function(req, res) {
    res.json(server.getAll());
});

router.route('/:contact_id')
    // DELETE record
    .delete(function(req, res) {
        res.json(server.delete(req.params.contact_id));
    })

// GET record
.get(function(req, res) {
    res.json(server.findById(req.params.contact_id));
})

// UPDATE record
.put(function(req, res) {
    var id = server.findById(req.params.contact_id);

    if (id) {
        res.json(server.update(req.params.contact_id, req.body.first_name,
            req.body.last_name, req.body.email_address, req.body.description));
    } else {
        res.json({
            message: 'Invalid cena!'
        });
    }

});

module.exports = router;
