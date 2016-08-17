(function(app, $, $dom, EV, _){

    app.nav = {

        ready: false,

        init: function(){

            if (WD.ready) return;

            WD.elem = $($root.tags["section-nav"].root);
            WD.panel = $($root.tags["section-panel"].root);
            WD.messenger = $root.tags["section-messenger"];
            if (WD.messenger) WD.messenger = $(WD.messenger.root);

            WD.ready = true;

            WD.render();
        },

        render: function(){

            WD.elem.on(EV.click, ".nav__menu__item", function(e){
                $(this).addClass("nav__menu__item--active")
                .siblings()
                .removeClass("nav__menu__item--active");
            });

            WD.panel.find(".panel__item__button--messenger").on(EV.click, function(e){
                SCREENS.nav("messenger");
            });

            if (WD.messenger){
                WD.messenger.find(".messenger__header__button__back").on(EV.click, function(e){
                    SCREENS.nav("main");
                });
            }
        },

        change: function(section){
            if (!WD.ready) return;
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
