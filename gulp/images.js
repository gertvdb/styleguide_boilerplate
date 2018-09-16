// -------------------------------------------------------------------
// :: IMAGES
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-imagemin

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

gulp.task('images', function() {

	var options = {
		optimizationLevel: 2,
		progressive: true,
		interlaced: true,
		verbose: true
	};

	var imgStream = gulp.src('development/img/**')
		.pipe(plumber())
		.pipe(imagemin(options))
		.pipe(gulp.dest(process.env.deployLocation + '/img'));

	return merge(imgStream)

});
