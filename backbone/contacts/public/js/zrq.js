(function() {
    var App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    var vent = _.extend({}, Backbone.Events);

    // MODELS ==============================
    App.Models.contact = Backbone.Model.extend({
        defaults: {
            first_name: "",
            last_name: "",
            email_address: "",
            description: ""
        }
    });

    // VIEWS ==============================


    // COLLECTIONS ==============================


})();
