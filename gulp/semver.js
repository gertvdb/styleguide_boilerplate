// VERSIONING -------------------------------------------------------------
// Keep track of the versioning of this project.
//
// - https://www.npmjs.com/package/yargs
// - https://www.npmjs.com/package/gulp-json-editor

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jsonEditor = require('gulp-json-editor');
var yargs = require('yargs');

//load the versions file
var versionsFilePath = 'version.json';


gulp.task('semver', function(){
	var versions = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));

	var argv = yargs.usage('Usage: gulp [task] <options>')
		.example("gulp [task] -m 'update message' --patch", "updates the version with 1 patch number")
		.option('message', {
			alias: 'm',
			demand: true,
			describe: 'The update message as a string',
			type: 'string'
		})
		.option('patch', {
			demand: false,
			describe: 'update the patch-number',
			type: 'boolean'
		})
		.option('minor', {
			demand: false,
			describe: 'update the minor-number',
			type: 'boolean'
		})
		.option('major', {
			demand: false,
			describe: 'update the major-number',
			type: 'boolean'
		})
		.help('h')
		.argv;
	//update the version
	var currentVersion = versions.current_version;

	currentVersion = currentVersion.split('.');

	if(argv.patch){	currentVersion[2]++; }
	if(argv.minor){	currentVersion[1]++; currentVersion[2] = 0;}
	if(argv.major){	currentVersion[0]++; currentVersion[1] = 0; currentVersion[2] = 0;}
	currentVersion = currentVersion.join('.');


	//update the changelog
	var changelog = versions.changelog;

	var newLog = {
		"version": currentVersion,
		"message": argv.m
	};

	changelog.unshift(newLog);

	//write to file
	return gulp.src(versionsFilePath)
		.pipe(plumber())
		.pipe(jsonEditor({
			'current_version': currentVersion,
			'changelog': changelog
		}))
		.pipe(gulp.dest("."),{overwrite: true});

});


// inject the version info into distributionfiles:

var gulpIf = require('gulp-if');
// var replace = require('gulp-replace');
var insert = require('gulp-insert');
var config = require('../gulp/config/config.json');


gulp.task('inject-versioning', function(){
	var versions = require('../'+versionsFilePath);

	return gulp.src(['dist/**'])
		.pipe(plumber())
		.pipe(gulpIf('*.css', insert.prepend("/* "+config.PROJECT_TITLE + " v"+versions.current_version + " */\n\n")))
		.pipe(gulpIf('*.js', insert.prepend("/* "+config.PROJECT_TITLE + " v"+versions.current_version + " */\n\n")))

		.pipe(gulp.dest(function(file) { return file.base; }),{overwrite: true});
});