module.exports = function(app, checkAuth, url){

	var route = app.express.Router();

    route.post('/', function(req, res) {

        var event = req.body;
        event.accountID = req.session.user.accountID;

        app.db.collection('events').insert(event,
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

    route.put('/', function(req, res) {

        app.db.collection('events').update({
            "_id": req.body.id,
            "accountID": req.session.user.accountID
        },{
            $set: req.body.data
        },
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

    route.put('/date', function(req, res) {

        app.db.collection('events').update({
            "_id": req.body.id,
            "accountID": req.session.user.accountID
        },{
            $set: {
                "start": req.body.start,
                "end": req.body.end
            }
        },
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

	route.delete('/', function(req, res) {

		app.db.collection('events').remove({
            "_id": req.body.id,
            "accountID": req.session.user.accountID
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	app.use(url, checkAuth, route);
};
