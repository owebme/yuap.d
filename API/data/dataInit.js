module.exports = function(app) {

	return function(req, res, next){

		app.async.parallel([

			function(callback){
				app.db.collection('data').find({
					"siteID": req.session.user.siteID
				}).sort({"date": -1}).limit(100).toArray(function(err, data){
					app.errHandler(res, err, data, app, callback);
				});
			},

			function(callback){
				app.db.collection('status').find({
					"profileID": req.session.user.profileID
				}).toArray(function(err, data){
					app.errHandler(res, err, data, app, callback);
				});
			},

			function(callback){
				app.db.collection('tags').find({
					"profileID": req.session.user.profileID
				}).toArray(function(err, data){
					app.errHandler(res, err, data, app, callback);
				});
			},
		],

		function(err, data){
			if (data && data.length){
				data = {
					list: data[0],
					status: data[1],
					tags: data[2]
				}
			}
			app.errHandler(res, err, data, app);
		});

	}
};
