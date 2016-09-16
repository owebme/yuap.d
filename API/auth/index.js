module.exports = function(app) {

	return function(req, res, next){

		var username = req.body.username,
			password = req.body.password,
			logined = req.body.logined;

		if (!username || !password) return res.sendStatus(401);

		var unAuth = function(logined){
			if (logined) res.sendStatus(401);
			else res.send({status: 'error', error: 'Не верный логин и/или пароль'});
		};

		app.db.collection('accounts').find({
			"users": {
				$elemMatch: { "username": username }
			}
		}).toArray(function(err, data){
			if (err) {
				return next(err);
			}
			else {
				if (data.length){

					var user = app.utils.findWhere(data[0].users, { "username": username });
					user.accountID = data[0]._id;

					if (user.password !== app.utils.cryptoPass(password)){
						unAuth(logined);
					}
					else {
						if (logined){
							req.session.user = user;
							req.session.user.hash = app.utils.cryptoHash(user.username, user.password, user.accountID);
							res.redirect('/');
						}
						else {
							res.send({status: 'OK'});
						}
					}
				}
				else {
					unAuth(logined);
				}
			}
		});
	}
};
