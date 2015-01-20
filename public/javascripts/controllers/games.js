chinglish.controller('games', function($scope, gameFactory){
	$scope.words = gameFactory.getWords(function(data){$scope.words = data});
	$scope.scores = gameFactory.getScores(function(data){
		$scope.scores = data,
		$scope.currentPage = 0,
		$scope.pageSize = 5,
		$scope.data = [],
		$scope.numberOfPages = function(){
			return Math.ceil($scope.scores.length / $scope.pageSize);
		}
		for(var i = 0; i < 10; i++){
			$scope.data.push("item " + i);
		}
	});
	$scope.submit = function() {
		console.log($scope.text);
		gameFactory.submitAnswer($scope.text);
	}
	function timerTick(myFactory){
		myFactory.playGame();
	}
	$scope.start = function(screen, user_input, score, game_over){
		console.log('stuff', screen, user_input, score, game_over);
		var screen = document.getElementById(screen);
		// var score = document.getElementById(score);
		var my_game = setInterval(timerTick, 100, gameFactory);
		gameFactory.playGround(screen, user_input, score, my_game, game_over);
		// timerTick(gameFactory);
	}
	$scope.config = {
		itemsPerPage: 5,
		fillLastPage: true
	}
  
})

chinglish.filter('startFrom', function(){
	return function(input, start){
		start = +start;
		return input.slice(start);
	}
})