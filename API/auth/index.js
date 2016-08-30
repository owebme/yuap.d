module.exports = function(app) {

	return function(req, res, next){

		var username = req.body.username,
			password = req.body.password,
			logined = req.body.logined;

		if (!username || !password) return res.sendStatus(401);

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

					if (logined === "false" && user.password !== app.utils.cryptoPass(password) || logined === "true" && user.password !== password){
						res.send('<script language="Javascript" type="text/javascript">' +
							'window.parent.postMessage({error: \'Не верный пароль\'}, "*");' +
						'</script>');
					}
					else {
						var _user = JSON.stringify(user);
						req.session.user = user;
						req.session.user.hash = app.utils.cryptoHash(user.username, user.password, user.accountID);
						res.redirect('/');
						//res.send('<script language="Javascript" type="text/javascript">' +
						//	'window.parent.postMessage({result: \'OK\', user: ' + _user + '}, "*");' +
						//'</script>');
					}
				}
				else {
					res.send('<script language="Javascript" type="text/javascript">' +
						'window.parent.postMessage({error: \'Не верный логин и/или пароль\'}, "*");' +
					'</script>');
				}
			}
		});
	}
};
