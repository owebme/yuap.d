(function(app, $, $dom, EV, _){

    app.router = {

        base: "#",

        start: false,

        init: function(){

            riot.route('/', function(){
                Nav.change("inbox");
                Router.mount('section-data');
            });

            riot.route('/contacts', function(){
                Nav.change("contacts");
                Router.mount('section-contacts');
            });

            riot.route('/messenger', function(){
                Router.mount('section-data');
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        mount: function(tag){
            if (Router.start){
                $Loader.show().then(function(){
                    var section = riot.mount("section-content", tag)[0];
                    section.on("updated", function(){
                        $Loader.hide();
                    });
                });
            }
            else {
                riot.mount("section-content", tag)[0];
                Router.start = true;
            }
        }
    };

    var Nav = app.nav,
        Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
