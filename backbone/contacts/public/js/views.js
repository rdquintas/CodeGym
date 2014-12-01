// Global APP view =========================================
App.Views.App = Backbone.View.extend({
    initialize: function() {
        // console.log(this.collection.toJSON());
        var addContactView = new App.Views.AddContact({
            collection: this.collection
        });
    }
});

// Form view =========================================
App.Views.AddContact = Backbone.View.extend({
    el: "#addContact",

    events: {
        "submit": "addContact"
    },

    addContact: function(e) {
        e.preventDefault();

        var result = this.collection.create({
            "first_name": this.$("#first_name").val(),
            "last_name": this.$("#last_name").val(),
            "email_address": this.$("#email_address").val(),
            "description": this.$("#description").val()
        }, {
            wait: true
        });

        console.log(result.validationError);
        
    }
});

// Single Contact view =========================================
// App.Views.App = Backbone.View.extend({});

// Multiple Contact view =========================================
// App.Views.App = Backbone.View.extend({});
