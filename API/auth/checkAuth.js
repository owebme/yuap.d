var utils = require(process.cwd() + '/libs/utils');

module.exports = function(req, res, next) {

	if (!req.session.user
		|| req.session.user && (!req.session.user.accountID
		|| !utils.cryptoCheck(req.session.user.username, req.session.user.password, req.session.user.accountID, req.session.user.hash))){
			res.statusCode = 401;
			return res.send({status: 'Unauthorized'});
		}

	next();

	// var mongoose = require('mongoose');
	// var db = mongoose.connection;
	//
	// db.collection('users').find({"username": "admin"}).toArray(function(err, data){
	// 	if (data.length) {
	// 		req.session.user = data[0];
	// 		next();
	// 	}
	// });

};
