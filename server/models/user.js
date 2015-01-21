var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var time = Date();
var date = time.substring(0, 15);

var UserSchema = new mongoose.Schema( {
        name: String,
        email: String,
        password: String,
        created_at: { type: String, default: date },
        hidden: Boolean,
    });
/////
UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		
		bcrypt.hash(user.password, salt, function(err, hash){
			user.password = hash;
			next();
		})
	})
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) return cb(err);
		cb(null, isMatch);
	});
}
/////
// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('email').required(true, 'User email cannot be blank');

mongoose.model('User', UserSchema);
