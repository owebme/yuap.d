var config          = require('./libs/config'),
    log             = require('./libs/log')(module),
    faye            = require('faye'),
    express         = require('express'),
    http            = require('http'),
    request         = require('request'),
    path            = require('path'),
    fs              = require('fs'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    memoryStore     = session.MemoryStore,
    deflate         = require('permessage-deflate'),
    underscore      = require('underscore');
//var generate = require('./generate');

var app = express();
app.express = express;
app.async = require('async');
app.db = require('./libs/db/mongoose')(log, config);
app.log = log;
app.errHandler = require('./libs/errHandler');
app.ObjectId = require('mongodb').ObjectID;
app.utils = require('./libs/utils');
underscore.extend(app.utils, underscore);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: config.get('session:secret'),
	key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new memoryStore(),
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '/')));

app.io = new faye.NodeAdapter({mount: '/faye'});
app.io.addWebsocketExtension(deflate);
app.publish = function(chanel, data){
    app.io.getClient().publish(chanel, data);
};

require('./router')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  app.log.error('Internal error(%d): %s', (err.status || 500), err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.status,
    error: {
        status: err.message
    }
  });
});

var server = http.createServer(app);
server.listen(config.get('port'), function(){
	app.log.info('Express server listening on port ' + config.get('port'));
});

app.io.attach(server);
