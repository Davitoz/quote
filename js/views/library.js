
var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#Quote',
    
    initialize: function() {
        this.collection = new app.Library();
        this.collection.fetch({reset: true}); // nær í quote úr database þegar síðan loadast
        this.render();

        this.listenTo( this.collection, 'send', this.renderQuote );//renderar út bækurnar
    },
    
    // render library by rendering each quote in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderQuote( item );
        }, this );
    },

    // render a quote by creating a QuoteView and appending the
    // element it renders to the library's element
    renderQuote: function( item ) {
        var quoteView = new app.QuoteView({
            model: item //næ í bókinna
        });
        this.$el.append( quoteView.render().el );//næ í gögn úr quote viewinu
    },

    events:{
        'click #send':'addQuote' //þegar buttonið me' id add er clickaður á á appið að fara í addQuote functionið
    },

    addQuote: function( e ) {
        e.preventDefault();

        var formData = {};

        $( '#addQuote div' ).children( 'input' ).each( function( i, el ) {//Næ í gögn úr formi
            if( $( el ).val() != '' )//ef input er ekki empty
            {
                    formData[ el.id ] = $( el ).val();
            }
            // Hreinsa input gildin
            $( el ).val('');
        });

        this.collection.create( formData );
    },
});