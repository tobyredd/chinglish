var mongoose = require('mongoose')
var Score = mongoose.model('Score');


module.exports = {
	index: function(request, response){
		Score.find({}, function(err, results){
			response.send(JSON.stringify(results));
		})
	},
	save: function(request, response){
		var time = Date();
		var date = time.substring(0, 15);
		console.log('made it to the save score function!', request.body);
		console.log('session user: ', request.session.name);
		var info = {
			name: request.session.name,
			score: request.body.total,
			difficulty: request.body.difficulty,
			// score: 35,
			created_at: date
		};
		Score.find({}, function(err, results){
			
			console.log('results is an array!!!, ', results[0]._id);
			console.log('results is an array!!!, ', results.length);
			if(results.length < 10){
				//save the info to the db, because it will be in the top 10 no matter what the score is///
				// console.log('all scores: ', scores);
				var a = new Score(info);
				a.save(function(err){
					if(err){
						response.send(JSON.stringify(err));
					} 
					else{
						response.send('success');
					}
				})
			}
			else{
				var min = results[0];
				for(var i = 0; i < results.length; i++){
					if(results[i].total < min){
						min = results[i];
					}
					if(info.score > min.score){
						/////remove the object from the db, and save the new object to the db//////
						Score.remove({_id: min._id}, function(err, results){
							var a = new Score(info);
							a.save(function(err){
								if(err){
									response.send(JSON.stringify(err));
								} 
								else{
									response.send('success');
								}
							});
						});
						break;
					}
				}
			}
		});
		console.log('info, ', info);
	}	
}
			
			
		
