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


            // http://stackoverflow.com/questions/10504023/backbone-js-not-updating-id-of-model-object-after-save-why-not

            // zrqModel.save(null, {
            //     success: function(model, response) {
            //         console.log("uicabom");
            //         // console.log("zrq id: " + model.set('id'));
            //     }
            // }, this);

            zrqModel.save();
            // zrqModel.save({
            //     success: function() {
            //         console.log("success");
            //     },
            //     error: function() {
            //         console.log("error");
            //     }
            // });


            console.log("zrqModel title: " + zrqModel.get("title"));
            console.log("zrqModel id: " + zrqModel.get("id"));
            
            // var zrqModel2 = new App.Models.task({
            //     "id": "32dd7668-00e8-4698-b326-363f1e748f76"
            // });

            // zrqModel2.fetch();

            // var zrqModel3 = new App.Models.task({
            // 	id: "987ba0f1-5256-4311-b260-cff3acfdea78",
            //     title: "zrq1139"
            // });

            // zrqModel3.save();

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
            this.render();
        },

        deleteTask: function() {
            console.log("deleteTask");
            this.model.set("id", "e4a229be-09f0-403c-8b21-26110f231d21");
            this.model.destroy();
        },

        removeDomEntry: function() {
            console.log("removeDomEntry");
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

        urlRoot: "api/task"
    });

    // Collections ---------------------------------------------
    App.Collections.tasks = Backbone.Collection.extend({
        model: App.Models.task,
        initialize: function() {
            vent.on("task:add", this.addOneMore, this);
        },

        addOneMore: function(pModel) {
            this.add(pModel);
        }
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

    zrqView.render().el;
})();
