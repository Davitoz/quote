app = app || {};

app.views.Quote = Backbone.View.extend({ // gildi á hverju quote-i
	tagName: 'li', //hvert quote á að koma sem list item
	
	attributes: function() {
		return {
			class: 'quote ' + this.model.get('type')
		};
	},
	
	events: {
		'click .list-header': 'showDetails' //þegar ýtt er á quote (list-header) fer þetta í showDetails function-ið
	},
	
	template: _.template($('#quote-template').html()), //veljum hvaða template við viljum nota til að birta gögn í
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON())); //birtir gögnin
		return this;
	},
	
	showDetails: function(e) {
		$(e.target).toggleClass('active');//seigir til um hvað er valið
		$(e.target).siblings('.details').slideToggle('fast'); //div tagið details er birt
	}
	
});

app.views.Quotes = Backbone.View.extend({

	el: '#wrapper', // notar allan kóðann inní wrapper
	
	initialize: function(data) { //notum þessi gildi í byrjun (tekur við gögnum úr router.js)
		this.collection = new app.collections.Quotes(data); //búum til nýtt collection með þessum gögnum
		this.render(); //fer í render function

		this.on('change:searchFilter', this.filterBySearch, this); //hvert skipti sem searchFilter breytist þá er kallað á filterBySearch function-ið

		this.collection.on('reset', this.render, this); //þegar gildin eiga að endurstillast þá þarf að nota þessa aðferð
	},
	
	events: {
		'keyup #searchBox': 'searchFilter', //fylgjumst með hvað er skrifað með lyklaborði í searchboxið //searchFilter er function
	},
	
	render: function() {
		var self = this; //vinnur með gögnin úr initialize
		$('#listing').empty(); // hvert skipti sem við renderum munum við empty-a listann
		_.each(this.collection.models, function(quote) { // _.each er underscore aðferð
			self.renderQuote(quote); //renderum quote  //renderQuote er function sem er skilgreind neðar
		}, this);
	},
	
	renderQuote: function(quote) { //sendum með gildið quote
		var newquote = new app.views.Quote({ //gerum nýtt view
			model: quote
		});
		$('#listing').append(newquote.render().el); //bætum við nýju quote-i í listann
	},
	
	getTypes: function() {
		return _.uniq(this.collection.pluck('type'));
	},
	
	
	searchFilter: function(e) {
		this.searchFilter = e.target.value; // set það sem er skrifað sem gildi í searchFilter
		this.trigger('change:searchFilter'); //þegar searchFilerin breytist gerist eitthvað
	},

	
	filterBySearch: function() {
		this.collection.reset(directoryData, {silent: true}); //við fáum gögn sem tengjast því sem var skrifað  //(directoryData er gögn úr data.js)
		var filterString = this.searchFilter, //þetta er strengurinn sem var skrifaður //notum searchFilter 
			filtered = _.filter(this.collection.models, function(item) { //filtered er array //birtum bara gögn sem tengjast því sem leitað var að
				return item.get('quote').toLowerCase().indexOf(filterString.toLowerCase()) !== -1; // ef stafurinn sem leitað er eftir er til í 
																									  // quote-inu þá er það nafn birt
			});
		this.collection.reset(filtered); //setjum nýju gildin í staðinn fyrir gömlu
	},
	
	
});