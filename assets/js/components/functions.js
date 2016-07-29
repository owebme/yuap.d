(function(){

    app.$dom.body.on("click.dropdown", ".dropdown__button", function(){
        var $button = $(this),
            $dropdown = $button.closest(".dropdown");

        if (!$dropdown.hasClass("open")){
            var $menu = $dropdown.find(".dropdown__menu"),
                type = $dropdown.data("type");

            if ($menu.data("align") && $menu.data("align").match(/center/)){
                $menu.css("margin-left", (-($menu.width() / 2) + $button.width()) + "px");
            }
            $dropdown.on("click.item", "li", function(){
                var $item = $(this);
                if (type === "select"){
                    $button.text($item.text());
                    $item.addClass("selected")
                    .siblings()
                    .removeClass("selected");
                }
                else if (type === "radio"){
                    $item.toggleClass("selected");
                }
                if (type !== "radio"){
                    $dropdown.removeClass("open")
                    .off("click.item");
                    app.$dom.body.off("click.dropdownClose");
                }
            });
            app.$dom.body.on("click.dropdownClose", function(e){
                if (e.target.nodeName !== "LI"){
                    $dropdown.removeClass("open")
                    .off("click.item");
                    app.$dom.body.off("click.dropdownClose");
                }
            });
            $dropdown.addClass("open");
        }
    });

    app.$dom.body.on("click.filterGroup", ".sidebar__filter__title", function(){
        var $button = $(this),
            $item = $button.closest(".sidebar__filter__item"),
            $container = $button.next(".sidebar__filter__container");

        $container.css("height", $container.children().height() + "px");

        if ($item.hasClass("open")){
            setTimeout(function(){
                $container.removeAttr("style");
            }, 20);
        }
        $item.toggleClass("open");
    });

    app.$dom.body.on("click.checkbox", ".checkbox", function(){
        $(this).toggleClass("checked");
    });

    // var body = document.body,
    //     timer;
    //
    // window.addEventListener('scroll', function(){
    //     clearTimeout(timer);
    //     if (!body.classList.contains('disable__hover')){
    //         body.classList.add('disable__hover');
    //     }
    //
    //     timer = setTimeout(function(){
    //         body.classList.remove('disable__hover')
    //     }, 500);
    //
    // }, false);

})();
