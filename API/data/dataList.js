var express = require('express');
var async = require('async');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var app = express.Router();

var db = mongoose.connection;

app.get('/menu/init', function(req, res) {

	db.collection('data').aggregate([
	
	{$match: {"new": true}},
	
	{$project: {"type":1, "count": {$add: [1]}}},
	
	{$group: {_id: "$type", counts: {$sum: "$count"}}}
	
	]).toArray(function(err, data){
		if (!data) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		if (!err) {
			return res.send({status: 'OK', result: data});
		}
		else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}
	});
});

app.get('/menu/:select', function(req, res) {

	var request = {};
	
	request.sid = req.session.user.sid;
	
	if (req.params.select !== "all") request.type = req.params.select;

	db.collection('data').find(request).sort({"date": -1}).limit(20).toArray(function(err, data){
		if (!data) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		if (!err) {
			return res.send({status: 'OK', result: data});
		}
		else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}
	});
});

app.put('/viewed', function(req, res) {

	if (!req.body.length) return;

	req.body.forEach(function(item){
		db.collection('data').update(
		{
			"_id": ObjectId(item),
			"sid": req.session.user.sid
		},
		{
			$set: {
				"new": false
			}
		});
	});
});

app.put('/important', function(req, res) {

	if (!req.body.length) return;

	req.body.forEach(function(item){
		db.collection('data').update(
		{
			"_id": ObjectId(item),
			"sid": req.session.user.sid
		},
		{
			$set: {
				"important": true
			}
		});
	});
});

app.put('/unimportant', function(req, res) {

	if (!req.body.length) return;

	req.body.forEach(function(item){
		db.collection('data').update(
		{
			"_id": ObjectId(item),
			"sid": req.session.user.sid
		},
		{
			$set: {
				"important": false
			}
		});
	});
});

app.put('/status/:id', function(req, res) {

	if (!req.body.length || req.params.id === 'undefined') return;

	req.body.forEach(function(item){
		db.collection('data').update(
		{
			"_id": ObjectId(item),
			"sid": req.session.user.sid
		},
		{
			$set: {
				"status": req.params.id
			}
		});
	});
});

app.delete('/remove', function(req, res) {

	if (!req.body.length) return;

	req.body.forEach(function(item){
		db.collection('data').remove(
		{
			"_id": ObjectId(item),
			"sid": req.session.user.sid
		});
	});
});

module.exports = app;
