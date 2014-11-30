var low = require('lowdb');
var db = low('db.json');
low.mixin(require('underscore-db'));

exports.create = function(pTitle) {
    return db('tasks').insert({
        title: pTitle
    }).value();
};

exports.delete = function(pID) {
    return db('tasks').removeWhere({
        id: pID
    }).value();
};

exports.getAll = function() {
    return db('tasks').value();
};

exports.update = function(pID, pTitle) {
    var result = db('tasks').update(pID, {
        title: pTitle
    }).value();

    return result;
};

exports.findById = function(pID) {
    return db('tasks').find({
        id: pID
    }).value();
};
