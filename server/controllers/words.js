var mongoose = require('mongoose');
var Word = mongoose.model('Word');

module.exports = {
	index: function(request, response){
		Word.find(function(err, words){
			if(err){
				return console.error(err);
			} 
			response.render('index', { my_words: words })
		})
	},
	index_json: function(request, response){
		Word.find({}, function(err, results){
			response.send(JSON.stringify(results));
		})
	}
}