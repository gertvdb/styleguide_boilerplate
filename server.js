// Express server
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');
var nunjucks_env = null;

// Set up the server
app.use(require('connect-livereload')({
	 port: 35729
}));

app.set('view engine', 'njk');

nunjucks_env = nunjucks.configure('development/templates/', {
	autoescape: true,
	noCache: true,
	express: app,
	watch: false
});

// Define the routes
app.use(require('./server/routes'));

// Static routes
app.use(express.static(path.join(__dirname, '.temp')));
app.use(express.static(path.join(__dirname, 'development')));

// Init the Globals
var nunjucksGlobals = require('./server/globals');
nunjucksGlobals.setGlobals(nunjucks_env);

// Create server and start listening
return http.createServer(app).listen(9000);
