chinglish.controller('words', function($scope, wordFactory){
	console.log('in the angular users controller!');
	$scope.words = wordFactory.getWords(function(data){
		$scope.words = data,
		$scope.currentPage = 0,
		$scope.pageSize = 5,
		$scope.data = [];
		$scope.numberOfPages = function(){
			return Math.ceil($scope.words.length / $scope.pageSize);
		}
		for(var i = 0; i < 94; i++){
			$scope.data.push("item" + i);
		}
	});
	// $scope.words = gameFactory.getWords(function(data){$scope.words = data});
})

chinglish.filter('startFrom', function(){
	return function(input, start){
		start = +start;
		return input.slice(start);
	}
})