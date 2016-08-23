(function(){

    /* --- App interface --- */

    window.app = {};

	window.DOMAIN = "http://192.168.1.64:3000";

	app = {
        router: {},
        nav: {},
        screens: {},
        sizes: {},
		utils: {},
		plugins: {},
        effects: {},
		device: {},
        help: {},
        constants: {},
        constant: function(name, value) {
            var i;

            if (typeof name === 'object') {
                for (i in name) {
                    this.constant(i, name[i]);
                }
                return true;
            }

            if (typeof value !== 'undefined') {
                if (typeof value === 'string') {
                    try { value = JSON.parse(value); } catch (e) {}
                }
                    app.constants[name] = value;
                    return true;
            }

            return app.constants[name];
        },
		url: function(url){
			return DOMAIN + url;
		},
        getHash: function() {
            return location.hash.replace('#/', '').replace('#!', '');
        },
        setUrl: function(url) {
            app.prevUrl = app.getHash();
            history.replaceState(null, null, app.url("/#/" + (url ? url : "")));
        },
        setTitle: function(caption) {
            if (caption) {
                var account = this.constant('account');
                document.title = 'Yuap: ' + caption + ', ' + account.name;
            }
        },
        fetch: function(methods){
            var listMain = [],
                listSecond = [],
                parts = methods.split(", ");

            return new Promise(function(resolve, reject){
                for (i = 0; i < parts.length; i++) {
                    if (_.isFunction(app.fetch.API[parts[i]])) {
                        listMain.push(parts[i]);
                    }
                }
                if (parts.length !== listMain.length){
                    listSecond = _.without(parts, listMain);
                }
                Promise.all(listMain.map(app.fetch.API).concat(listSecond.map(app.request)))
                .then(function(results) {
                    resolve(results);
                })
            });
        },
    	request: function(method, params){
        	return new Promise(function(resolve, reject){
                var url = _.underscored(method)
                            .replace(/^(get|set|add|del)/g, "")
                            .replace(/_/g, "/"),
                    type = null;

                if (method.match(/^get/)) type = 'GET';
                else if (method.match(/^set/)) type = 'PUT';
                else if (method.match(/^add/)) type = 'POST';
                else if (method.match(/^del/)) type = 'DELETE';

                if (!type) {
                    reject('Error type request: ' + method);
                    return;
                }

        		var xhr = new XMLHttpRequest();
                xhr.open(type, app.url("/api") + url, true);
        		xhr.setRequestHeader("Accept", "application/json");
        		xhr.setRequestHeader("Content-Type", "application/json");

                try {
                    if (app.request.list && app.request.list.method === method && app.request.list.params == JSON.stringify(params)) {
                        app.request.list.xhr.abort();
                    }
                    xhr.send(params ? JSON.stringify(params) : {});
                } catch(e){}

        		xhr.onload = function(e) {
                    try {
            			if (this.status == 200) {
            				var data = JSON.parse(this.response);
            				if (data.status === "OK" && data.result){
                                resolve(data.result);
                            }
            				else resolve(data);
            			}
            			else {
                            app.errHandler(this.status);
            				var error = new Error(this.statusText);
            				error.code = this.status;
            				reject(error);
            			}
                    } catch(e){}
                    app.request.list = {};
        		};

        		xhr.onerror = function() {
        			reject(new Error("Network Error"));
        		};

                try {
                    app.request.list = {
                        method: method,
                        xhr: xhr,
                        params: JSON.stringify(params)
                    };
                } catch(e){}
        	});
    	},
        errHandler: function(status){
            if (status == 401){
                alert("Авторизируйтесь снова");
            }
            else {
                alert("Ошибка проведения операции повторите ее чуть позже");
            }
        }
	};

    window.onerror = function(msg, url, line) {
    	if (app && app.updater){
    		var d = new Date();
    		var hour = d.getHours();
    		var minute = d.getMinutes();
    		var seconds = d.getSeconds();
    		var month = d.getMonth() + 1;
    		var day = d.getDate();
    		var year = d.getFullYear();
    		if (hour < 10) hour = "0"+hour;
    		if (minute < 10) minute = "0"+minute;
    		if (seconds < 10) seconds = "0"+seconds;
    		if (month < 10) month = "0"+month;
    		if (day < 10) day = "0"+day;

    		var operator = false;
    		if (app.operator) operator = app.operator.jabber;
    		if (window.process == null) process = {};

    		app.request("log", {
    			operator: operator,
    			msg: msg,
    			line: line,
    			url: url,
    			date: year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds,
    			uptime: process.uptime != null ? process.uptime() : "",
    			execPath: process.execPath != null ? process.execPath : "",
    			version: app.updater.getCurrentVersion(),
    			platform: app.updater.getPlatform(),
    			type: "error"
    		});
    	}
    };

})();
