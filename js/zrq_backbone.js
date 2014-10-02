(function() {

    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    App.Models.zrq = Backbone.Model.extend({
        defaults: {
            task_id: new Date().valueOf(),
            prioridade: "0",
            data: new Date(),
            firt_name: "",
            last_name: ""
        },

        full_name: function() {
            return this.get("firt_name") + " " + this.get("last_name");
        },

        validate: function(ats, options) {
            if (ats.prioridade < 1 || ats.prioridade > 5) {
                return "erro do caralho";
            }
        }
    });

    var zrqModel = new App.Models.zrq({
        "firt_name": "Ricardo",
        "last_name": "Quintas"
            // "prioridade": "3"
    });


    console.log(zrqModel.get("firt_name"));
    console.log(zrqModel.full_name());
    console.log(zrqModel.get("prioridade"));
    zrqModel.set("prioridade", "3", {
        validate: true
    });
    console.log(zrqModel.get("prioridade"));
})();
