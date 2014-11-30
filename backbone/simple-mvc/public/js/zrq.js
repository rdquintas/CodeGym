(function() {

    var App = {
        Views: {},
        Collections: {},
        Models: {},
        Routers: {}
    };

    // Vars e Cenas ---------------------------------------------
    var vent = _.extend({}, Backbone.Events);

    // Views ---------------------------------------------
    App.Views.form = Backbone.View.extend({
        el: "#zrq-form",

        events: {
            "click button#zrq-clica": "addTask"
        },

        addTask: function(e) {
            e.preventDefault();

            var zrqModel = new App.Models.task({
                title: this.$el.find("#zrq-input").val()
            }, {
                validate: true
            });

            vent.trigger("task:add", zrqModel);
        },

        render: function() {
            return this;
        }
    });

    App.Views.single = Backbone.View.extend({
        template: _.template($("#zrq-template").html()),

        events: {
            "click button#zrq-edit": "editTask",
            "click button#zrq-delete": "deleteTask"
        },

        initialize: function() {
            this.model.on("destroy", this.removeDomEntry, this);
        },

        editTask: function() {
            var result = window.prompt("Meke caralho ?", this.model.get("title"));
            this.model.set("title", result);
            this.model.save();
            this.render();
        },

        deleteTask: function() {
            this.model.destroy();
        },

        removeDomEntry: function() {
            this.$el.remove();
        },

        render: function() {
            var result = this.template(this.model.toJSON());
            this.$el.html(result);
            return this;
        }
    });

    App.Views.multiple = Backbone.View.extend({
        el: "#zrq-list",

        initialize: function() {
            this.collection.on("add", this.addTask, this);
        },

        addTask: function(pModel) {
            var tmpView = new App.Views.single({
                model: pModel
            });
            this.$el.append(tmpView.render().el);
        },

        render: function() {
            return this;
        }
    });

    // Models ---------------------------------------------
    App.Models.task = Backbone.Model.extend({

        defaults: {
            "title": ""
        },

        validate: function(attrs, options) {
            if (attrs.title === "") {
                attrs.title = null;
            }

            if (!attrs.title) {
                return "mete la um titalo caralho";
            }
        },

        urlRoot: "api/task" //no model devo usar urlRoot
    });

    // Collections ---------------------------------------------
    App.Collections.tasks = Backbone.Collection.extend({
        model: App.Models.task,
        initialize: function() {
            vent.on("task:add", this.addOneMore, this);
            this.fetch();
        },

        addOneMore: function(pModel) {
            this.create(pModel);
        },

        url: "api/task" //na collection devo usar url
    });


    // Routers ---------------------------------------------
    App.Routers.router = Backbone.Router.extend({

        routes: {
            "help": "help", // #help
            "search/:query": "search" // #search/kiwis
                // "search/:query/p:page": "search" // #search/kiwis/p7
        },

        help: function() {
            // ...
        },

        search: function(query) {}

    });


    // ************ START HERE *********************
    Backbone.history.start();

    var zrqCol = new App.Collections.tasks({});
    var zrqRout = new App.Routers.router({});

    var zrqForm = new App.Views.form({

    });

    var zrqView = new App.Views.multiple({
        collection: zrqCol
    });

    zrqView.render();
})();
