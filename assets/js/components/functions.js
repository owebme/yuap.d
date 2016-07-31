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

    window.help = {
        numOrder: {
            pos: "up-left",
            text: "Порядковый номер заявки"
        },
        type: {
            pos: "up-over",
            text: "Тип заявки: звонки, чат, отзывы и др."
        },
        cover: {
            pos: "up",
            text: "Обложка, первая буква города или имени клиента",
            align: "center"
        },
        visits: {
            pos: "up-over",
            text: "Количество совершенных визитов на сайт клиентом"
        },
        adv: {
            pos: "up",
            text: "Перешли по рекламе, ₽ подсветит зеленым цветом",
            align: "center"
        },
        time: {
            pos: "up-over",
            text: "Проведенное время клиентом, в последний визит",
            align: "center"
        },
        date: {
            pos: "up-right",
            text: "Дата или время обращения заявки"
        },
        options: {
            pos: "center-right",
            text: "Функциональные операции: редактирование, сменить статус и др."
        },
        pages: {
            pos: "center-right",
            text: "Количество просмотренных страниц, в последний визит"
        },
        pageAction: {
            pos: "down-right",
            text: "Страница совершенного действия"
        },
        pageStart: {
            pos: "down-over",
            text: "С какой страница начался просмотр сайта",
            align: "center"
        },
        source: {
            pos: "down",
            text: "Откуда перешли на ваш сайт"
        },
        operator: {
            pos: "down-left",
            text: "Имя оператора обработавшего заявку"
        }
    };

    app.$dom.body.on("click", ".data__item__help", function(){
        getHelp($(this).closest(".data__item"), help);
    });

    app.$dom.body.on("click", ".object__help", function(e){
        var $item = $(e.currentTarget);
        $item.removeClass("object__help--active");
        app.utils.onEndTransition($item[0], function(){
            $("#page").removeClass("no-scroll");
            $item.remove();
        });
    });

    window.getHelp = function($elem, data){
        var $page = $("#page"),
            $node = $elem.clone(),
            scrollTop = $page[0].scrollTop,
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
            $page.animate({scrollTop:scroll}, duration, function(){
                $page.addClass("no-scroll");
                $wrapper.css("top", scroll + "px")
                .addClass("object__help--active");
            });
        }
        else {
            setTimeout(function(){
                $page.addClass("no-scroll");
                $wrapper.css("top", scroll + "px")
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

    window.helpOptions = {
        viewed: {
            pos: "center-left",
            text: "Отметить как просмотренные"
        },
        important: {
            pos: "down-left",
            text: "Отметить как наиболее важные",
            offset: {
                top: "5px",
                left: "25px"
            }
        },
        remove: {
            pos: "down-over",
            text: "Удалить выбранные",
            align: "center"
        },
        folder: {
            pos: "down-right",
            text: "Изменить статус",
            offset: {
                top: "5px",
                left: "-10px"
            }
        },
        selectAll: {
            pos: "center-right",
            text: "Отметить все из текущего списка"
        }
    };

    app.$dom.body.on("click", ".data__panel__options__help", function(){
        getHelp($(".data__panel__options__right"), helpOptions);
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
