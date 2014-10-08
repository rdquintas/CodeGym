(function() {
    window.App = {
        Views: {},
        Collections: {},
        Models: {}
    };

    // Models ----------------------------------
    App.Models.zrq = Backbone.Model.extend({
        defaults: {
            first_name: "",
            last_name: ""
        },
        validate: function() {
            if (!first_name || !last_name) {
                return "erro do caralho";
            }
        }

    });

    // Collections ----------------------------------

    // Views ----------------------------------
    App.Views.zrqMain = Backbone.View.extend({
        // template: _.template($("#zrqForm").html()),
        el: "#zrqForm",
        events: {
            "submit": "btnClicked",
            "click #btnOk": "btnClicked"
        },
        initialize: function() {
            this.render();
        },

        render: function() {
            this.el = "caralho";
            return this;
        },

        btnClicked: function(e) {
            e.preventDefault();
            console.log("clicado caralho: " + e);
        }
    });

    App.Views.zrq = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        template: _.template($("#zrqTemplate").html()),

        render: function() {
            this.el = this.template(this.model.toJSON());
            return this;
        }
    });


    // ****************************************************
    zrqModel = new App.Models.zrq({
        first_name: "Ricardo",
        last_name: "Quintas"

    });

    zrqMainView = new App.Views.zrqMain({});

    zrqView = new App.Views.zrq({
        model: zrqModel
    });

    $("#container").html(zrqView.render().el);

    // console.log(zrqView.render().el);
})();
