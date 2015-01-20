var mongoose = require('mongoose')
var User = mongoose.model('User');


module.exports = {
    index: function(request, response) {
        response.render('index',  { title: 'Welcome Page' });
    },
    login: function(request, response){
        console.log('inside the controller method login');
        console.log('info: ', request.body);
        User.find({ name: request.body.name}, function(err, results){
            if(results[0].password === request.body.password){
                response.redirect('homepage');
            }
        });
    },
    homepage: function(request, response){
        console.log('home page session: ', request.session);
        if(request.session.name){
            response.render('home', {username: request.session.name});
        }
        else{
            response.render('index');
        }
    },
    index_json: function(request, response) { 
        User.find({}, function(err, results) {
            response.send(JSON.stringify(results));
        });
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
        var a = new User(req.body);
        a.save(function(err) {
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                res.send('success');
            }
        });
    },
}
