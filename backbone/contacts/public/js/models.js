App.Models.Contact = Backbone.Model.extend({
    defaults: {
        first_name: "",
        last_name: "",
        email_address: "",
        description: ""
    },

    validate: function(attrs) {
        if (!attrs.first_name || !attrs.last_name) {
            return "First Name and Last Name MANDATORY";
        }

        if (!attrs.email_address) {
            return "Please enter a valida address";
        }
    }
});
