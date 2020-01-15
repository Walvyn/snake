'use strict';

// Retrieve controller parent
const app = require(__dirname + '/../core/my_controller.js');

app.router.get('/', app.coe(function *(req, res){
	res.render('home/index', Object.assign(global, {}));
}));

module.exports = app.router;