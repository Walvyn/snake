'use strict';

// Co module, used for managing generators
const co = require('co');

function MyController(){
	// express, used for routing
	this.express  = require('express');
	this.router = this.express.Router();

	// Co module, used for managing generators
	this.co = co;
	this.coe = require('co-express');

	// Database library, used for queries mongodb
	this.database = require(__dirname + '/../libraries/me/database.js');
};

MyController.prototype.connectDatabase = co.wrap(function *({database}){
	this.db = yield this.database.connect({url: database});
});

module.exports = new MyController();