chinglish.controller('games', function($scope, gameFactory){
	$scope.words = gameFactory.getWords(function(data){$scope.words = data})
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

  
})