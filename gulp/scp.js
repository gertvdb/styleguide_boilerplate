// SCP ------------------------------------------------------------
// Pushes the contents of the deploy folder to a SCP server.

// - https://www.npmjs.com/package/gulp-scp2

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var config = require('../gulp/config/config.json');
var merge = require('merge-stream');
var replace = require('gulp-replace');
var gulpIf = require("gulp-if");
var scp = require('gulp-scp2');


gulp.task('upload-cdn-scp', function(callback) {
	if(!config.CDN_SCP){ return console.log('Config says no to CDN deploy via SCP :-('); }

	var pass;
	if(config.CDN_SCP_PASS.length === 0 && process.env.CDN_SCP_PASS ){
		pass = process.env.CDN_SCP_PASS;
	}else{
		pass = config.CDN_SCP_PASS;
	}


	var merged = merge();
	var versions = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));


	merged.add(gulp.src(['dist/**', 'dist/.htaccess'])
		.pipe(gulpIf('*.css', replace('../', config.CDN_URL + "/dist/latest/")))
		.pipe(scp({
			host: config.CDN_SCP_HOST,
			username: config.CDN_SCP_USER,
			password: pass,
			port: 22,
			dest: config.CDN_SCP_PATH + '/latest',
			watch: function(client) {
				client.on('write', function(o) {
					console.log('write %s', o.destination);
				});
			}
		}))
		.on('error', function(err) {
			console.log(err);
			return err;
		}));

	merged.add(gulp.src(['dist/**', 'dist/.htaccess'])
		.pipe(gulpIf('*.css', replace('../', config.CDN_URL + "/dist/" + versions.current_version + "/")))
		.pipe(scp({
			host: config.CDN_SCP_HOST,
			username: config.CDN_SCP_USER,
			password: pass,
			dest: config.CDN_SCP_PATH + '/' + versions.current_version,
			watch: function(client) {
				client.on('write', function(o) {
					console.log('write %s', o.destination);
				});
			}
		}))
		.on('error', function(err) {
			console.log(err);
			return err;
		}));

	return merged;
});


gulp.task('upload-demo-scp', function(callback) {
	if(!config.DEMO_SCP){ return console.log('Config says no to Demo deploy via SCP :-('); }

	var pass;
	if(config.DEMO_SCP_PASS.length === 0 && process.env.DEMO_SCP_PASS ){
		pass = process.env.DEMO_SCP_PASS;
	}else{
		pass = config.DEMO_SCP_PASS;
	}

	return gulp.src('deploy/**')
		.pipe(scp({
			host: config.DEMO_SCP_HOST,
			username: config.DEMO_SCP_USER,
			password: pass,
			port: 22,
			dest: config.DEMO_SCP_PATH,
			watch: function(client) {
				client.on('write', function(o) {
					console.log('write %s', o.destination);
				});
			}
		}))
		.on('error', function(err) {
			console.log(err);
			return err;
		});

});

