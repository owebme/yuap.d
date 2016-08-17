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

})();
