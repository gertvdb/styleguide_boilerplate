// -------------------------------------------------------------------
// :: TEMPLATING
// -------------------------------------------------------------------
// - https://mozilla.github.io/nunjucks
// - https://www.npmjs.org/package/gulp-nunjucks

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var htmlhint = require('gulp-htmlhint');
var globals = require('../server/globals');

gulp.task('render-templates', function () {

	return gulp.src([
		'development/templates/*.njk',
		'development/templates/**/*.njk',
		'development/templates/**/pages/**/*.njk',
		'!development/templates/**/pages/_includes**/*.njk'
	])
		.pipe(plumber())
		.pipe(nunjucks.compile(globals.getTemplateDataBuild()))
		.pipe(rename({extname: ".html"}))
		.pipe(changed('.temp', {hasChanged: changed.compareSha1Digest}))
		.pipe(gulp.dest(process.env.deployLocation));

});

gulp.task('html-lint', function () {
	return gulp.src([
		'.temp/**/*.html'
	])
		.pipe(plumber())
		.pipe(htmlhint('gulp/config/htmlhint.htmlhintrc'))
		.pipe(htmlhint.reporter())
});
