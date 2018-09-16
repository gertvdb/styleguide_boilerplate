// -------------------------------------------------------------------
// :: GULP SERVER
// -------------------------------------------------------------------
var gulp = require('gulp');
var run = require('run-sequence');
var gls = require('gulp-live-server');
var chokidar = require('chokidar');

gulp.task('watch', function(callback) {
	gulp.run(['sass','scripts']);
	var server = gls.new('server.js');
	server.start();

 // Watcher
	gulp.watch('development/fonts/icon-sources/*.svg', ['iconfont']);
	gulp.watch('development/sass/**/*.scss', ['sass', 'sass-lint']);
	gulp.watch('development/**/*.js', ['scripts']);

	gulp.watch([
		'.temp/**/*.js',
		'development/img/**',
		'development/fonts/*.*',
		'.temp/**/*.css'
	], function(event) {
		server.notify(event);
  });

	// Templates
	chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true}).on('change', function(path) {
		server.notify({
			type: 'changed',
			path: __dirname.replace('gulp', '') + path
		});
	});

	chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true}).on('add', function(path) {
	  server.stop().then(function () {
		   server.start().then(function() {
				  server.notify.apply(server)
			 });
		});
	});

	chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true}).on('unlink', function(path) {

		server.stop().then(function () {
		   server.start();
			 server.notify.apply(server)
		});
	});

});
