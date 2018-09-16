// -------------------------------------------------------------------
// :: DISTRIBUTE
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-zip

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var zip = require('gulp-zip');


gulp.task('create-dist-zip', function() {

	return gulp.src([
		'dist/**/*',
		'!dist/*'
	])
		.pipe(plumber())
		.pipe(zip('package.zip'))
		.pipe(gulp.dest('dist'));

});
