define([
    'models/notification'
], function(Notification) {

    return Backbone.Collection.extend({
        model: Notification
    });

});