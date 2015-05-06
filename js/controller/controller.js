app = {
	
	models: {},
	views: {},
	collections: {},
	init: function() { //app.js notar þetta function
		directory = new app.views.Quotes(directoryData); //birtir gögnin með aðferðinni úr quote-views.js //notar gögnin úr data.json
	}
	
}