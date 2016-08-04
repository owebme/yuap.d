var libs = process.cwd() + '/libs/';
var utils = require(libs + 'utils');

module.exports = function(req, res, next) {

	// if (!req.session.user
	// 	|| req.session.user && (!req.session.user.pID
	// 	|| !utils.cryptoCheck(req.session.user.username, req.session.user.password, req.session.user.pID, req.session.user.hash))) return res.sendStatus(401);

	var mongoose = require('mongoose');
	var db = mongoose.connection;

	db.collection('users').find({"username": "admin"}).toArray(function(err, data){
		if (data.length) {
			req.session.user = data[0];
			next();
		}
	});

};
