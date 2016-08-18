app.fetch = function(names){
    var listMain = [],
        listSecond = [],
        parts = names.split(", ");

    return new Promise(function(resolve, reject){
        for (i = 0; i < parts.length; i++) {
            if (_.isFunction(app.fetch.API[parts[i]])) {
                listMain.push(parts[i]);
            }
        }
        if (parts.length !== listMain.length){
            listSecond = _.without(parts, listMain);
        }
        Promise.all(listMain.map(app.fetch.API).concat(listSecond.map(app.request)))
        .then(function(results) {
            resolve(results);
        })
    });
};

app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(data){
            try {
                if (data.list && data.list[0].metrika){
                    var size = data.list.length;
                    for (var i = 0; i < size; i++){
                        var metrika = data.list[i].metrika;
                        data.list[i].metrikaLast = metrika[metrika.length - 1];
                    }
                }
            } catch(e){}

            _.each(data.list, function(item){
                item.active = true;
            });

            _.each(data.status, function(item){
                item.active = true;
            });

            $store.status = new Baobab(data.status);
            $store.data = new Baobab(data.list);

            resolve(data);
        });
    });
};
