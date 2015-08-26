define([
    'models/notification',
    'collections/notifications',
    'views/alert',
    'views/confirm',
    'views/notifications'
], function (Notification, NotificationsCollection, AlertView, ConfirmView, NotificationsViews) {

    function CONTAINER(vars) {
        var container = typeof vars == 'object' ? vars : {};

        this.add = function(key, value) {
            container[key] = value;
        };

        this.get = function(key) {
            return typeof container[key] == 'undefined' ? null : container[key];
        };
    }

    var APPLICATION = function() {
        this.container = new CONTAINER({
            'Models.Notification': Notification,
            'Collections.Notifications': NotificationsCollection,
            'Views.Notifications': NotificationsViews,
            'Views.Alert': AlertView,
            'Views.Confirm': ConfirmView
        });
    };

    APPLICATION.prototype = {
        notifications: null,

        start: function() {
            this.notifications = new NotificationsCollection([
                new Notification({message: 'test'})
            ]);

            var notificationsView = new NotificationsViews({
                collection: this.notifications
            });

            $('#notifications-bag').html(notificationsView.render().el);

            Backbone.history.start({pushState: true});
        }
    };

    var app = new APPLICATION();

    app.container.add('Router', new (Backbone.Router.extend({
        routes: {
            '': 'index',
            'add': 'add',
            'edit/:id': 'edit'
        },

        index: function() {
            require([], function(todoItem) {

            });
        },

        add: function() {
            require([], function(todoItem) {

            });
        },

        edit: function(id) {
            require([], function(todoItem) {

            });
        }
    })));

    return app;
});