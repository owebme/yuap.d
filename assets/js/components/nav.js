(function(app, $, $dom, EV, _){

    app.nav = {

        init: function(){

            WD.elem = $($root.tags["section-nav"].root);
            WD.panel = $($root.tags["section-panel"].root);

            WD.render();
        },

        render: function(){

            WD.elem.on(EV.click, ".nav__menu__item", function(){
                $(this).addClass("nav__menu__item--active")
                .siblings()
                .removeClass("nav__menu__item--active");
            });

        },

        change: function(section){
            WD.elem.find(".nav__menu__item[data-item=" + section + "]")
            .addClass("nav__menu__item--active")
            .siblings()
            .removeClass("nav__menu__item--active");
        }
    };

    var WD = app.nav;

})(app, $$, app.$dom, app.events, app.utils);
