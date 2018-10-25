// -------------------------------------------------------------------
// :: SASS
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-sass
// - https://www.npmjs.org/package/gulp-autoprefixer

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

// PostCSS + plugins
var postcss = require("gulp-postcss"); // https://github.com/postcss/gulp-postcss
var autoprefixer = require("autoprefixer"); //https://github.com/postcss/autoprefixer
var cssnano = require("cssnano"); // https://github.com/ben-eb/cssnano
var mqpacker = require("css-mqpacker"); // https://www.npmjs.com/package/css-mqpacker

gulp.task('sass', function () {

	var sourcemapOptions = {
		includeContent: false,
		sourceRoot: "../../sass"
	};

	return gulp.src('development/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({

			outputStyle: 'expanded',
			sourceComments: false

		}).on('error', sass.logError))
		.pipe(sourcemaps.write("maps", sourcemapOptions))
		.pipe(changed('.temp/css', {hasChanged: changed.compareSha1Digest}))
		.pipe(gulp.dest('.temp/css'));

});

gulp.task('sass-dist', function () {

	var postcssConfig = [
		// Autoprefix
		autoprefixer({browsers: ["last 2 version"]}),
		// optimize
		cssnano(),
		//merge media queries
		mqpacker()
	];

	return gulp.src([
		'development/sass/**/*.scss',
		'!development/sass/**/styleguide.scss'
	])
		.pipe(plumber())
		.pipe(sass({

			outputStyle: 'expanded', //compression is done by cssnano
			sourceComments: false

		}).on('error', sass.logError))
		.pipe(postcss(postcssConfig))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(process.env.deployLocation + '/css'));
});


var sassLint = require('gulp-sass-lint');

gulp.task('sass-lint', function () {

	//TODO: once inline disabling of linters is available, we can reduce the
  // ignored files in the glob.

	return gulp.src([
		'development/sass/**/*.scss'
	])
		.pipe(sassLint({
			configFile: "gulp/config/.sass_lint.yml",
			options: {
				'merge-default-rules': true
			}
		}))
		.pipe(sassLint.format());
});
