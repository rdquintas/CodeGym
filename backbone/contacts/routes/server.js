var low = require('lowdb');
var db = low('db.json');
low.mixin(require('underscore-db'));

exports.create = function(pFirstName, pLastName, pEmail, pDescription) {
    return db('contacts').insert({
        first_name: pFirstName,
        last_name: pLastName,
        email_address: pEmail,
        description: pDescription
    }).value();
};

exports.delete = function(pID) {
    return db('contacts').removeWhere({
        id: pID
    }).value();
};

exports.getAll = function() {
    console.log("GET ALL");
    return db('contacts').value();
};

exports.update = function(pID, pFirstName, pLastName, pEmail, pDescription) {
    var result = db('contacts').update(pID, {
        first_name: pFirstName,
        last_name: pLastName,
        email_address: pEmail,
        description: pDescription
    }).value();

    return result;
};

exports.findById = function(pID) {
    return db('contacts').find({
        id: pID
    }).value();
};
