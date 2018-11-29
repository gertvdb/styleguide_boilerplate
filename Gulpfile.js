'use strict';

process.env.deployLocation = '.temp';

const opn = require('opn');
const runSequence = require('gulp4-run-sequence');

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
    opn('http://localhost:9000');
});

gulp.task('build', (done) => {
    process.env.deployLocation = 'deploy';

    return gulp.series([
        'clean',
        'copy',
        'create-build',
    ])(done);
});

gulp.task('distribute', (done) => {
    process.env.deployLocation = 'dist';

    return gulp.series([
        'clean',
        gulp.parallel('copy', 'sass-dist', 'scripts-dist'),
        'inject-versioning',
        'create-dist-zip',
    ])(done);
});
