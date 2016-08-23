var checkAuth = require('./auth/checkAuth');

module.exports = function(app){

	// Data
	app.get('/api/data/init', checkAuth, require('./data/dataInit')(app));

	// app.use('/api/dashboard', checkAuth, require('./data/dashboard'));

	// app.use('/api/data/list', checkAuth, require('./data/dataList'));

	require('./data/dataList')(app, checkAuth, '/api/data/list');

	require('./messenger')(app);

}
