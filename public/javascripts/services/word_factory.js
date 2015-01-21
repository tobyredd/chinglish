chinglish.factory('wordFactory', ['$http', function($http){
	var words = [];
	var factory = {};
	factory.getWords = function(callback){
		$http.get('/words/index_json').success(function(output){
			words = output;
			callback(output);
		})
		return words;
	}
	return factory;
}]);