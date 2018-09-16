var express = require('express');
var router = express.Router();

router.get('/', function( req, res ) {
	res.render('index') ;
})

router.get('/design/', function( req, res ) {
	res.render('design') ;
})

router.get('/styleguides/', function( req, res ) {
	res.render('styleguides') ;
})

router.get('/styleguides/:styleguide', function( req, res ) {
	res.render('styleguides/' + req.params.styleguide +'/index') ;
})

router.get('/styleguides/:styleguide/pages/:page', function( req, res ) {
	res.render( 'styleguides/' + req.params.styleguide +'/pages/' + req.params.page ) ;
})

router.get('/styleguides/:styleguide/pages/:folder/:page', function( req, res ) {
	res.render( 'styleguides/' + req.params.styleguide +'/pages/' + req.params.folder + '/'+ req.params.page ) ;
})

module.exports = router;
