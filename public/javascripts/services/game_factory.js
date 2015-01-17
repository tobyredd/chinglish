chinglish.factory('gameFactory', ['$http', function($http){
	var words = [];
	var factory = {};
	factory.Word = function(callback){
		$http.get('/words/index_json').success(function(output){
			words = output;
			callback(output);
			console.log('words: ', words[1].chinese);

		})
		return words;
	}
	factory.submitAnswer = function(info){
		console.log('info: ', info);
	}

	factory.playGame = function(screen, user_input, score){
		console.log('passed in: ', screen, user_input, score);
		this.screen = screen
		this.user_input = user_input;
		this.words = [];
		this.user_score = 0;
		this.score = score;
		this.counter = 0;

		this.createWord = function(){
			this.counter++;
			var newWord = new Word(this.counter);

			newWord.createRandomWordsBetween(350, 1000);
			this.words.push(newWord);
			console.log('game words: ', words);
			console.log('newWord id: ', newWord.id);
			my_string = "<div id='word_" + (newWord.id) + "'><div style='position: absolute; left:" + newWord.x + "px; top:" + newWord.y + "px'>" + newWord.word + "</div></div>";
			console.log(my_string);
			this.screen.innerHTML = this.screen.innerHTML + my_string;
		}
		this.fallWords = function(){
			console.log('made it to the fall words functino!');
			for(i = this.words.length - 1; i >= 0; i--){
				this.words[i].y = this.words[i].y + 15;
				if(this.words[i].y > 385){
					$('#word_' + this.words[i].id).remove();
					if(this.words[i].word != ''){
						this.score = this.score - 1;
					}
					$('#' + this.user_score).text(this.score);
					this.words.shift();
					
				}
			}
		}
		this.updatePosition = function(){
			for(i in this.words){
				loc = document.getElementById('word_'+this.words[i].id);
				if(loc){
					loc.innerHTML = "<div style='position: absolute; left:" + this.words[i].x + "px; top:" + this.words[i].y + "px'>" + this.words[i].word + "</div>";

				}
			}
		}
		this.createWord();
		this.fallWords();
		this.updatePosition();
	}
	function Word(id){
		this.x = 0;
		this.y = 0;
		this.id = id;
		console.log('id;', id);

		this.createRandomWordsBetween = function(x_min, x_max)
		{
			random_index = parseInt(Math.random()*words.length);
			this.word = words[random_index].chinese;
			random_x_index = parseInt(Math.random()*(750));
			this.x = random_x_index;
		}
	}	

// ////////this will need to be pulling from the db, where we will save {chinese: '九', english: 'nine'},,,,, or possibly{chinese: IMG, english: translate}///

// 	///////end here/////
	return factory;
}])


