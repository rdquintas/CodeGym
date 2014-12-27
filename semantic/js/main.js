$(function() {

    //este codigo determina o menu seleccionado, baseado no attributo data-zrq-menu do body
    var selectedMenu = $("body").attr("data-zrq-menu");
    console.log("data-zrq-menu: " + selectedMenu);
    $("#menu a:eq(" + selectedMenu + ") , #m_menu a:eq(" + selectedMenu + ")").addClass("active");


    //testa o botao para fazer o toggle do side-bar
    $("#m_btn").on("click", function() {
        $('#m_menu').sidebar('toggle');
    });


    // codigo para chamar as popups
    $(".pop").popup({
        // on: 'click'
    });


    // codigo para fazer o dimmer da imagem
    $("#dimmer").dimmer({
        on: "hover"
    });

    // este codigo mostra um dimmer da pagina toda quando clico na cena
    $("#dimmer").on("click", function() {
        $(".page.dimmer").dimmer("show");
    });


    // Codigo para o botao do ORDER
    $("#btnOrder").on("click", function() {
        $('#img1').transition('pulse', "150ms").transition("shake");
    });


    // codigo para on hover do Portfolio
    $('#portfolio .dimmable.image').dimmer({
        on: 'hover',
        duration: {
            show: 500,
            hide: 500
        }
    });

    // codigo para o STEP do Portfolio
    $("#portfolio .step").on("click", function() {
        var selectedStep = $(this).attr("data-zrq-step");
        $("#portfolio .step").removeClass("active");
        $(this).addClass("active");
        $('#portfolio .accordion').accordion("open", parseInt(selectedStep));
    });

    // codigo para o ACCORDION do Portfolio
    $('#portfolio .accordion').accordion({
        collapsible: false,
        onOpen: function() {
            $("#portfolio .step").removeClass("active");
            $("#portfolio .step[data-zrq-step='" + this.id + "']").addClass("active");
        }
    });

    // codigo para rating
    $('#portfolio .rating').rating();

    // codigo o CONTACT FORM
    $('#contact .ui.checkbox').checkbox();
    $('#contact .selection.dropdown').dropdown();

    //fechar o side-bar quando a tecla ESC for clicada    
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#m_menu').sidebar('hide');
        }
    });


    //se fizermos o resize, devo fechar o side-bar caso este esteja aberto
    $(window).resize(function() {
        if ($(window).width() > 641) {
            if ($('#m_menu').hasClass('visible')) {
                $('#m_menu').sidebar('hide');
            }
        };

    });
});
