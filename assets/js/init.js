(function(){

    app.$dom.window.on('load', function(){
        riot.mount("*");
    });

    app.$dom.body.on("click", ".data__item__header", function(e){
        if (!e.target.getAttribute("class").match(/checked/)){
            var $item = $(this).closest(".data__item"),
                $wrapper = $item.find(".data__item__wrapper");

            if ($item.data("new")){
                $item.attr("data-new", "false");
            }
            if ($item.hasClass("data__item--active")){
                $wrapper.css("overflow", "hidden");
            }
            else {
                app.utils.onEndTransition($wrapper[0], function(){
                    $wrapper.css("overflow", "visible");
                });
            }
            $item.toggleClass("data__item--active");
        }
    });

    app.$dom.body.on("click", ".data__item__checked", function(){
        var $item = $(this).closest(".data__item");
        $item.toggleClass("data__item--checked");
    });

    app.$dom.body.on("click", ".modal__button__sendEmail", function(){
        $(".popup").attr("data-open", "true");
    });

    app.$dom.body.on("click", ".popup__close", function(){
        $(".popup").attr("data-open", "false");
    });

    app.$dom.body.on("click", ".data__item__edit", function(){
        $("#page").addClass("no-scroll");
        $(".modal").css("top", $("#page")[0].scrollTop + "px").attr("data-open", "true");
    });

    app.$dom.body.on("click", ".modal__button__close, .modal__footer", function(){
        $("#page").removeClass("no-scroll");
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
