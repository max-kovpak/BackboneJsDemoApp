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

        var object = new (App.container.get('Models.Notification'))({
            'message': 'Are you sure?',
            'is_confirm': true,
            'type': 'warning'
        });

        App.notifications.add( object );

        object.on('confirmed', function() {
            alert('Confirmed!');
        });

    });
});