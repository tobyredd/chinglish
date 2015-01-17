chinglish.controller('games', function($scope, gameFactory){
	$scope.words = gameFactory.Word(function(data){$scope.words = data})
	$scope.submit = function() {
		console.log($scope.text);
		gameFactory.submitAnswer($scope.text);
	}
	$scope.start = function(screen, user_input, score){
		console.log('stuff', screen, user_input, score);
		var screen = document.getElementById(screen);
		// console.log('hello start', screen);
		// gameFactory.startGame(screen, user_input, score);
		
		setInterval(gameFactory.playGame(screen, user_input, score), 500);
	}

  
})