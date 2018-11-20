'use strict';

process.env.deployLocation = '.temp';

var gulp = require('gulp');
var clean = require('./gulp/clean');
var copy = require('./gulp/copy');
var distribute = require('./gulp/distribute');
var semver = require('./gulp/semver');
var templates = require('./gulp/templates');
var styles = require('./gulp/styles');
var scripts = require('./gulp/scripts');


var gls = require('gulp-live-server');
var chokidar = require('chokidar');

var gulpServer = require('./server');

var build = require('./gulp/build');
require('./gulp/styles');
require('./gulp/scripts');

gulp.task('watch', gulp.series(['sass', 'scripts']), function () {
    var server = gls.new(gulpServer);
    server.start();

    // Watcher
    gulp.watch('development/sass/**/*.scss', ['sass', 'sass-lint']);
    gulp.watch('development/**/*.js', ['scripts']);

    gulp.watch([
        '.temp/**/*.js',
        'development/img/**',
        'development/fonts/*.*',
        '.temp/**/*.css'
    ], function (event) {
        server.notify(event);
    });

    // Templates
    chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true})
        .on('change', function (path) {
            server.notify({
                type: 'changed',
                path: __dirname.replace('gulp', '') + path
            });
        });

    chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true})
        .on('add', function (path) {
            server.stop().then(function () {
                server.start().then(function () {
                    server.notify.apply(server)
                });
            });
        });

    chokidar.watch('development/templates/**/*.njk', {ignoreInitial: true})
        .on('unlink', function (path) {

            server.stop().then(function () {
                server.start();
                server.notify.apply(server)
            });
        });

});


// -------------------------------------------------------------------
// :: GULP BUILD
// -------------------------------------------------------------------

gulp.task('default', gulp.series('watch'), function() {
	// Auto-open browser window
	// - https://www.npmjs.org/package/opn

	require('opn')('http://localhost:9000');
});


gulp.task('build', gulp.series('clean'), function(callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'deploy';

	run(['images', 'copy'], 'create-build', function () {
		console.log('##### BUILD SUCCEEDED! #####');
		callback();
	});
});

gulp.task('distribute', function (callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'dist';

	run([
		'copy',
		'sass-dist',
		'scripts-dist'
	], 'inject-versioning', 'create-dist-zip', function () {
		console.log('##### DISTRIBUTE SUCCEEDED! #####');
		callback();
	});

});


gulp.task('deploy', function (callback) {
	var run = require('run-sequence').use(gulp);

	run('semver', 'clean', 'build', function () {
		console.log('##### DEPLOY SUCCEEDED! #####');
		callback();
	});
});
