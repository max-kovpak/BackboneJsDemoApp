define([], function() {

    return Backbone.View.extend({
        template: _.template('<button aria-label="Close" class="close" type="button"><span aria-hidden="true">&times;</span></button><%= message %>'),
        className: 'alert',

        events: {
            'click .close': 'cancel'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        cancel: function() {
            this.model.set('status', 'canceled');
        },

        render: function() {
            this.$el.addClass('alert-'+this.model.get('type'));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

});