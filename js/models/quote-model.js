app = app || {};

app.models.Quote = Backbone.Model.extend({
	defaults: {
		'ID': '',
		'quote': '',
		'author': '',
		'category': '',
		'source': ''
	},
	
});

app.collections.Quotes = Backbone.Collection.extend({
	
	model: app.models.Quote, //notum modelið quote
	
	comparator: function(quote) { //flokkar röð quote-a eftir id
		return quote.get('ID');
	}
	
});
