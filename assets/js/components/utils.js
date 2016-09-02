(function(utils, $dom){

	utils.random = function(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	};

	utils.raf = function(callback){
		var func = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame;
		if (func) {
			return func(callback);
		} else {
			return window.setTimeout(callback, 1000 / 60);
		}
	};

	utils.caf = function(frame){
		var func = window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
		func(frame);
		frame = null;
	};

	utils.support = {transitions: Modernizr.csstransitions},
	utils.transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'};
	utils.transEndEventName = utils.transEndEventNames[Modernizr.prefixed('transition')];
	utils.animEndEventNames = {'WebkitAnimation': 'webkitAnimationEnd', 'MozAnimation': 'animationend', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend'};
	utils.animEndEventName = utils.animEndEventNames[Modernizr.prefixed('animation')];

	utils.onEndTransition = function(el, callback){
		var onEndCallbackFn = function( ev ) {
			if ( utils.support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( utils.transEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( utils.support.transitions ) {
			el.addEventListener( utils.transEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};

	utils.onEndAnimation = function(el, callback){
		var onEndCallbackFn = function( ev ) {
			if ( utils.support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( utils.animEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( utils.support.transitions ) {
			el.addEventListener( utils.animEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};

	utils.onLoadImage = function(image, callback) {
	    var loaded = false;
	    function loadHandler() {
	        if (loaded) return;
	        loaded = true;
			callback();
	    }
	    var img = new Image();
		img.src = image;
		img.onload = loadHandler;
	    if (img.complete) loadHandler();
	};

	utils.indexOf = function(arr, value, from) {
		for (var i = from || 0, l = (arr || []).length; i < l; i++) {
			if (arr[i] == value) return i;
		}
		return -1;
  	};

	utils.inArray = function(arr, value) {
		return utils.indexOf(arr, value) != -1;
	};

	utils.getScroll = function(scroll) {
        var x = scroll.x * -1,
            y = scroll.y * -1,
			maxX = scroll.maxScrollX * -1,
			maxY = scroll.maxScrollY * -1;
        return {x: x, y: y, maxX: maxX, maxY: maxY};
    };

	utils.throttle = function(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	};

	utils.debounce = function(fn, timeout, invokeAsap, ctx) {
		if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
			ctx = invokeAsap;
			invokeAsap = false;
		}

		var timer;

		return function() {

			var args = arguments;
            ctx = ctx || this;

			invokeAsap && !timer && fn.apply(ctx, args);

			clearTimeout(timer);

			timer = setTimeout(function() {
				!invokeAsap && fn.apply(ctx, args);
				timer = null;
			}, timeout);

		};
	};

	utils.cleanString = function(string) {
		return string.replace(/<\/?[^>]+>/g,'');
	};

	utils.trim = function(text) {
		return (text || '').replace(/^\s+|\s+$/g, '');
	};

	utils.clearField = function(field, def) {
		field = utils.trim(field);
		return field ? field : (def ? def : null);
	};

	utils.copyArray = function(arr) {
	  var newObj = !utils.isObject(arr) ? [] : {};
	  for (var i in arr) {
	    if (typeof(arr[i]) === 'object' && i !== 'prototype') {
	      newObj[i] = utils.copyArray(arr[i]);
	    } else {
	      newObj[i] = arr[i];
	    }
	  }
	  return newObj;
    };

	utils.isObject = function(obj) { return Object.prototype.toString.call(obj) === '[object Object]'};

	// utils.extend = function(parent, child) {
	//     var i;
	//
	//     child = child || {};
	//
	//     for (i in parent) {
	//       if (parent.hasOwnProperty(i)) {
	//         if (typeof parent[i] === 'object') {
	//           child[i] = (child[i] == null) ? {} : child[i];
	//           utils.extend(parent[i], child[i]);
	//         } else {
	//           child[i] = parent[i]; //primitive value can be copied over
	//         }
	//       }
	//     }
	//     return child;
	// };

	// function rand(mi, ma) { return Math.random() * (ma - mi + 1) + mi; }
	// function irand(mi, ma) { return Math.floor(rand(mi, ma)); }
	// function isFunction(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; }
	// function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
	// function isObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
	// function isEmpty(o) { if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
	// function vkNow() { return +new Date; }
	// function vkImage() { return window.Image ? (new Image()) : ce('img'); } // IE8 workaround
	// function trim(text) { return (text || '').replace(/^\s+|\s+$/g, ''); }
	// function stripHTML(text) { return text ? text.replace(/<(?:.|\s)*?>/g, '') : ''; }
	// function escapeRE(s) { return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : ''; }
	// function intval(value) {
	//   if (value === true) return 1;
	//   return parseInt(value) || 0;
	// }
	// function floatval(value) {
	//   if (value === true) return 1;
	//   return parseFloat(value) || 0;
	// }
	// function positive(value) {
	//   value = intval(value);
	//   return value < 0 ? 0 : value;
	// }
	//
	// function winToUtf(text) {
	//   return text.replace(/&#(\d\d+);/g, function(s, c) {
	//     c = intval(c);
	//     return (c >= 32) ? String.fromCharCode(c) : s;
	//   }).replace(/&quot;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
	// }
	// function replaceEntities(str) {
	//   return se('<textarea>' + ((str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').value;
	// }
	// function clean(str) {
	//   return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
	// }
	// function unclean(str) {
	//   return replaceEntities(str.replace(/\t/g, "\n"));
	// }

	if (window._) _.extend(_, utils);
	else window._ = utils;

	if (window.s) _.mixin(s.exports());

})(app.utils, app.$dom);
