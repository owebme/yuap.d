var async = require('async');
var mongoose = require('mongoose');

var db = mongoose.connection;

exports.post = function(req, res, next) {
	async.parallel([
		function(callback){
			db.collection('data').aggregate([

			{$match: {"new": true}},

			{$project: {type:1, count: {$add: [1]}}},

			{$group: {_id: "$type", counts: {$sum: "$count"}}}

			]).toArray(function(err, data){
				if (!data) {
					res.statusCode = 404;
					return res.send({error: 'Not found'});
				}
				if (!err) {
					callback(err, data);
				}
				else {
					res.statusCode = 500;
					log.error('Internal error(%d): %s', res.statusCode, err.message);
					return res.send({error: 'Server error'});
				}
			});
		},
		function(callback){
			db.collection('data').find({"siteID": req.session.user.siteID}).sort({"num": 1}).limit(100).toArray(function(err, data){
				if (!data) {
					res.statusCode = 404;
					return res.send({error: 'Not found'});
				}
				if (!err) {
					callback(err, data);
				}
				else {
					res.statusCode = 500;
					log.error('Internal error(%d): %s', res.statusCode, err.message);
					return res.send({error: 'Server error'});
				}
			});
		},
		function(callback){
			db.collection('status').find({"profileID": req.session.user.profileID}).toArray(function(err, data){
				if (!data) {
					res.statusCode = 404;
					return res.send({error: 'Not found'});
				}
				if (!err) {
					callback(err, data);
				}
				else {
					res.statusCode = 500;
					log.error('Internal error(%d): %s', res.statusCode, err.message);
					return res.send({error: 'Server error'});
				}
			});
		},
		function(callback){
			db.collection('weather').find().toArray(function(err, data){
				if (!data) {
					res.statusCode = 404;
					return res.send({error: 'Not found'});
				}
				if (!err) {
					callback(err, data);
				}
				else {
					res.statusCode = 500;
					log.error('Internal error(%d): %s', res.statusCode, err.message);
					return res.send({error: 'Server error'});
				}
			});
		},
		function(callback){
			db.collection('currency').find().toArray(function(err, data){
				if (!data) {
					res.statusCode = 404;
					return res.send({error: 'Not found'});
				}
				if (!err) {
					callback(err, data);
				}
				else {
					res.statusCode = 500;
					log.error('Internal error(%d): %s', res.statusCode, err.message);
					return res.send({error: 'Server error'});
				}
			});
		},
	], function(err, results){
		return res.send({status: 'OK', result: {
			menu: results[0],
			list: results[1],
			status: results[2],
			weather: results[3][0],
			currency: results[4]
		}});
	});
};
