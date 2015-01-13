var Note = Backbone.Model.extend({});
var Notes = Backbone.Collection.extend({
    model: Note,
    initialize: function() {
        this.doc =. opt ions.doc;
    }
});
