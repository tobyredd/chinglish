var mongoose = require('mongoose')
var User = mongoose.model('User');

module.exports = {
    index: function(request, response) {
        response.render('index',  { title: 'Welcome Page' });
    },
    index_json: function(request, response) { 
        User.find({}, function(err, results) {
            response.send(JSON.stringify(results));
        });
    },

    new: function(request, response) {
        response.render('users/new',  { title: 'New User' });
    },
    create: function(req, res) {
        console.log('info from server controller: ', req.body);
        if(req.body.password !== req.body.confirm_password){
            console.log('password doesnt match confirmation..');
        }
        else{
            var info = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                // password: CryptoJS.MD5(req.body.password),
                created_at: req.body.created_at
            }
            console.log('about to model: ', info);
        }
        // var a = new User(request.body);
        // a.save(function(err) {
        //     if (err) {
        //         response.send(JSON.stringify(err));
        //     } else {
        //         response.send('success');
        //     }
        // });
    },
    show: function(request, response) {
        response.render('users/show', { title:'User Detail'});
    },
    edit: function(request, response) {
        response.render('users/edit', { title:'Edit User'});
    }
}
