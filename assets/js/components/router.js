(function(app, $, $dom, EV, _){

    app.router = {

        base: "#",

        init: function(){

            riot.route('/', function(){
                Nav.change("inbox");
                Router.mount('section-data-content');
            });

            riot.route('/contacts', function(){
                Nav.change("contacts");
                Router.mount('section-contacts-content');
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        mount: function(tag){
            if (app.device.isMobile){
                $Loader.show();
                setTimeout(function(){
                    CONTENT = riot.mount("section-content", tag)[0];
                    CONTENT.on("updated", function(e, s){
                        $Loader.hide();
                    });
                }, 50);
            }
            else {
                riot.mount("section-content", tag)[0];
            }
        }
    };

    var Nav = app.nav,
        Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
