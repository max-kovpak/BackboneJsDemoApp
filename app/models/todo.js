define(function() {
    return Backbone.Model.extend({
        urlRoot: 'http://jsonplaceholder.typicode.com/todos',
        defaults: {
            title: '',
            completed: false
        },

        reopen: function() {
            this.set({'completed': false});
            this.trigger('reopened');
        },

        complete: function() {
            this.set({'completed': true});
            this.trigger('completed');
        }
    });
});