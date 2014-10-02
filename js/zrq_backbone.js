(function() {

    var zrqModel = Backbone.Model.extend({
        defaults: {
            task_id: new Date().valueOf(),
            categoria: "",
            first_name: "",
            last_name: "",
            data: "",
            prioridade: "1"
        },

        validate: function(args) {
            if (args.prioridade > 5) {
                return "erro caralho";
            }
        },

        fullname: function() {
            return this.get("first_name") + " " + this.get("last_name");
        }
    });


    var mainCOl = Backbone.Collection.extend({
        model: zrqModel,
    });

    var zrq = new zrqModel();
    var zrqCol = new mainCOl();

    console.log(zrq.get("task_id"));

    zrq.set("last_name", "Quintas");
    console.log(zrq.fullname());
    console.log(zrq.get("prioridade"));
    zrq.set("prioridade", "5", {
        validate: true
    });
    console.log(zrq.get("prioridade"));

    zrq.set("first_name", "Nome1");
    zrq.set("last_name", "Apelido1");
    zrqCol.add(zrq);

    zrq = new zrqModel();
    zrq.set("first_name", "Nome2");
    zrq.set("last_name", "Apelido2");
    zrqCol.add(zrq);

    zrq = new zrqModel();
    zrq.set("first_name", "Nome3");
    zrq.set("last_name", "Apelido3");
    zrqCol.add(zrq);

    zrqCol.each(function(cena) {
        console.log(cena.fullname());
    });

})();
