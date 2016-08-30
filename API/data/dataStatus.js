module.exports = function(app, checkAuth, url){

	var route = app.express.Router();

	route.put('/', function(req, res) {

		var status = req.body.status,
			removeList = req.body.removeList;

		app.utils.each(app.utils.where(status, {"_id": null}), function(item){
			item._id = app.ObjectId();
		});

		app.async.parallel([

			function(callback){
				app.db.collection('accounts').update({
					"_id": req.session.user.accountID
				},{
					$set: {
						"status": status
					}
				},
				function(err, data){
					app.errHandler(res, err, status, callback);
				});
			},

			function(callback){
				if (removeList && removeList.length){
					app.db.collection('data').update({
						"_id": {
							$in: removeList.map(app.ObjectId)
						},
						"accountID": req.session.user.accountID
					},{
						$set: {
							"status": "1"
						}
					},{
						multi: true
					},
					function(err, data){
						app.errHandler(res, err, data, callback);
					});
				}
				else {
					callback(false, null);
				}
			},
		],

		function(err, data){
			if (data && data.length){
				data = data[0];
			}
			app.errHandler(res, err, data);
		});

	});

	app.use(url, checkAuth, route);
};
