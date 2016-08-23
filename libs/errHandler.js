module.exports = function(res, err, data, app, callback){
    try {
        if (!data) {
            res.statusCode = 404;
            return res.send({status: 'Not found'});
        }
        if (!err) {
            if (callback) {
                callback(err, data);
            }
            else {
                res.statusCode = 200;
                return res.send({status: 'OK', result: data});
            }
        }
        else {
            res.statusCode = 500;
            app.log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({status: 'Server error'});
        }
    }
    catch(e){
        console.log('Ошибка ' + e.name + ':' + e.message);
    }
};
