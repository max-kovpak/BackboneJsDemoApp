define([
    'views/confirm',
    'views/alert'
], function(ConfirmView, AlertView) {

    return Backbone.View.extend({

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        addOne: function(model) {
            var view = model.get('is_confirm')
                ? new ConfirmView({model: model})
                : new AlertView({model: model});

            this.$el.append(view.render().el);

            return this;
        },

        render: function() {
            this.collection.forEach(this.addOne, this);
            return this;
        }
    });

});