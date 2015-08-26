define(function() {
    return Backbone.Model.extend({
        initialize: function() {
            this.on('change:status', function() {
                var status = this.get('status');
                if(status == 'confirmed') {
                    this.trigger('confirmed');
                } else if(status == 'canceled') {
                    this.trigger('canceled');
                }
            });

            this.on('canceled', this.destroy, this);
            this.on('confirmed', this.destroy, this);
        },

        defaults: {
            type: 'success',
            message: '',
            is_confirm: false,
            status: null
        }
    });
});