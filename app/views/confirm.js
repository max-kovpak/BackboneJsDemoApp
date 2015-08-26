define([], function() {

    return Backbone.View.extend({
        template: _.template('<button aria-label="Close" class="close" type="button"><span aria-hidden="true">&times;</span></button><%= message %> <div><button class="confirm-btn btn btn-default btn-sm">Yes</button> <button class="cancel-btn btn btn-default btn-sm">No</button></div>'),
        className: 'alert',

        events: {
            'click button.close': 'cancel',
            'click button.cancel-btn': 'cancel',
            'click button.confirm-btn': 'confirm'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        confirm: function() {
            this.model.set('status', 'confirmed');
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