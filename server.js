'use strict';

// Loading env configuration
require('dotenv').config({path: __dirname + '/.env'});

// BASE SETUP
// =============================================================================

// needed packages

// express, used for routing
const express = require('express');
const app = express();

// Body parser
const bodyParser = require('body-parser');

// setting port
const port = process.env.PORT || 80;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// For all pages
app.all('*', function (req, res, next){
	global.path = req.path;
	next();
});

// ROUTES FOR OUR APP
// =============================================================================
const router = express.Router();

// registering routes
app.use(router);
app.use('/', require(__dirname + '/controllers/home'));

// 404 handling
// =============================================================================

app.all('*', function (req, res){
	res.status(404).render('error', Object.assign(global, {
		error: '404',
		msg: 'Page introuvable'
	}));
});

// 500 error handling
app.use(function(err, req, res, next) {
	console.log('error', err);
	res.status(500).render('error', Object.assign(global, {
		error: '500',
		msg: 'Erreur Serveur'
	}));
});

// Locals fucntions
// =============================================================================

app.locals.ucfirst = function(value){
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

// START THE SERVER
// =============================================================================

app.listen(port, 'localhost');