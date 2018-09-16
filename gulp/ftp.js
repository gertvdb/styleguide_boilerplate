// FTP ------------------------------------------------------------
// Pushes the contents of the deploy folder to a FTP server.


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var config = require('../gulp/config/config.json');
var merge = require('merge-stream');

gulp.task('ftp', function(callback){

	return run('build', 'upload-deploy', function(){
		callback();
	});

});

gulp.task('upload-deploy', function(){

	var pass;
	if(config.FTP_PASS.length === 0 && process.env.FTP_PASS ){
		pass = process.env.FTP_PASS;
	}else{
		pass = config.FTP_PASS;
	}

	var conn  = ftp.create({
		host: config.FTP_HOST,
		user: config.FTP_USER,
		pass: pass,
		port: 21,
		log: gutil.log,
		parallel: 3
	});

	return gulp.src('deploy/**')
		.pipe( conn.dest(config.FTP_PATH) );
});

gulp.task('upload-dist', function(){
	var versions = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));

	var conn  = ftp.create({
		host: config.DIST_FTP_HOST,
		user: config.DIST_FTP_USER,
		pass: config.DIST_FTP_PASS,
		port: 21,
		// log: gutil.log,
		parallel: 3
	});

	merged = merge();

	conn.rmdir(config.DIST_FTP_PATH + '/latest' , function(){
		 merged.add(gulp.src(['dist/**', 'dist/.htaccess'])
			.pipe( conn.dest(config.DIST_FTP_PATH + '/latest' ))
			.pipe( conn.dest(config.DIST_FTP_PATH + '/' + versions.current_version )));
	});

	return merged;

});
