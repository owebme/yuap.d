var checkAuth = require('./auth/checkAuth');

module.exports = function(app){

	app.use('/parser', require('./parser'));

	app.post('/auth', require('./auth').post);

	// Data
	app.get('/api/data/init/:siteID', checkAuth, require('./data/dataInit').post);

	app.use('/api/dashboard', checkAuth, require('./data/dashboard'));

	app.use('/api/data/list', checkAuth, require('./data/dataList'));

}
