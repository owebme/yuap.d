module.exports = function(app, checkAuth, url){

	var route = app.express.Router();

	var handlerUpdate = function(req, res, ids, update){

		app.db.collection('data').update({
			"_id": {
				$in: ids.map(app.ObjectId)
			},
			"accountID": req.session.user.accountID
		},{
			$set: update
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	};

	route.put('/viewed', function(req, res) {
		handlerUpdate(req, res, req.body, {"new": false});
	});

	route.put('/important', function(req, res) {
		handlerUpdate(req, res, req.body, {"important": true});
	});

	route.put('/unimportant', function(req, res) {
		handlerUpdate(req, res, req.body, {"important": false});
	});

	route.put('/status', function(req, res) {
		handlerUpdate(req, res, req.body.ids, {"status": req.body.status});
	});

	route.put('/state', function(req, res) {
		handlerUpdate(req, res, req.body.ids, {"state": req.body.state});
	});

	route.put('/tags', function(req, res) {
		handlerUpdate(req, res, req.body.ids, {"tags": req.body.tags});
	});

	route.get('/item/:id', function(req, res) {

		app.db.collection('data').findOne({
			"_id": app.ObjectId(req.params.id),
			"accountID": req.session.user.accountID
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.delete('/remove', function(req, res) {

		var ids = req.body.ids;

		app.db.collection('data').remove({
			"_id": {
				$in: ids.map(app.ObjectId)
			},
			"accountID": req.session.user.accountID
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	app.use(url, checkAuth, route);
};
