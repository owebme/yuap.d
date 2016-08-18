$store = {}

$store.filter = function(name, prop, value){
    var items = _.filter($store[name].get(), function(item){
        return item[prop] === value
    });
    return items;
};
