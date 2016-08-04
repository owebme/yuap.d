var express = require('express');
var async = require('async');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var app = express.Router();

var db = mongoose.connection;

app.get('/init', function(req, res) {
	async.parallel([
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
			weather: results[0][0],
			currency: results[1]
		}});
	});
});

module.exports = app;
