// -------------------------------------------------------------------
// :: SCRIPTS
// -------------------------------------------------------------------

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {

	return gulp.src('development/js/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest(process.env.deployLocation + '/js'));

});


var merge = require('merge-stream');
var scriptsConfig = require('../development/js/_build-config.json');

gulp.task('scripts-dist', function() {
	var merged = merge();

	for(var scriptName in scriptsConfig){
		merged.add(
			gulp.src(scriptsConfig[scriptName])
				.pipe(plumber())
				.pipe(concat(scriptName+'.min.js'))
				.pipe(uglify({
					mangle: false,
					compress: {
						drop_debugger: true,
						drop_console: true
					}
				}))
				.pipe(gulp.dest('dist/js'))
		);
	}

	return merged;

});
