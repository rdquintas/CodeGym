(function() {

    var App = {
        Views: {},
        Collections: {},
        Models: {}
    };

    App.Views.singleTask = Backbone.View.extend({
        template: _.template($("#zrq-template").html()),

        render: function() {
            var result = this.template(this.model.toJSON());
            this.$el.html(result);
            return this;
        }
    });

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

    App.Collections.tasks = Backbone.Collection.extend({
        model: App.Models.task
    });

    var zrqCol = new App.Collections.tasks({});

    for (var i = 1; i < 10; i++) {
        var zrqModel = new App.Models.task({
            title: "task nr: " + i
        });

    	    console.log(zrqModel.get("title"));

        zrqCol.add(zrqModel);
    }

    zrqCol.each(function(pModel) {

        var zrqView = new App.Views.singleTask({
            model: pModel
        });

        // $("#zrq-aqui").html(zrqView.render().el);
        $("#zrq-aqui").append(zrqView.render().el);
    });

    // zrqView.render();

    // console.log(zrqModel.get("title"));
    // $("#zrq-aqui").html(zrqView.render().el);
})();
