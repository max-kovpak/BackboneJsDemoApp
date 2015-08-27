define([
    'views/todo'
], function(TodoView) {

    return Backbone.View.extend({

        tagName: 'ul',
        className: 'list-group',
        id: 'todo-list',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        addOne: function(model) {
            var view = new TodoView({model: model});
            this.$el.append(view.render().el);
            return this;
        },

        render: function() {
            this.collection.forEach(this.addOne, this);
            return this;
        }
    });

});