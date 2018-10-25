// -------------------------------------------------------------------
// :: GULP ICONFONT
// -------------------------------------------------------------------
// Note: creation of the icon font is a stand-alone
// task and should be performed before running the
// server or build task
//
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-iconfont
// - https://www.npmjs.org/package/gulp-consolidate
// - https://www.npmjs.org/package/lodashs
// - https://www.npmjs.org/package/gulp-rename

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');

gulp.task('iconfont', function () {
	// Set svg-sources, optimize svg
	// and start creating the font
	return gulp.src('development/fonts/icon-sources/*.svg')
		.pipe(plumber())
		.pipe(iconfont({

			// Set file-name for the font and append
			// codepoints so we always have the same
			// CSS codes (eg. content: '\e001')

			fontName: 'icons',
			appendCodePoints: true,
			formats: ['woff2', 'woff', 'ttf', 'eot', 'svg']

		})).on('glyphs', function (glyphs, options) {
			// Create the __icons.scss file based
			// on the template and inject font-name
			// path and CSS class-name

			gulp.src('development/fonts/icon-sources/_template.lodash')
				.pipe(consolidate('lodash', {

					glyphs: glyphs,
					fontName: 'icons',
					fontPath: '../fonts',
					className: 'icon'

				}))
				.pipe(rename('_icon-names.scss'))
				.pipe(gulp.dest('development/sass/styleguides/base/_quarks'));

		})
		.pipe(gulp.dest('development/fonts'));
});
