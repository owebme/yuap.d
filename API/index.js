var checkAuth = require('./auth/checkAuth');

module.exports = function(app){

	// Initialize
	app.get('/api/data/init', checkAuth, require('./data/dataInit')(app));

	// Data
	require('./data/dataList')(app, checkAuth, '/api/data/list');

	// Status
	require('./data/dataStatus')(app, checkAuth, '/api/data/status');

	// Tags
	require('./data/dataTags')(app, checkAuth, '/api/data/tags');

	// Messenger
	require('./messenger')(app);

}
