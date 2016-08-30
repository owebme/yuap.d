module.exports = function(app, checkAuth, url){

	var route = app.express.Router();

	route.post('/', function(req, res) {
		var tags = [],
			titles = req.body;

		app.utils.each(titles, function(title){
			tags.push({
				_id: app.ObjectId(),
				title: title,
				visible: true
			});
		});

		app.db.collection('accounts').update({
			"_id": req.session.user.accountID
		},{
			$addToSet: {
				"tags": {
					$each: tags
				}
			}
		},
		function(err, data){
			app.errHandler(res, err, tags);
		});
	});

	route.put('/', function(req, res) {

		var tags = req.body.tags,
			removeList = req.body.removeList;

		app.utils.each(app.utils.where(tags, {"_id": null}), function(item){
			item._id = app.ObjectId();
		});

		app.async.parallel([

			function(callback){
				app.db.collection('accounts').update({
					"_id": req.session.user.accountID
				},{
					$set: {
						"tags": tags
					}
				},
				function(err, data){
					app.errHandler(res, err, tags, callback);
				});
			},

			function(callback){
				if (removeList && removeList.ids && removeList.ids.length){
					app.db.collection('data').update({
						"_id": {
							$in: removeList.ids.map(app.ObjectId)
						},
						"accountID": req.session.user.accountID
					},{
						$pull: {
							"tags": {
								$in: removeList.tags
							}
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
