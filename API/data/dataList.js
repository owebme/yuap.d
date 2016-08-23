module.exports = function(app, checkAuth, url){

	app.route.put('/viewed', function(req, res) {

		req.body.forEach(function(item){
			app.db.collection('data').update(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			},
			{
				$set: {
					"new": false
				}
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.route.put('/important', function(req, res) {

		req.body.forEach(function(item){
			app.db.collection('data').update(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			},
			{
				$set: {
					"important": true
				}
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.route.put('/unimportant', function(req, res) {

		req.body.forEach(function(item){
			app.db.collection('data').update(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			},
			{
				$set: {
					"important": false
				}
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.route.put('/status', function(req, res) {

		if (!req.body || !req.body.ids || !req.body.status) return;

		req.body.ids.forEach(function(item){
			app.db.collection('data').update(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			},
			{
				$set: {
					"status": req.body.status
				}
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.route.put('/state', function(req, res) {

		if (!req.body || !req.body.ids || !req.body.state) return;

		req.body.ids.forEach(function(item){
			app.db.collection('data').update(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			},
			{
				$set: {
					"state": req.body.state
				}
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.route.delete('/remove', function(req, res) {

		if (!req.body.length) return;

		req.body.forEach(function(item){
			app.db.collection('data').remove(
			{
				"_id": app.ObjectId(item),
				"siteID": req.session.user.siteID
			}, function(err, data){
				app.errHandler(res, err, data, app);
			});
		});
	});

	app.use(url, checkAuth, app.route);
};
