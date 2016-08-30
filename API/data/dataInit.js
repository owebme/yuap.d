module.exports = function(app) {

	return function(req, res, next){

		app.async.parallel([

			function(callback){
				app.db.collection('accounts').findOne({
					"_id": req.session.user.accountID
				},
				function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

			function(callback){
				app.db.collection('data').find({
					"accountID": req.session.user.accountID
				})
				.sort({"date": -1}).limit(100).toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},
		],

		function(err, data){
			if (data && data.length){
				data = {
					account: data[0],
					user: req.session.user,
					list: data[1]
				}
			}
			app.errHandler(res, err, data);
		});

	}
};
