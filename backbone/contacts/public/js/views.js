// Global APP view =========================================
App.Views.App = Backbone.View.extend({
    initialize: function() {
        // console.log(this.collection.toJSON());
        var addContactView = new App.Views.AddContact({
            collection: this.collection
        });

        var allContacts = new App.Views.Contacts({
            collection: this.collection
        }).render();

        $("#zrq-table").append(allContacts.el);
    }
});

// Form view =========================================
App.Views.AddContact = Backbone.View.extend({
    el: "#addContact",

    // Este form initialize é usado para fazer a cache das variaveis, ficando assim com referencias
    // para os DOMS de cada uma delas e assim trabalhar mais facilmente no codigo em baixo
    initialize: function() {
        this.first_name = this.$("#first_name");
        this.last_name = this.$("#last_name");
        this.email_address = this.$("#email_address");
        this.description = this.$("#description");
    },

    events: {
        "submit": "addContact",
        'keypress': 'processKey'
    },

    processKey: function(e) {
        if (e.which === 13) { // enter key
            this.addContact(e);
        }
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

        this.clearForm();
        console.log(result.validationError);

    },

    clearForm: function() {
        this.first_name.val("");
        this.last_name.val("");
        this.email_address.val("");
        this.description.val("");
    }

});

// Single Contact view =========================================
App.Views.Contact = Backbone.View.extend({
    tagName: "tr",

    template: template("zrq-single-contact"),

    initialize: function() {
        this.model.on("destroy", this.unrender, this);
    },

    events: {
        "click a.zrq-delete": "deleteContact"
    },

    deleteContact: function() {
        this.model.destroy();
    },

    unrender: function() {
        this.remove();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Multiple Contact view =========================================
App.Views.Contacts = Backbone.View.extend({

    tagName: "tbody",

    initialize: function() {
        // Importante: atencao ao evento "sync"
        // podia ter usado o "add", mas o "sync" garante-me que so vou acrescentar
        // quando tiver db sincronizado também.
        this.collection.on("sync", this.addOne, this);
    },

    render: function() {
        this.collection.each(this.addOne, this);
        return this;
    },

    addOne: function(contact) {
        var contactView = new App.Views.Contact({
            model: contact
        });
        console.log(contactView.render().el);
        this.$el.append(contactView.render().el);
    }

});
