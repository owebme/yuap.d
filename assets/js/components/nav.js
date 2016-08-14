(function(app, $, $dom, EV, _){

    app.nav = {

        init: function(){

            WD.elem = $($root.tags["section-nav"].root);
            WD.panel = $($root.tags["section-panel"].root);
            WD.messenger = $($root.tags["section-messenger"].root);

            WD.render();
        },

        render: function(){

            WD.elem.on(EV.click, ".nav__menu__item", function(e){
                e.preventDefault();
                var url = this.getAttribute("href");
                $(this).addClass("nav__menu__item--active")
                .siblings()
                .removeClass("nav__menu__item--active");
                setTimeout(function(){
                    location.replace(url);
                }, 0);
            });

            WD.panel.find(".panel__item__button--messenger").on(EV.click, function(e){
                SCREENS.nav("messenger");
            });

            WD.messenger.find(".messenger__header__button__back").on(EV.click, function(e){
                SCREENS.nav("main");
            });
        },

        change: function(section){
            var $item = WD.elem.find(".nav__menu__item[data-item=" + section + "]");
            if (!$item.hasClass("nav__menu__item--active")){
                $item.addClass("nav__menu__item--active")
                .siblings()
                .removeClass("nav__menu__item--active");
            }
        }
    };

    var WD = app.nav;

})(app, $$, app.$dom, app.events, app.utils);
