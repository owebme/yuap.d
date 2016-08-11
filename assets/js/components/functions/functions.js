(function(){

    app.$dom.body.on(EV.click + ".filterGroup", ".sidebar__filter__title", function(){
        var $button = $(this),
            $item = $button.closest(".sidebar__filter__item"),
            $container = $button.next(".sidebar__filter__container");

        $container.css("height", $container.children().outerHeight() + "px");

        if ($item.hasClass("open")){
            setTimeout(function(){
                $container.removeAttr("style");
            }, 20);
        }
        $item.toggleClass("open");
    });

    // app.$dom.body.on(EV.click + ".sidebarSwither", ".sidebarSwither", function(){
    //     var $swither = $(this),
    //         $panel = $swither.closest(".data__menu__left"),
    //         $wrapper = $(".content__wrapper"),
    //         $dataList = $(".data__list"),
    //         $dashboard = $(".dashboard");
    //
    //     if ($swither.hasClass("sidebarSwither--active")){
    //         $swither.removeClass("sidebarSwither--active");
    //         $panel.removeClass("slide-right");
    //         $wrapper.removeClass("slide-right");
    //         $dataList.removeClass("col-md-14 col-lg-13").addClass("col-md-13 col-lg-12");
    //         $dashboard.removeClass("col-md-10 col-lg-11").addClass("col-md-11 col-lg-12");
    //     }
    //     else {
    //         $swither.addClass("sidebarSwither--active");
    //         $panel.addClass("slide-right");
    //         $wrapper.addClass("slide-right");
    //         $dataList.removeClass("col-md-13 col-lg-12").addClass("col-md-14 col-lg-13");
    //         $dashboard.removeClass("col-md-11 col-lg-12").addClass("col-md-10 col-lg-11");
    //     }
    // });

    if (app.device.isMobile){

        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }

        var body = document.body,
            timer;

        window.addEventListener('scroll', function(){
            clearTimeout(timer);
            if (!body.classList.contains('disable__hover')){
                body.classList.add('disable__hover');
            }

            timer = setTimeout(function(){
                body.classList.remove('disable__hover')
            }, 500);

        }, false);
    }

})();
