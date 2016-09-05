(function(app, $, $dom, EV, _){

    app.router = {

        base: "#/",

        start: false,

        init: function(){

            Router.history.init();

            riot.route('/', function(){
                Router.routes.index();
                if (SCREENS.state !== "main") SCREENS.nav("main");
            });

            riot.route('/contacts', function(){
                Router.routes.contacts();
            });

            riot.route('/contacts/export', function(){
                $Popup.show("contacts-export");
                Router.routes.contacts();
            });

            riot.route('/contacts/export/settings', function(){
                $Popup.show("contacts-export-settings");
                Router.routes.contacts();
            });

            var routeContact = riot.route.create();
            routeContact('/contact/*', function(id){
                $Contact.show(id);
                Router.routes.contacts();
            });

            var routeContactTags = riot.route.create();
            routeContactTags('/contact/*/tags', function(id){
                $Popup.show("contact-tags", $store.data.get({"_id": id}));
            });

            riot.route('/control/status', function(){
                $Popup.show("manager-status");
            });

            riot.route('/control/tags', function(){
                $Popup.show("manager-tags");
            });

            riot.route('/events', function(){
                Router.routes.events();
            });

            riot.route('/messenger', function(){
                if (!Router.start) Router.routes.index();
                else SCREENS.nav("messenger");
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        routes: {
            index: function(){
                if (!window.$Data || !$Data.tag.isMounted){
                    Nav.change("inbox");
                    Router.mount('section-data');
                }
            },
            contacts: function(){
                if (!window.$Contacts || !$Contacts.tag.isMounted){
                    Nav.change("contacts");
                    Router.mount('section-contacts');
                }
            },
            events: function(){
                if (!window.$Events || !$Events.tag.isMounted){
                    Nav.change("events");
                    Router.mount('section-events');
                }
            }
        },

        history: {

            list: [],

            init: function(){
                $dom.window.on("hashchange", function(){
                    Router.history.list.push("/" + Router.getHash());
                });
            }
        },

        getHash: function() {
            return location.hash.replace('#/', '').replace('#!', '');
        },

        nav: function(url){
            riot.route(url);
        },

        set: function(url, title){
            history.pushState(null, title ? title : null, app.url("/#" + (url ? url : "")));
            //history.replaceState(null, title ? title : null, app.url("/#" + (url ? url : "")));
        },

        back: function(){
            window.history.back();
        },

        next: function(){
            window.history.forward();
        },

        mount: function(tag){
            if (Router.start){
                $Loader.show().then(function(){
                    var section = riot.mount("section-content", tag)[0];
                    section.one("updated", function(){
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

    $Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
