chinglish.controller('words', function($scope, wordFactory){
	console.log('in the angular users controller!');
	$scope.words = wordFactory.getWords(function(data){$scope.words = data});
	// $scope.words = gameFactory.getWords(function(data){$scope.words = data});
})