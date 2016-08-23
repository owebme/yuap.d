module.exports = function(app){

    app.get('/', function(req, res) {
        if (!req.session.user){
            res.redirect('/auth');
        }
        else {
            res.render('index', {title: 'Hey', message: 'Hello there!'});
        }
    });

    app.get('/auth', function(req, res) {
        res.render('login', {title: 'Hey', message: 'Hello there!'});
    });

	app.post('/auth', require(process.cwd() + '/api/auth')(app));

    app.get('/room1', function(req, res) {
        res.render('room1');
    });

    app.get('/room2', function(req, res) {
        res.render('room2');
    });

    require(process.cwd() + '/api')(app);
}
