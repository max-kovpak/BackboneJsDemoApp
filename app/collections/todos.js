define([
    'models/todo'
], function(Todo) {

    return Backbone.Collection.extend({
        url: function() {
            var base = 'http://jsonplaceholder.typicode.com';
            return base+'/todos';
        },

        model: Todo
    });

});