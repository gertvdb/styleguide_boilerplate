// -------------------------------------------------------------------
// :: REQUESTANIMATIONFRAME POLYFILL
// -------------------------------------------------------------------
// https://davidwalsh.name/requestanimationframe-shim

var rAF = (function() {

	'use strict';

	return window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| function(callback) { return setTimeout(callback, 1000 / 60); };

}());