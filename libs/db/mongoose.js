var mongoose = require('mongoose');

module.exports = function(log, config){

	mongoose.connect(config.get('mongodb:uri'), config.get('mongodb:options'));

	var db = mongoose.connection;

	db.on('error', function (err) {
		log.error('Connection error:', err.message);
	});

	db.once('open', function callback () {
		log.info("Connected to DB!");
	});

	return db;
}