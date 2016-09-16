(function(){

    riot.compile(function(){
        app.fetch("getDataInit").then(function(){
            riot.mount("*");
        });
    });

    if (app.device.isMobile){
        document.getElementById("styles").setAttribute("href", "/assets/css/style.mobi.min.css");
    }

})();
