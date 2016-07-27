(function(){

    app.$dom.window.on('load', function(){
        riot.mount("*");
    });

    app.$dom.body.on("click", ".data__item__header", function(){
        var $item = $(this).closest(".data__item");
        $item.toggleClass("data__item--active");
    });

})();
