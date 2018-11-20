// -------------------------------------------------------------------
// :: GENERAL
// -------------------------------------------------------------------
// We have javascript - remove the no-js class

document.documentElement.className = document.documentElement.className.replace('no-js', '');


// -------------------------------------------------------------------
// :: MAKE BUTTONS RESPOND FASTER
// -------------------------------------------------------------------
// Make buttons respond immediately (showing a different state)
// - http://www.mobify.com/blog/beginners-guide-to-perceived-performance

if('ontouchstart' in document) {
	document.addEventListener('touchend', function() {}, true);
} else {
	document.body.className += 'no-touch';
}