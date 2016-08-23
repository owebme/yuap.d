$store = {}

$store.filter = function(name, prop, value){
    var items = _.filter($store[name].get(), function(item){
        return item[prop] === value
    });
    return items;
};

$store.data = _.extend(new Baobab(), {
    isChecked: function(state, getIds){
        var items = _.filter($store.data.get(), function(item){
            return item.state === state && item.checked === true
        });
        if (getIds) return _.pluck(items, "_id");
        else return items;
    },
    getCoverTitle: function(item){
        if (item.name) {
            var name = "",
                arr = item.name.split(" ");
            for (i = 0; i < arr.length; i++) {
                if (i > 0) break;
                name += arr[i].substr(0, 1);
            }
            return name;
        }
        else if (item.city) {
            return item.city.substr(0, 1);
        }
    },
    getTimeVisit: function(sec){
        if (sec > 0 && sec < 60) return "0:" + sec;
        else if (sec > 59) {
            if (sec > 3600) return "> 60";
            else return Math.ceil(sec / 60);
        }
    }
});

$store.chanels = new Baobab();

$store.status = _.extend(new Baobab(), {
    getTitle: function(id){
        return $store.status.get({'_id': String(id)}, 'title');
    },
    getColor: function(id){
        return $store.status.get({'_id': String(id)}, 'color');
    }
});

$store.tags = _.extend(new Baobab(), {
    getTitle: function(id){
        return $store.tags.get({'_id': String(id)}, 'title');
    }
});
