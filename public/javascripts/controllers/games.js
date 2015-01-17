chinglish.controller('games', function($scope, gameFactory){
	$scope.words = gameFactory.getWords(function(data){$scope.words = data})
	$scope.submit = function() {
		console.log($scope.text);
		gameFactory.submitAnswer($scope.text);
	}
	function timerTick(myFactory){
		myFactory.playGame();
	}
	$scope.start = function(screen, user_input, score){
		console.log('stuff', screen, user_input, score);
		var screen = document.getElementById(screen);
		gameFactory.playGround(screen, user_input, score);
		setInterval(timerTick, 500, gameFactory);
		// timerTick(gameFactory);
	}

  
})