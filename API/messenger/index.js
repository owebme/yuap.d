module.exports = function(app){

    app.io.on('publish', function(clientId, channel, data) {
        console.log('[PUBLISH] ' + clientId + ' -> ' + channel);
        console.log('[PUBLISH] - data:');
        console.dir(data);
    });

    // bayeux.getClient().subscribe('/rooms/*', function(message) {
    //     console.dir(message);
    // });

    // bayeux.on('handshake', function(clientId) {
    //     console.log('Client connected', clientId);
    // });
    //
    // bayeux.on('subscribe', function(clientId, channel) {
    //     console.log('[SUBSCRIBE] ' + clientId + ' -> ' + channel);
    // });
    //
    // bayeux.on('unsubscribe', function(clientId, channel) {
    //     console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
    // });
    //
    // bayeux.on('disconnect', function(clientId) {
    //     console.log('[DISCONNECT] ' + clientId);
    // });    

}
