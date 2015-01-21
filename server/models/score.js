var mongoose = require('mongoose');
var time = Date();
var date = time.substring(0, 15);

var ScoreSchema = new mongoose.Schema( {
        name:  String,
        score: String,
        difficulty: String,
        created_at: { type: String, default: date },
        hidden: Boolean,
    });

mongoose.model('Score', ScoreSchema);