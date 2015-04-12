
var app = app || {};

app.Quote = Backbone.Model.extend({
    defaults: {
        quote: 'Empty',
        author: 'Unknown',
        category: 'None'
    }
});