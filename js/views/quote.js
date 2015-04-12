
var app = app || {};

app.QuoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'quoteContainer',
    template: _.template( $( '#quoteTemplate' ).html() ),

    render: function() {
        //this.el er það sem er skilgreint í tagName. við notum $el til að fá aðgang að jQuery html()
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    },
});