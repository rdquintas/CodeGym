$(function() {

    //este codigo determina o menu seleccionado, baseado no attributo REL do body
    var rel = $("body[rel]").attr("rel");
    $("#menu a:eq(" + rel + ") , #m_menu a:eq(" + rel + ")").addClass("active");


    //testa o botao para fazer o toggle do side-bar
    $("#m_btn").on("click", function() {
        $('#m_menu').sidebar('toggle');
    });


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
