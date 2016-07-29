(function(){

    app.$dom.window.on('load', function(){
        riot.mount("*");
    });

    app.$dom.body.on("click", ".data__item__header", function(){
        var $item = $(this).closest(".data__item");
        $item.toggleClass("data__item--active");
    });

    app.$dom.body.on("click", ".modal__button__sendEmail", function(){
        $(".popup").attr("data-open", "true");
    });

    app.$dom.body.on("click", ".popup__close", function(){
        $(".popup").attr("data-open", "false");
    });

    app.$dom.body.on("click", ".data__item__date", function(){
        app.$dom.body.addClass("no-scroll");
        $(".modal").attr("data-open", "true");
    });

    app.$dom.body.on("click", ".modal__button__close, .modal__footer", function(){
        app.$dom.body.removeClass("no-scroll");
        $(".modal").attr("data-open", "false");
    });

    app.$dom.body.on("click", ".sidebarSwither", function(){
        var $swither = $(this),
            $panel = $swither.closest(".data__menu__left"),
            $wrapper = $(".content__wrapper"),
            $dataList = $(".data__list"),
            $dashboard = $(".dashboard");

        if ($swither.hasClass("sidebarSwither--active")){
            $swither.removeClass("sidebarSwither--active");
            $panel.removeClass("slide-right");
            $wrapper.removeClass("slide-right");
            $dataList.removeClass("col-md-14 col-lg-13").addClass("col-md-13 col-lg-12");
            $dashboard.removeClass("col-md-10 col-lg-11").addClass("col-md-11 col-lg-12");
        }
        else {
            $swither.addClass("sidebarSwither--active");
            $panel.addClass("slide-right");
            $wrapper.addClass("slide-right");
            $dataList.removeClass("col-md-13 col-lg-12").addClass("col-md-14 col-lg-13");
            $dashboard.removeClass("col-md-11 col-lg-12").addClass("col-md-10 col-lg-11");
        }
    });



})();
