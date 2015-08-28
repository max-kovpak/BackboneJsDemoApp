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
            this.notifications = new NotificationsCollection();

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
            '': 'index'
        },

        index: function() {
            require([
                'collections/todos',
                'views/todos',
                'models/todo'
            ], function(TodoCollection, TodosView, TodoModel) {
                var todos = new TodoCollection();
                var view = new TodosView({
                    collection: todos
                });

                view.collection.on('change:completed', function(model) {
                    var object = new (App.container.get('Models.Notification'))({
                        'message': model.get('completed') ? 'Congratulations! This one was done: '+model.escape('title') : 'WTF?!',
                        'type': model.get('completed') ? 'success' : 'danger'
                    });
                    App.notifications.add( object );
                });

                todos.fetch();

                $('#content').html(view.render().el);

                app.container.add('todos', todos);
                app.container.add('todos_view', view);

                setTimeout(function() {
                    var todo = new TodoModel({
                        userId: 1,
                        title: "Написать автотесты по всем спринтам :)"
                    });

                    todos.add(todo);

                    setTimeout(function() {
                        todo.save();

                        setTimeout(function() {
                            todo.destroy();

                            setTimeout(function() {
                                var t = todos.at(todos.length-1);
                                t.set({title: '<script>alert("Sex & Drugs & Rock & Roll");</script>'});
                                t.save();
                            }, 5000);

                        }, 5000);

                    }, 5000);

                }, 5000);
            });
        }
    })));

    return app;
});