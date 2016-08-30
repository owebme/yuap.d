(function(app, $, $dom, EV, _){

    app.screens = {

        ready: false,

        items: [],

        index: null,

        state: null,

        init: function(screen){

            if (WD.ready) return;

            if (!screen && location.href.match(/\/messenger/)){
                screen = "messenger";
            }

            WD.elem = app.$dom.root;

            var index = 100,
                i = 0;

            WD.elem.find(".screen").each(function() {
                WD.items[this.getAttribute("data-marquee")] = i;
                if (i === 0) {
                    WD.state = this.getAttribute("data-marquee");
                    this.style.opacity = "1";
                    if (!screen) WD.change(WD.state);
                }
                this.style.zIndex = index;
                index--;
                i++;
            });

            WD.marquee = app.plugins.marquee(WD.elem, {
                vertical: false,
                screens: '.screen',
                effect: 'space',
                mousewheel: false,
                disableMouse: true,
                spaceClass: 'horizontal__space',
                activeClass: 'screen--active',
                duration: app.device.isMobile ? 375 : 450
            });

            (function animationLoop(){
                app.utils.raf(animationLoop);
                var scroll = app.utils.getScroll(WD.marquee);
            })();

            var scroll = WD.marquee.scroll;

            scroll.on('scrollStart', function(){
                WD.index = WD.marquee.index;
            });
            scroll.on('scrollEnd', function(){
                if (WD.index !== WD.marquee.index){
                    WD.state = WD.marquee.section;
                    if (WD.state === "main") $Router.back();
                    else if (WD.state === "messenger") $Router.set("/messenger");
                }
            });

            if (screen) {
                WD.nav(screen, 0);
                WD.change(screen);
            }

            WD.ready = true;
        },

        change: function(screen){

            WD.elem.find(".screen__" + screen)
            .addClass("screen--active")
            .siblings().removeClass("screen--active");
        },

        nav: function(screen, duration){
            if (!screen) return;
            var i = WD.items[screen];
            if (i !== undefined && WD.state != screen) {
                WD.state = screen;
                WD.marquee.scrollTo(i, duration !== undefined ? duration : undefined);
            }
        }
    };

    var WD = app.screens;

})(app, $$, app.$dom, app.events, app.utils);
