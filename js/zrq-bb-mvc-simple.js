(function() {

    var App = {
        Views: {},
        Collections: {},
        Models: {}
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
            });

            vent.trigger("task:add", zrqModel);
        },

        render: function() {
            return this;
        }
    });

    App.Views.single = Backbone.View.extend({
        template: _.template($("#zrq-template").html()),

        render: function() {
            var result = this.template(this.model.toJSON());
            this.$el.html(result);
            return this;
        }
    });

    App.Views.multiple = Backbone.View.extend({
        el: "#zrq-list",

        render: function() {
            this.collection.each(function(pModel) {
                if (pModel.get("title")) {
                    var tmpView = new App.Views.single({
                        model: pModel
                    });
                    this.$el.append(tmpView.render().el);
                }
            }, this)

            return this;
        }
    });

    // Models ---------------------------------------------
    App.Models.task = Backbone.Model.extend({
        // defaults: {
        // title: "",
        // },

        validate: function() {
            if (!title) {
                throw error;
            }
        }
    });

    // Collections ---------------------------------------------
    App.Collections.tasks = Backbone.Collection.extend({
        model: App.Models.task,
        initialize: function() {
            vent.on("task:add", this.addOneMore, this)
        },

        addOneMore: function(pModel) {
            console.log("ja esta: " + pModel.get("title"));
        }
    });


    // ************ START HERE *********************
    Backbone.history.start();

    var zrqCol = new App.Collections.tasks({});

    var zrqForm = new App.Views.form({

    });

    var zrqView = new App.Views.multiple({
        collection: zrqCol
    });


    zrqView.render().el;

    // console.log(zrqModel.get("title"));
    // $("#zrq-list").html(zrqView.render().el);
})();
