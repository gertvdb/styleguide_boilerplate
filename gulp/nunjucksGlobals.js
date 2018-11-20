var sassVars = require('sass-vars-to-js');
var glob = require('glob');
var config = require('../gulp/config/config.json');

module.exports = {

	getTemplateData: function (nunjucks_env) {
		var templateData = this.getTemplateDataBuild();

		templateData.EXTENSION = '';
		templateData.DATA.EXTENSION = '';

		// Map data to nunjucks globals
		for (var key in templateData) {
			if (templateData.hasOwnProperty(key)) {
				nunjucks_env.addGlobal(key, templateData[key]);
			}
		}

		return nunjucks_env;
	},

	getTemplateDataBuild: function () {
		var data = {};

		data.CONFIG = config;
		data.COLORS = this.getColors();
		data.GLOBALS_GLOBAL = sassVars('development/sass/base/globals/_global.scss');
		data.GLOBALS_MEDIA = sassVars('development/sass/base/globals/_media.scss');
		data.GLOBALS_FONTS = sassVars('development/sass/base/globals/_typography.scss');
		data.GLOBALS_LAYOUT = sassVars('development/sass/base/globals/_layout.scss');
		data.GLOBALS_Z_INDEX = sassVars('development/sass/base/globals/_z-index.scss');
		data.GLOBALS_ANIMATIONS = sassVars('development/sass/base/globals/_animations.scss');
		data.FONT_FAMILY = this.getFonts();
		data.NAV = this.getNav();
		data.PAGES = this.getPages();
		data.VERSION_INFO = JSON.parse(require('fs')
			.readFileSync('version.json', 'utf8'));
		data.EXTENSION = '.html';
		data.DATA = data;

		return data;
	},

	getFonts: function () {
		var globalFonts = sassVars('development/sass/base/globals/_typography.scss');
		var fonts = [];

		for (font in globalFonts) {
			if (font.includes('font-family')) {
				fonts.push(globalFonts[font].value.replace(/"/g, ""));
			}
		}

		return fonts;
	},

	getColors: function () {
		return this.sortColors(sassVars('development/sass/base/globals/_colors.scss'));
	},

	getNav: function () {
		var folders = [
			{
				'name': 'quarks',
				'description': 'Intangible, style-related properties that can be used throughout the platform.'
			}, {
				'name': 'atoms',
				'description': 'Our most basic components: the building blocks of our platform'
			}, {
				'name': 'molecules',
				'description': 'Small, reusable groups of components with 1 clear function'
			}, {
				'name': 'organisms',
				'description': 'Complex clusters of components that serve a shared purpose'
			}, {
				'name': 'pages',
				'description': 'Templates of an entire page to visualise how everything works together'
			}
		];

		var response = [];

		for (var f in folders) {
			var folder = folders[f];
			var navSection = {};

			navSection = {
				'main': folder.name,
				'sub': [],
				'description': folder.description
			};
			var children = glob.sync("development/templates/" + folder.name + "/**/*.njk", {ignore: 'development/templates/**/' + folder.name + '/_includes/**/*.njk'});

			for (var c in children) {
				var file = children[c].split('/');
				var fileName = file[file.length - 1].slice(0, -4);

				if (fileName.indexOf("__") == -1) {
					navSection['sub'].push(
						{
							'name': fileName,
							'main': folder.name,
							'path': children[c].replace('development/templates/', ''),
							'componentPath': children[c].replace('development/templates/', '')
								.replace('.njk', '')
						});
				}
			}

			response.push(navSection);
		}

		console.log(response);

		return response;
	},

	getPages: function () {
		var response = {};
		var pages = glob.sync("development/templates/pages/**/*.njk", {ignore: 'development/templates/**/pages/_includes/**/*.njk'});

		for (var j in pages) {
			var templatePath = pages[j].replace('development/templates/pages/', '')
				.replace('.njk', '');
			var templateName = templatePath.replace(/-/g, " ")
			var folder = "_root";
			if (templatePath.indexOf("/") !== -1) {
				var temp = templatePath.split("/");
				folder = temp[0];
				templateName = temp[1].replace(/-/g, " ");
			}

			if (Array.isArray(response[folder])) {
				response[folder].push({
					name: templateName,
					path: templatePath
				});
			}
			else {
				response[folder] = [
					{
						name: templateName,
						path: templatePath
					}
				];
			}
		}

		return response;
	},

	sortColors: function (colors) {

		var response = {
			FONT_COLORS: {},
			BORDER_COLORS: {},
			UI_COLORS: {},
			PRIMARY_COLORS: {},
			SECONDARY_COLORS: {},
			COLORS: {}
		};

		for (color in colors) {
			if (color.includes('font-color')) {
				response.FONT_COLORS[color] = colors[color];
			}
			else {
				if (color.includes('border-color')) {
					response.BORDER_COLORS[color] = colors[color];
				}
				else {
					if (color.includes('ui-')) {
						response.UI_COLORS[color] = colors[color];
					}
					else {
						if (color.includes('primary-')) {
							response.PRIMARY_COLORS[color] = colors[color];
						}
						else {
							if (color.includes('secondary-')) {
								response.SECONDARY_COLORS[color] = colors[color];
							}
							else {
								response.COLORS[color] = colors[color];
							}
						}
					}
				}
			}
		}

		return response;
	}

};
