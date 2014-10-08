(function() {
    window.App = {
        Views: {},
        Collections: {},
        Models: {}
    };

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
        model: App.Models.zrq
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
            console.log($("#inpFirstName").val());
            console.log("clicado caralho: " + e);
        }
    });

    App.Views.single = Backbone.View.extend({
        tagName: "li",
        // initialize: function() {
        //     this.render();
        // },

        model: App.Models.zrq,

        template: _.template($("#zrqTemplate").html()),

        render: function() {
            // this.collection.each(function(item) {
            //     // this.el = this.template(this.model.toJSON());
            //     console.log(item.el);
            // }, this);

            return this;
        }
    });


    App.Views.multiple = Backbone.View.extend({
        tagName: "ul",
        collection: App.Collections.zrq,
        render: function() {
            return this;
        }
    });

    // ****************************************************
    var zrqModel = new App.Models.zrq({
        first_name: "Ricardo",
        last_name: "Quintas"
    });

    // window.zrqCol = new App.Collections.zrq();
    // zrqCol.add(zrqModel);

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

    // var singleView = new App.Views.single({
    //     mode: zrqCol
    // });

    // $("#container").html(zrqView.el);

    // console.log(zrqView.render().el);
})();
