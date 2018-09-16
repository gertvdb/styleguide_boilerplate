// -------------------------------------------------------------------
// :: CLEAN
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/del

var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function(){

	return gulp.src([
			'deploy',
			'dist',
			'.sass-cache',
			'.temp'
		], {read: false})
		.pipe(clean());

});


gulp.task('clean-dist', function(){

	return gulp.src([
			'deliverables/*',
			'!deliverables/.git'
		], {read: false})
		.pipe(clean());

});