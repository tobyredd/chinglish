chinglish.factory('wordFactory', ['$http', function($http){
	var words = [];
	var factory = {};
	factory.getWords = function(callback){
		console.log('here in the words factory!');
		$http.get('/words/index_json').success(function(output){
			words = output;
			console.log(words);
			callback(output);
			// console.log('got words back!');
		})
		return words;
	}
	return factory;
}]);