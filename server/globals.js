var sassVars = require('sass-vars-to-js');
var glob = require('glob');
var config = require('../gulp/config/config.json');
var styleguides = [
	{
		name: 'general',
		folders: [ {'name' : 'guidelines',
				'description' : 'general best practices & tips'
			},{
				'name' : 'quarks',
				'description' : 'Intangible, style-related properties that can be used throughout the platform.'
			},{
				'name' : 'atoms',
				'description' : 'Our most basic components: the building blocks of our platform'
			},{
				'name' : 'molecules',
				'description' : 'Small, reusable groups of components with 1 clear function'
			},{
				'name' : 'organisms',
				'description' : 'Complex clusters of components that serve a shared purpose'
			},{
				'name' : 'pages',
				'description' : 'Templates of an entire page to visualise how everything works together'
			}
		]
	}
];

module.exports = {

	getTemplateData: function() {
		var templateData = this.getTemplateDataBuild();

		templateData.EXTENSION = '';

		return templateData;
	},

	getTemplateDataBuild: function() {
		var data = {};

		data.CONFIG = config;
		data.COLORS = this.getColors();
		data.ICONS = this.getIcons();
		data.GLOBALS_GLOBAL = sassVars('development/sass/styleguides/base/globals/_global.scss');
		data.GLOBALS_MEDIA = sassVars('development/sass/styleguides/base/globals/_media.scss');
		data.GLOBALS_FONTS = sassVars('development/sass/styleguides/base/globals/_typography.scss');
		data.GLOBALS_LAYOUT = sassVars('development/sass/styleguides/base/globals/_layout.scss');
		data.GLOBALS_Z_INDEX = sassVars('development/sass/styleguides/base/globals/_z-index.scss');
		data.GLOBALS_ANIMATIONS = sassVars('development/sass/styleguides/base/globals/_animations.scss');
		data.FONT_FAMILY = this.getFonts();
		data.STYLEGUIDES = this.getStyleguides();
		data.VERSION_INFO = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));
		data.EXTENSION = '.html';
		data.DATA = data;

		return data;
	},

	getFonts: function() {
		var globalFonts = sassVars('development/sass/styleguides/base/globals/_typography.scss');
		var fonts = [];

		for(font in globalFonts){
			if(font.includes('font-family')){
				fonts.push(globalFonts[font].value.replace(/"/g, ""));
			}
		}

		return fonts;
	},

	getColors: function() {
		return this.sortColors(sassVars('development/sass/styleguides/base/globals/_colors.scss'));
	},

	getIcons: function() {
		var response = [];
		var icons = glob.sync("development/fonts/icon-sources/*.svg");
		for(var i in icons){
			var filename = icons[i].split('/');
			filename = filename[filename.length -1];
			filename = filename.split('.')[0];
			response.push(filename);
		}

		return response;
	},

	getStyleguides: function() {
		var response = {};

		// Loop through styleguides
		for(var s in styleguides) {
			var styleguide = styleguides[s];
			var styleguideName = styleguide.name.toUpperCase();

			response[styleguideName] = {};
			response[styleguideName].NAV = this.getNav(styleguide);
			response[styleguideName].PAGES = this.getPages(styleguide);
		}

		return response;
	},

	getNav: function(styleguide) {
		var nav = [];

		for(var f in styleguide.folders) {
			var folder = styleguide.folders[f];

			var navSection = {'main': folder.name, 'sub': [], 'description': folder.description};
			var children = glob.sync("development/templates/styleguides/"+styleguide.name+"/"+folder.name+"/**/*.njk", { ignore: 'development/templates/styleguides/'+styleguide.name+'/**/'+folder.name+'/_includes/**/*.njk'});


			for(var c in children) {
				var file = children[c].split('/');
				var fileName = file[file.length - 1].slice(0, -4);

				navSection['sub'].push(
					{
					 'name':fileName,
					 'main':folder.name,
					 'description':folder.description,
					 'path':children[c].replace('development/templates/',''),
					 'componentPath':children[c].replace('development/templates/','').replace('.njk','')
				 });
			}
			nav.push(navSection);
		}

		return nav;

	},

	getPages: function(styleguide) {
		var response= {}

		var pages = glob.sync("development/templates/styleguides/"+styleguide.name+"/pages/**/*.njk", { ignore: 'development/templates/styleguides/'+styleguide.name+'/pages/_includes/**/*.njk'});

		for(var j in pages){
			var templatePath = pages[j].replace('development/templates/styleguides/'+styleguide.name+'/pages/', '').replace('.njk', '');
			var templateName = templatePath.replace(/-/g, " ")
			var folder = "_root";
			if(templatePath.indexOf("/") !== -1){
				var temp = templatePath.split("/");
				folder = temp[0];
				templateName = temp[1].replace(/-/g, " ");
			}

			if(Array.isArray(response[folder])){
				response[folder].push({
					name: templateName,
					path: templatePath
				});
			}else{
				response[folder] = [{
					name: templateName,
					path: templatePath
				}];
			}
		}

		return response;
	},

	sortColors: function(colors){

		var response = {
			FONT_COLORS: {},
			OVAM_COLORS: {},
			SWATCH_COLORS: {},
			PRIMARY_COLORS: {},
			SECONDARY_COLORS: {},
			BORDER_COLORS: {},
			UI_COLORS: {},
			COLORS: {},
		};

		for(color in colors){
	    // Remove ! default prop
			colors[color].value = colors[color].value.replace('!default', '');

			if(color.includes('font-color')){
				response.FONT_COLORS[color] = colors[color];
			} else if(color.includes('primary')){
				response.PRIMARY_COLORS[color] = colors[color];
			} else if(color.includes('secondary')){
				response.SECONDARY_COLORS[color] = colors[color];
			} else if(color.includes('border-color')){
				response.BORDER_COLORS[color] = colors[color];
			} else if(color.includes('ovam')){
				response.OVAM_COLORS[color] = colors[color];
			} else if(color.includes('ui-')){
				response.UI_COLORS[color] = colors[color];
			} else if(color.includes('swatch')){
				response.SWATCH_COLORS[color] = colors[color];
			}
		}

		return response;
	},

	setGlobals: function(nunjucks_env) {
		var globals = this.getTemplateData();

		// Map data to nunjucks globals
		for (var key in globals) {
			nunjucks_env.addGlobal(key, globals[key]);
		}
	}

};
