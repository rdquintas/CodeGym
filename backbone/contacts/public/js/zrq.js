(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    window.vent = _.extend({}, Backbone.Events);

    window.template = function(templateID) {
        return _.template($("#" + templateID).html());
    };

})();
