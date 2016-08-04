(function(){

    if (!app) return;

    app.$dom.body.on("click", ".getHelp", function(){
        var $button = $(this);
            item = $button.attr("help-item"),
            data = $button.attr("help-data");

        if (item && data && app.help[data]){
            var $item = $(this).closest(item);
            if ($item.length){
                app.help.get($item, app.help[data]);
            }
            else {
                console.log("Object not found help:" + data);
            }
        }
        else {
            console.log("Not get help: " + data);
        }
    });

    app.$dom.body.on("click", ".object__help", function(e){
        var $item = $(e.currentTarget);
        $item.removeClass("object__help--active");
        app.utils.onEndTransition($item[0], function(){
            $item.remove();
        });
    });

    app.help.get = function($elem, data){
        var $page = app.$dom.root,
            $container = $(".screen__main__inner");
            $node = $elem.clone(),
            scrollTop = $container[0].scrollTop,
            scrollDelta = 200,
            offset = {
                top: scrollTop + $elem.offset().top,
                left: $elem.offset().left
            },
            scroll = offset.top - scrollDelta,
            $wrapper = $('<div class="object__help"></div>');

        if (scroll < 0) scroll = 0;
        var duration = delta = scrollTop - scroll;
        if (duration > 400) duration = 400;
        else duration = duration * 2;
        if (duration < 200) duration = 200;
        offset.top = offset.top - scroll;

        if (delta !== 0){
            $container.animate({scrollTop:scroll}, duration, function(){
                $wrapper.css("top", "0px")
                .addClass("object__help--active");
            });
        }
        else {
            setTimeout(function(){
                $wrapper.css("top", "0px")
                .addClass("object__help--active");
            }, 20);
        }

        $node.css({
            "top": offset.top + "px",
            "left": offset.left + "px",
            "width": $elem.width() + "px",
            "height": $elem.height() + "px"
        }).addClass("object__help__item data__item--active");

        $wrapper.append($node);

        $page.append($wrapper);

        $node.find("[data-help]").each(function(){
            var $item = $(this),
                name = this.getAttribute("data-help");

            if (!data[name]) return;

            var pos = $item.css("position");

            if (pos !== "absolute" && pos !== "relative") $item.css("position", "relative");

            var $tooltip = $('<div class="object__help__tooltip" data-pos="' + data[name].pos + '">' + data[name].text + '</div>');

            if (data[name].align) $tooltip.attr("data-align", data[name].align);
            if (data[name].width) $tooltip.css("width", data[name].width);
            if (data[name].offset){
                 if (data[name].offset.top) $tooltip.css("margin-top", data[name].offset.top);
                 if (data[name].offset.bottom) $tooltip.css("margin-bottom", data[name].offset.bottom);
                 if (data[name].offset.left) $tooltip.css("margin-left", data[name].offset.left);
                 if (data[name].offset.right) $tooltip.css("margin-right", data[name].offset.right);
            }
            $item.append($tooltip);
        });
    };

})();
