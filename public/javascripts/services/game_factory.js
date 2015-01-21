chinglish.factory('gameFactory', ['$http', function($http){
	var scores = [];
	var words = [];
	this.user_score = 0;
	this.counter = 0;
	var factory = {};
	var total = 0;
	factory.getWords = function(callback){
		$http.get('/words/index_json').success(function(output){
			words = output;
			callback(output);
		})
		return words;
	}
	factory.getScores = function(callback){
		$http.get('/scores/index').success(function(output){
			scores = output;
			callback(output);
		})
		return scores;
	}
	factory.submitAnswer = function(info){
		ini_score = this.score;
		for(i in this.my_words){
			if(this.my_words[i].translation === info){
				$('#word_' + this.my_words[i].id).remove();
				this.score = this.score + 5;
				$('#' + this.user_score).text(this.score);
			}
		}
	}

	factory.createWord = function(){
			this.counter++;
			var newWord = new Word(this.counter);
			newWord.createRandomWordsBetween(380, 1000);
			this.my_words.push(newWord);
			my_string = "<div id='word_" + (newWord.id) + "'><div style='position: absolute; left:" + newWord.x + "px; top:" + newWord.y + "px'>" + newWord.word + "</div></div>";
			this.screen.innerHTML = this.screen.innerHTML + my_string;
	}
	factory.fallWords = function(){
		for(i = this.my_words.length - 1; i >= 0; i--){
			this.my_words[i].y = this.my_words[i].y + 15;
			if(this.my_words[i].y > 385){
				$('#word_' + this.my_words[i].id).remove();
				if(this.my_words[i].word != ''){
					this.score = this.score - 1;
					this.mistakes += 1;
				}
				$('#' + this.user_score).text(this.score);
				this.my_words.shift();
			}
		}
	}
	factory.updatePosition = function(){
		for(i in this.my_words){
			loc = document.getElementById('word_'+this.my_words[i].id);
			if(loc){
				loc.innerHTML = "<div style='position: absolute; left:" + this.my_words[i].x + "px; top:" + this.my_words[i].y + "px; font-size: 20px;'>" + this.my_words[i].word + "</div>";

			}
		}
	}
	factory.playGround = function(screen, user_input, score, stopper, game_over, speed){
		this.screen = screen
		this.user_input = user_input;
		this.user_score = score;
		this.my_words = [];
		this.score = 0;
		this.counter = 0;
		this.mistakes = 0;
		this.my_game = stopper;
		this.game_over = game_over;
		this.speed = speed;
	}
	factory.playGame = function(){
		// console.log('passed in: ', screen, user_input, score);
		
		
		this.createWord();
		this.fallWords();
		this.updatePosition();
		if(this.mistakes === 5){
			clearInterval(this.my_game);
			var info = {};
			info.total = this.score;
			info.difficulty = this.speed;
			$('#' + this.game_over).text('5 hit the bottom, game over..refresh to restart');
			///////saving score to the database//////
			$http.post('/scores/save_score', info).success(function(){
				console.log('saving user score');
			});
			return console.log('too many mistakes, heres your score: ', info);
		}
	}

	function Word(id){
		var game_words = words;
		this.x = 0;
		this.y = 0;
		this.id = id;
		this.createRandomWordsBetween = function(x_min, x_max)
		{
			random_index = parseInt(Math.random()*game_words.length);
			this.word = game_words[random_index].chinese;
			this.translation = game_words[random_index].english;
			random_x_index = parseInt(Math.random()*(600));
			this.x = random_x_index;
		}
	}
	return factory;
}]);




