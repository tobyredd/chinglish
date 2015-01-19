chinglish.factory('gameFactory', ['$http', function($http){
	var words = [];
	this.user_score = 0;
	this.counter = 0;
	var factory = {};
	var total = 0;
	factory.getWords = function(callback){
		$http.get('/words/index_json').success(function(output){
			words = output;
			callback(output);
			// console.log('words: ', words);

		})
		return words;
	}
	factory.submitAnswer = function(info){
		console.log('info: ', info);
		console.log('words: ', this.my_words );
		ini_score = this.score;
		for(i in this.my_words){
			if(this.my_words[i].translation === info){
				console.log('yes!!!  ', this.my_words[i].id);
				$('#word_' + this.my_words[i].id).remove();
				this.score = this.score + 5;
				console.log('my current score: ', this.score);
				$('#' + this.user_score).text(this.score);
				console.log('score ', this.score);
			}
		}
	}

	factory.createWord = function(){
			this.counter++;
			var newWord = new Word(this.counter);

			newWord.createRandomWordsBetween(350, 1000);
			this.my_words.push(newWord);
			// console.log('game my_words: ', my_words);
			// console.log('newWord id: ', newWord.id);
			my_string = "<div id='word_" + (newWord.id) + "'><div style='position: absolute; left:" + newWord.x + "px; top:" + newWord.y + "px'>" + newWord.word + "</div></div>";
			// console.log(my_string);
			this.screen.innerHTML = this.screen.innerHTML + my_string;
	}
	factory.fallWords = function(){
		// console.log('made it to the fall my_words functino!');
		for(i = this.my_words.length - 1; i >= 0; i--){
			this.my_words[i].y = this.my_words[i].y + 15;
			if(this.my_words[i].y > 385){
				$('#word_' + this.my_words[i].id).remove();
				if(this.my_words[i].word != ''){
					this.score = this.score - 1;
					this.mistakes += 1;
					// console.log('score divvvv: ', this.user_score);
					console.log('my score: ', this.score);
					// this.user_score.innerHTML = "<div><p>" + this.score + "</p></div>";
				}
				// sco = document
				// $('#' + this.user_score).text(this.score);
				$('#' + this.user_score).text(this.score);
				this.my_words.shift();
			}
		}
	}
	factory.updatePosition = function(){
		for(i in this.my_words){
			loc = document.getElementById('word_'+this.my_words[i].id);
			if(loc){
				loc.innerHTML = "<div style='position: absolute; left:" + this.my_words[i].x + "px; top:" + this.my_words[i].y + "px'>" + this.my_words[i].word + "</div>";

			}
		}
	}
	factory.playGround = function(screen, user_input, score, stopper, game_over){
		this.screen = screen
		this.user_input = user_input;
		this.user_score = score;
		console.log('this.user_score: ', this.user_score );
		this.my_words = [];
		this.score = 0;
		this.counter = 0;
		this.mistakes = 0;
		this.my_game = stopper;
		this.game_over = game_over;
		console.log('my game varaible, ', this.my_game);
	}
	factory.playGame = function(){
		// console.log('passed in: ', screen, user_input, score);
		
		
		this.createWord();
		this.fallWords();
		this.updatePosition();
		if(this.mistakes === 5){
			clearInterval(this.my_game);
			total = this.score;
			$('#' + this.game_over).text('5 hit the bottom, game over..refresh to restart');
			return console.log('too many mistakes, heres your score: ', total);
		}
	}

	function Word(id){
		var game_words = words;
		this.x = 0;
		this.y = 0;
		this.id = id;
		// console.log('id;', id);	

		this.createRandomWordsBetween = function(x_min, x_max)
		{
			random_index = parseInt(Math.random()*game_words.length);
			this.word = game_words[random_index].chinese;
			this.translation = game_words[random_index].english;
			random_x_index = parseInt(Math.random()*(750));
			this.x = random_x_index;
		}
	}

// ////////this will need to be pulling from the db, where we will save {chinese: '九', english: 'nine'},,,,, or possibly{chinese: IMG, english: translate}///

// 	///////end here/////
	return factory;
}]);




