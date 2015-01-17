var mongoose = require('mongoose');
var WordSchema = new mongoose.Schema({
	chinese: String,
	english: String,
	hidden: Boolean
});
mongoose.model('Word', WordSchema);