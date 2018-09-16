
// SLACK -------------------------------------------------------------
// Send a notification message to a slack channel.
//
// - https://api.slack.com/incoming-webhooks
// - https://www.npmjs.com/package/yargs
// - https://www.npmjs.com/package/gulp-shell

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var yargs = require('yargs');
var shell = require('gulp-shell');


//load the versions file

var config = require('../gulp/config/config.json');

gulp.task('slack', function(){
	if(!config.SLACK){ return console.log('Config says no to slack :-('); }

	var versions = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));

	var url;
	if(config.SLACK_HOOK.length == 0 && process.env.SLACK_HOOK ){
		url = process.env.SLACK_HOOK;
	}else{
		url = config.SLACK_HOOK;
	}

	var argv = yargs.option('message', {
			alias: 'm',
			demand: false,
			describe: 'The update message as a string',
			type: 'string'
		}).argv;

	var current_version = versions.current_version;
	var updateMessage = argv.m;
	if (!updateMessage) {
		var foundVersion = versions.changelog.find(function (log) {
			return log.version == current_version;
		});
		updateMessage = foundVersion.message;
	}

	var payload = {
		"channel": config.SLACK_CHANNEL,
		"username": config.SLACK_NAME,
		"icon_emoji": config.SLACK_EMOJI,
		"text": "*There is an update available of the styleguide and templates.* (version: "+current_version+")  \nThe update message says: \n       _" + updateMessage + "._ \n:bulb: View it <" + config.PROJECT_URL + "|here>"
	};

	gulp.src('')
		.pipe(plumber())
		.pipe(shell([
				"curl -X POST --data-urlencode 'payload=" + JSON.stringify(payload) + "' '" + url + "'"
			],
			{
				cwd:"",
				ignoreErrors: true
			})
		);
});
