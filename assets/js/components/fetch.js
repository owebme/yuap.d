app.fetch = app.fetch || {};

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

            var chanels = [
                {
                    chanel: 'callback',
                    title: 'Звонки'
                },
                {
                    chanel: 'messenger',
                    title: 'Онлайн-чат'
                },
                {
                    chanel: 'reviews',
                    title: 'Отзывы'
                },
                {
                    chanel: 'tweet',
                    title: 'Твиты'
                },
                {
                    chanel: 'orders',
                    title: 'Заявки'
                }
            ];

            _.each(chanels, function(item){
                item.count = 0;
                item.active = true;
            });

            _.each(data.list, function(item){
                item.active = true;
            });

            _.each(data.status, function(item){
                item.active = true;
            });

            $store.chanels.set(chanels);
            $store.status.set(data.status);
            $store.data.set(data.list);
            $store.tags.set(data.tags);

            resolve(data);
        });
    });
};
