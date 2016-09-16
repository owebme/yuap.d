(function(Control){

    Control = function(item){
        this.tag = $root.tags["section-" + item];
        this.tag.active = null;
        this.tag.activeElem = null;
        this.tag.tags = {};
        this.tag.scope = $$(this.tag.root);
        this.tag.scopeName = item;
    };

    Control.prototype = {

        add: function(name, data, callback){
            var $ = this.tag;

            if (!$.tags[name]){
                var $elem = $$('<' + $.scopeName + '-' + name + '>').appendTo($.scope),
                    regReplace = $.scopeName + "-";

                $.tags[name] = riot.mount($elem, $.scopeName + '-' + name, {data: data})[0];

                $.tags[name].name = $.tags[name].root.tagName.toLowerCase().replace(regReplace, '');

                if (callback && $.tags[name]){
                    $.tags[name].one("updated", function(){
                        $.tags[name].el = $$($.tags[name].root);
                        callback();
                    });
                }
            }
        },

        remove: function(name){
            var $ = this.tag;

            if (!$.tags[name]){
                $.tags[name].unmount();
                delete $.tags[name];
            }
        },

        show: function(name, data){
            var _this = this,
                $ = this.tag;

            if ($.tags[name]){
                _this.hideActive(name);
                if ($.tags[name].init){
                    $.tags[name].init(data);
                }
                _this.inShow(name);
            }
            else {
                _this.add(name, data, function(){
                    _this.hideActive(name);
                    setTimeout(function(){
                        _this.inShow(name);
                    }, 5);
                });
            }
        },

        inShow: function(elem){
            var _this = this,
                $ = this.tag;

            if (elem && $.tags[elem] && !$.tags[elem].active){
                _this.elemShow($.tags[elem]);
                if (!$.active) $.tags[elem].update();
            }
            if (!$.active){
                $.active = true;
                $.update();

                if (!app.device.isMobile){
                    app.$dom.document.on("keydown.close" + $.scopeName, function(e){
                        if (e.which == KEY.ESC){
                            if ($.scopeName == "sidebar" && $Popup.tag.active) return;
                             _this.hide($.scopeName == "sidebar" ? true : false);
                        }
                    });
                }
            }
        },

        inHide: function(){
            var $ = this.tag;

            if ($.active){
                $.active = false;
                $.activeElem = null;
                $.update();
                app.$dom.document.off("keydown.close" + $.scopeName);
            }
        },

        elemShow: function(elem){
            if (!elem.active){
                elem.active = true;
                elem.el.attr("data-active", "true");
                this.tag.activeElem = elem.name;
            }
        },

        elemHide: function(elem){
            if (elem.active){
                elem.active = false;
                elem.el.attr("data-active", "false");
            }
        },

        isActive: function(){
            return _.where(this.tag.tags, {"active": true}).length;
        },

        hideActive: function(elem){
            var _this = this,
                $ = this.tag,
                prevSidebar = _.findWhere($.tags, {"elemOpen": elem});

            if (prevSidebar){
                _this.elemHide($.tags[elem]);
                _this.elemShow(prevSidebar);
                delete prevSidebar.elemOpen;
            }
            else {
                _.each($.tags, function(item){
                    if (item.active) {
                        if ($.tags[elem] && !$.tags[elem].active){
                            item.elemOpen = elem;
                        }
                        _this.elemHide(item);
                    }
                });
            }

            setTimeout(function(){
                if (!_this.isActive()) _this.inHide();
            }, 20);
        },

        hide: function(force){
            this.hideActive(this.tag.activeElem);

            if (force){
                $Router.nav($Router.url);
            }
            else {
                $Router.back();
            }
        }
    };

    app.control = Control;

})(app.control);
