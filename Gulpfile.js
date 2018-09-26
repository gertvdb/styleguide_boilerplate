'use strict';

process.env.deployLocation = '.temp';

var gulp = require('gulp');
var build = require('./gulp/build');
var clean = require('./gulp/clean');
var copy = require('./gulp/copy');
var distribute = require('./gulp/distribute');
var iconfont = require('./gulp/iconfont');
var images = require('./gulp/images');
var semver = require('./gulp/semver');
require('./gulp/watch');
require('./gulp/styles');
require('./gulp/scripts');

// -------------------------------------------------------------------
// :: GULP BUILD
// -------------------------------------------------------------------

gulp.task('default', ['watch'], function () {
	// Auto-open browser window
	// - https://www.npmjs.org/package/opn

	require('opn')('http://localhost:9000');
});


gulp.task('build', ['clean'], function (callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'deploy';

	run(['iconfont', 'images', 'copy'], 'create-build', function () {
		console.log('##### BUILD SUCCEEDED! #####');
		callback();
	});
});


gulp.task('distribute', function (callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'dist';

	run('iconfont', [
		'images',
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
