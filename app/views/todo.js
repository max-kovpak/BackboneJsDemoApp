define(function() {

    return Backbone.View.extend({

        tagName: 'li',
        className: 'list-group-item',
        template: _.template('<h4><% if(typeof id != "undefined") print("#"+id); else print("new"); %> <br> <%- title %> </h4><label>Complete <input class="completed" type="checkbox" <% if(completed) { print("checked") } %> ></label><br><small>UserId: <%= userId %></small> '),

        initialize: function() {
            this.model.on('change reset completed reopened', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            'change .completed': 'changeStatus'
        },

        changeStatus: function() {
            if(this.$el.find('.completed').prop('checked')) {
                this.model.complete();
            } else {
                this.model.reopen();
            }

            this.$el.find('.completed').prop('disable', true);
            this.model.save();

            return this;
        },

        render: function() {
            this.$el
                .html(this.template(this.model.toJSON()))
                .attr('id', 'todo-item-'+this.model.cid);

            if(this.model.get('completed')) {
                this.$el.css({
                    'text-decoration': 'line-through',
                    'color': '#cdcdcd'
                });
            } else {
                this.$el.removeAttr('style');
            }
            return this;
        }
    });

});