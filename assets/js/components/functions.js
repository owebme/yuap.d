(function(){

    app.$dom.body.on("click", ".dropdown__button", function(){
        var $button = $(this),
            $dropdown = $button.closest(".dropdown");

        if (!$dropdown.hasClass("open")){
            var $menu = $dropdown.find(".dropdown__menu"),
                select = $dropdown.data("select");

            if ($menu.data("align") === "center"){
                $menu.css("margin-left", (-($menu.width() / 2) + $button.width()) + "px");

            }
            $dropdown.on("click.item", "li", function(){
                if (select){
                    var $item = $(this);
                    $button.text($item.text());

                    $item.addClass("selected")
                    .siblings()
                    .removeClass("selected");
                }
                $dropdown.removeClass("open")
                .off("click.item");
            });
        }
        else {
            $dropdown.off("click.item");
        }
        $dropdown.toggleClass("open");
    });

})();
