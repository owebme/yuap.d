/* --- App interface --- */
var app = {
	sizes: {},
	utils: {},
	plugins: {},
	device: {}
};

/* --- Root blocks --- */
app.$dom = {
	html: $('html'),
	body: $('body'),
	document: $(document),
	window: $(window)
};

/* --- System vars --- */
app.system = {
	io: null,
	user: null,
	sid: null,
	apiUri: '/api/'
};

/* --- Events vars --- */
app.events = {
	click: document && 'ontouchstart' in document.documentElement ? 'tap' : 'click'
};

/* --- Prefixed styles --- */
app.prefixed = {
	'transform': Modernizr.prefixed('transform'),
	'transform-origin': Modernizr.prefixed('transformOrigin')
};

var $$ = window.Zepto || window.jQuery;

tempus.lang('ru');

app.tempus = tempus;
