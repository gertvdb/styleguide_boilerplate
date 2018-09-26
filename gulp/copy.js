// -------------------------------------------------------------------
// :: COPY
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-rename

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var merge = require('merge-stream');

gulp.task('copy', function () {

	var htaccessStream;

	if (process.env.deployLocation == 'dist') {
		htaccessStream = gulp.src('development/meta/__cdn_htaccess.txt')
			.pipe(plumber())
			.pipe(rename('.htaccess'))
			.pipe(gulp.dest(process.env.deployLocation));
	}
	else {
		htaccessStream = gulp.src('development/meta/__htaccess.txt')
			.pipe(plumber())
			.pipe(rename('.htaccess'))
			.pipe(gulp.dest(process.env.deployLocation));
	}


	var browserConfigStream = gulp.src('development/meta/__browserconfig.xml')
		.pipe(plumber())
		.pipe(rename('browserconfig.xml'))
		.pipe(gulp.dest(process.env.deployLocation));

	var vendorScriptsStream = gulp.src('development/js/vendor/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest(process.env.deployLocation + '/js/vendor'));

	var fontsStream = gulp.src('development/fonts/*.*')
		.pipe(plumber())
		.pipe(gulp.dest(process.env.deployLocation + '/fonts'));

	return merge(htaccessStream, browserConfigStream, vendorScriptsStream, fontsStream);

});
