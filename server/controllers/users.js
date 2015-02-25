var mongoose = require('mongoose')
var User = mongoose.model('User');
var bcrypt = require('bcrypt');


module.exports = {
    index: function(request, response) {
        response.render('index',  { title: 'Welcome Page' });
    },
    login: function(request, response){
        console.log('inside the controller method login');
        console.log('info: ', request.body);
        User.findOne({ name: request.body.name}, function(err, user){
            // if(user[0].password === request.body.password){
            //     response.redirect('homepage');
            // }
            ////testing encryption//////
            if(!user){
             response.redirect('/');
            }
            else{
                user.comparePassword(request.body.password, function(err, isMatch){
                    if(err) throw err;
                    console.log(request.body.password, ': ', isMatch);
                        response.redirect('homepage');
                })
                user.comparePassword(request.body.password, function(err, isMatch){
                    if(err) throw err;
                    console.log(request.body.password, ': ', isMatch);
                })
            }
            ///////end test....//////
        });
    },
    homepage: function(request, response){
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
        if(req.body.password !== req.body.confirm_password){
        }
        else{
            var info = {
                name: req.body.name,
                password: req.body.password,
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
