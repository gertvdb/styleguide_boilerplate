// PUSH --------------------------------------------------------------
// Completes the tasks for internal development.
// the parameter -m should be given in the command line (commit message)
// ex:  gulp push -m 'my deploy message'
// * git commit + push
//
// - https://www.npmjs.com/package/yargs
// - https://www.npmjs.com/package/gulp-shell

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var yargs = require('yargs');

var config = require('../gulp/config/config.json');


gulp.task('push', function(){
	var argv = yargs.demand("m").argv;

	gulp.src('')
		.pipe(plumber())
		.pipe(shell([
				"git add . -A",
				"git commit -m '"+argv.m+"'",
				"git pull deliver-repo master",
				"git push deliver-repo master"
			],{
				cwd:"dist", //calculated from the location of the gulpfile.js. Not from this file.
				ignoreErrors: true
			})
		);
});


// inits the correct git repository in the deliverables folder for the push task to work.
// this task should only be executed the first time only
gulp.task('init', function(){
	gulp.src('')
		.pipe(plumber())
		.pipe(shell([
			"mkdir dist"
		],{
			cwd:"",
			ignoreErrors: true
		}))
		.pipe(shell([
			"git init",
			"git remote add deliver-repo "+config.DELIVER_GIT,
			"git pull deliver-repo master"
		],{
			cwd:"dist",
			ignoreErrors: true
		}));
});