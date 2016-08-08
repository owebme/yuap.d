(function(app){

	if (!app) {
		console.log("APP not found");
		return;
	}

	/* --- Root blocks --- */
	app.$dom = {
		root: $('#page'),
		html: $('html'),
		body: $('body'),
		document: $(document),
		window: $(window)
	};

	/* --- AJAX settings --- */
	// $.ajaxSetup({
	// 	method:"POST",
	// 	dataType:"json",
	// 	error:function(XMLHttpRequest){
	// 		console.log(XMLHttpRequest.responseText);
	// 	},
	// 	cache:false
	// });

	/* --- Urls --- */
	app.locHost = location.host;
	app.locProtocol = location.protocol;
	app.locHash = location.hash.replace('#/', '').replace('#!', '');
	app.locBase = location.toString().replace(/#.+$/, '');

	/* --- Events vars --- */
	app.events = {
		// click: document && 'ontouchstart' in document.documentElement ? 'tap' : 'click'
		click: 'click'
	};

	window.EV = app.events;

	/* --- Keys vars --- */
	app.keys = {
		LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40,
	    DEL: 8,
	    TAB: 9,
	    RETURN: 13,
	    ENTER: 13,
	    ESC: 27,
	    PAGEUP: 33,
	    PAGEDOWN: 34,
	    SPACE: 32
	};

	window.KEY = app.keys;

	/* --- Prefixed styles --- */
	app.prefixed = {
		'transform': Modernizr.prefixed('transform'),
		'transform-origin': Modernizr.prefixed('transformOrigin')
	};

	window.PREFIX = app.prefixed;

	window.$$ = window.Zepto || window.jQuery;

	if (window.store) window.locStore = window.store;

	/* --- Tempus (lib date) --- */
	tempus.lang('ru');

	app.tempus = tempus;

	/* --- Moment locale (lib date) --- */

	moment.locale('ru');

	/*** --- Dataset helper --- ***/
	$.fn.api = function(key){
		return this.data(key) ? this.data(key) : this.data(key, {}).data(key);
	};

})(window.app);
