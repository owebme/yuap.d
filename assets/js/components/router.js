(function(app, $, $dom, EV, _){

    app.router = {

        base: "#/",

        start: false,

        url: "/",

        init: function(){

            Router.history.init();

            riot.route('/', function(){
                Router.routes.index();
                if (SCREENS.state !== "main") SCREENS.nav("main");
            });

            riot.route('/profile', function(){
                $Sidebar.show("profile");
                if (!Router.start) Router.routes.index();
            });

            riot.route('/profile/*', function(section){
                if (section == "avatars"){
                    $Popup.show("profile-avatars");
                }
                else {
                    $Sidebar.show("profile", section);
                }
                if (!Router.start) {
                    Router.routes.index();
                }
            });

            var routes = riot.route.create();
            routes(function(section){
                if (section === "contacts"){
                    Router.routes.contacts();
                }
                if (!Router.start){
                    if (section === "contact" || section === "control"){
                        Router.routes.contacts();
                    }
                }
            });

            riot.route('/contacts/export', function(){
                $Popup.show("contacts-export");
            });

            riot.route('/contacts/export/settings', function(){
                $Popup.show("contacts-export-settings");
            });

            var routeContact = riot.route.create();
            routeContact('/contact/*', function(id){
                $Contact.show(id);
            });

            var routeContactTags = riot.route.create();
            routeContactTags('/contact/*/tags', function(id){
                $Popup.show("contact-tags", $store.data.get({"_id": id}));
                $Contact.show(id);
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
                    Router.url = "/";
                }
            },
            contacts: function(){
                if (!window.$Contacts || !$Contacts.tag.isMounted){
                    Nav.change("contacts");
                    Router.mount('section-contacts');
                    Router.url = "/contacts";
                }
            },
            events: function(){
                if (!window.$Events || !$Events.tag.isMounted){
                    Nav.change("events");
                    Router.mount('section-events');
                    Router.url = "/events";
                }
            }
        },

        history: {

            list: [],

            add: function(){
                Router.history.list.push("/" + Router.getHash());
            },

            init: function(){
                $dom.window.on("hashchange", function(e){
                    Router.history.add();
                });
            }
        },

        getHash: function() {
            return location.hash.replace('#/', '').replace('#!', '');
        },

        nav: function(url){
            riot.route(url);
            Router.history.add();
        },

        set: function(url, title){
            history.pushState(null, title ? title : null, app.url("/#" + (url ? url : "")));
            //history.replaceState(null, title ? title : null, app.url("/#" + (url ? url : "")));
        },

        back: function(){
            if (Router.history.list.length){
                window.history.back();
            }
            else {
                var url = Router.getHash();
                if (url.match(/contact/)){
                    Router.nav("/contacts");
                }
                else {
                    Router.nav("/");
                }
            }
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
                app.$dom.body.addClass("appLoading");
                var section = riot.mount("section-content", tag)[0];
                section.one("updated", function(){
                    Router.start = true;
                    setTimeout(function(){
                        app.$dom.body
                        .removeClass("appLoading")
                        .addClass("isLoading");
                    }, 50);
                });
            }
        }
    };

    var Nav = app.nav,
        Router = app.router;

    $Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
