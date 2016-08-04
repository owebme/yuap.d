(function(){

    /* --- App interface --- */

    window.app = {};

	window.DOMAIN = "http://192.168.1.70:3000";

	app = {
        screens: {},
        sizes: {},
		utils: {},
		plugins: {},
        effects: {},
		device: {},
        help: {},
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
                    constants[name] = value;
                    return true;
            }

            return constants[name];
        },
		url: function(url){
			return DOMAIN + url;
		},
        setTitle: function(caption) {
            if (caption) {
                var account = this.constant('account');
                document.title = 'Yuap: ' + caption + ', ' + account.name;
            }
        },
    	request: function(url, method, params){
        	return new Promise(function(resolve, reject){

        		var xhr = new XMLHttpRequest();

                if (app.request.list && app.request.list.method === method) {
                    app.request.list.xhr.abort();
                }

        		xhr.open(method, app.url("/api/") + url, true);
        		xhr.setRequestHeader("Accept", "application/json");
        		xhr.setRequestHeader("Content-Type", "application/json");

        		xhr.send(params ? JSON.stringify(params) : {});

        		xhr.onload = function(e) {
        			if (this.status == 200) {
        				var data = JSON.parse(this.response);
        				if (data.result) resolve(data.result);
        				else resolve(data);
        			}
        			else {
        				var error = new Error(this.statusText);
        				error.code = this.status;
        				reject(error);
        			}
                    app.request.list = {};
        		};

        		xhr.onerror = function() {
        			reject(new Error("Network Error"));
        		};

                app.request.list = {
                    method: method,
                    xhr: xhr
                };
        	});
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
