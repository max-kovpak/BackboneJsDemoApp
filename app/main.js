require.config({
    urlArgs: "bust=" +  (new Date()).getTime(),//no cache
    paths: {
        app: '/app',
        models: '/app/models',
        collections: '/app/collections',
        views: '/app/views',
        source: '/source/js'
    }
});

var App;
$(window).ready(function(){
    require(['app/app'], function(Application) {
        App = Application;
        App.start();
    });
});