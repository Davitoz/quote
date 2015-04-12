
var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Quote,
    url: '/api/quote'
});