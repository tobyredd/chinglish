var mongoose = require('mongoose');
var time = Date();
var date = time.substring(0, 15);

var UserSchema = new mongoose.Schema( {
        name: String,
        email: String,
        password: String,
        created_at: { type: String, default: date },
        hidden: Boolean,
    });

UserSchema.path('name').required(true, 'User name cannot be blank');
UserSchema.path('email').required(true, 'User email cannot be blank');

mongoose.model('User', UserSchema);
