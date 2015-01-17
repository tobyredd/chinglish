var mongoose = require('mongoose');
var Word = mongoose.model('Word');

module.exports = {
	index: function(request, response){
		console.log('looking for words in the words CONTROLLER!');
		Word.find(function(err, words){
			if(err){
				return console.error(err);
			} 
			response.render('index', { my_words: words })
		})
	},
	index_json: function(request, response){
		console.log('here in the words index_json');
		Word.find({}, function(err, results){
			console.log('in the index json WORDS CONTROLLER server side');
			response.send(JSON.stringify(results));
		})
	}
}