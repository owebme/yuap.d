(function(app, $, $dom, EV, _){

    app.screens = {

        ready: false,

        items: [],

        state: null,

        init: function(screen){

            if (WD.ready) return;

            WD.elem = app.$dom.root = $("#page");

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
                spaceClass: 'horizontal__space',
                activeClass: 'screen--active',
                duration: app.device.isMobile ? 375 : 450
            });

            (function animationLoop(){
                app.utils.raf(animationLoop);
                var scroll = app.utils.getScroll(WD.marquee);
            })();

            var scroll = WD.marquee.scroll;

            scroll.on('scrollEnd', function(){
                WD.state = WD.marquee.section;
                WD.change(WD.state);
            });

            if (screen) {
                WD.nav(screen, 0);
                WD.change(screen);
            }

            WD.ready = true;
        },

        change: function(screen){

            console.log(screen);

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
