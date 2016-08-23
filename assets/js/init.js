(function(){

    app.$dom.window.on('load', function(){
        app.fetch("getDataInit").then(function(){
            riot.mount("*");
        });
    });

    if (app.device.isMobile){
        document.getElementById("styles").setAttribute("href", "/assets/css/style.mobi.min.css");
    }

    // app.$dom.body.on("click", ".modal__button__sendEmail", function(){
    //     $(".popup").attr("data-open", "true");
    // });
    //
    // app.$dom.body.on("click", ".popup__close", function(){
    //     $(".popup").attr("data-open", "false");
    // });
    //
    // app.$dom.body.on("click", ".data__item__edit", function(){
    //     $("#page").addClass("no-scroll");
    //     $(".modal").css("top", $("#page")[0].scrollTop + "px").attr("data-open", "true");
    // });
    //
    // app.$dom.body.on("click", ".modal__button__close, .modal__footer", function(){
    //     $("#page").removeClass("no-scroll");
    //     $(".modal").attr("data-open", "false");
    // });

})();
