var low = require('lowdb');
var db = low('db.json');
low.mixin(require('underscore-db'));

exports.create = function(pName) {
    return db('songs').insert({
        title: pName
    }).value().id;
};

exports.delete = function(pID) {
    return db('songs').removeWhere({
        id: pID
    }).value();
};

exports.getAll = function() {
    return db('songs').value();
};

exports.update = function(pID, pName) {
    db('songs').find({
        id: pID
    }).assign({
        title: pName
    });
};

exports.findById = function(pID) {
    return db('songs').find({
        id: pID
    }).value();
};
