define(function() {

    return Backbone.Collection.extend({

        current_page: 1,
        pages_count: 0,
        per_page: 50,
        max_pages: 4,

        sync: function(method, model, options) {
            if(method == 'read') {
                options.data = {
                    page: model.current_page+1,
                    per_page: model.per_page
                }
            }

            return Backbone.sync(method, model, options);
        }

    });

});