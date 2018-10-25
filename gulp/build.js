// -------------------------------------------------------------------
// :: BUILD
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-uglify
//
// Additional optimizations
// - http://yeoman.io/blog/performance-optimization.html

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var replace = require('gulp-replace');

var merge = require('merge-stream');

gulp.task('create-build', gulp.series(['render-templates', 'sass-dist', 'scripts']), function() {

	var replaceCssExtentionsStream = gulp.src([
		'deploy/**/*.html'
	])
		.pipe(plumber())
		.pipe(replace('.css', '.min.css'))
		.pipe(gulp.dest('deploy'));


	return merge(replaceCssExtentionsStream);
});
