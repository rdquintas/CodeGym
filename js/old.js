(function() {
    window.App = {
        Views: {},
        Collections: {},
        Models: {}
    };

    vent = _.extend({}, Backbone.Events);

    // Models ----------------------------------
    App.Models.zrq = Backbone.Model.extend({

        validate: function() {
            if (!first_name || !last_name) {
                return "erro do caralho";
            }
        }

    });

    // Collections ----------------------------------
    App.Collections.zrq = Backbone.Collection.extend({
        model: App.Models.zrq,

        initialize: function() {
            vent.on(
                "task:add", this.addOneMore, this
            );
        },

        addOneMore: function(newOne) {
            this.add(newOne);
        }
    });

    // Views ----------------------------------
    App.Views.zrqForm = Backbone.View.extend({
        // template: _.template($("#zrqForm").html()),
        el: "#zrqForm",

        events: {
            "click #btnOk": "addMore"
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.el = "caralho";
            return this;
        },

        addMore: function(e) {
            e.preventDefault();
            var mod = new App.Models.zrq({
                first_name: this.$el.find("#inpFirstName").val(),
                last_name: this.$el.find("#inpLastName").val()
            });
            vent.trigger("task:add", mod);
        }
    });

    App.Views.single = Backbone.View.extend({
        tagName: "li",

        model: App.Models.zrq,

        template: _.template($("#zrqTemplate").html()),

        render: function() {
            var result = this.template(this.model.toJSON());
            this.$el.html(result);
            return this;
        }
    });


    App.Views.multiple = Backbone.View.extend({
        el: "#zrqLista",

        initialize: function() {
            this.collection.on("add", this.addOne, this);
        },

        addOne: function(pModel) {

            // console.log(pModel);
            var view = new App.Views.single({
                model: pModel
            });

            this.$el.append(view.render().el);
        },

        render: function() {
            return this;
        }
    });

    // ****************************************************
    var zrqModel = new App.Models.zrq({
        first_name: "Ricardo",
        last_name: "Quintas"
    });

    window.zrqCol = new App.Collections.zrq([{
        first_name: "Ricardo",
        last_name: "Quintas"
    }, {
        first_name: "Oscar",
        last_name: "Alho"
    }, {
        first_name: "Crespo",
        last_name: "Ramos"
    }]);

    var zrqMultipleView = new App.Views.multiple({
        collection: zrqCol
    });
    var zrqFormView = new App.Views.zrqForm({});

    Backbone.history.start();

    // var singleView = new App.Views.single({
    //     mode: zrqCol
    // });

    // $("#container").html(zrqView.el);

    // console.log(zrqView.render().el);
})();
