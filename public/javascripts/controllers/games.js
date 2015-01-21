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
	$scope.start = function(screen, user_input, score, game_over, speed){
		console.log('stuff', screen, user_input, score, game_over);
		console.log('scope: ', $scope.difficulty);
		if($scope.difficulty.level === 'Easy'){
			var speed = 1200;
		}
		else if($scope.difficulty.level === 'Medium'){
			var speed = 1000;
		}
		else{
			var speed = 750;
		}
		console.log('speed: ', speed);
		var screen = document.getElementById(screen);
		// var score = document.getElementById(score);
		var my_game = setInterval(timerTick, speed, gameFactory);
		gameFactory.playGround(screen, user_input, score, my_game, game_over, $scope.difficulty.level);
		timerTick(gameFactory);
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