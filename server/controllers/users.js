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
        User.find({ name: request.body.name}, function(err, results){
            if(results[0].password === request.body.password){
                response.redirect('homepage');
            }
            // if(bcrypt.compareSync(request.body.password, results[0].password)){
            //     response.redirect('homepage');
            // }
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
           // var salt = bcrypt.genSaltSync(10);
           // var hash = bcrypt.hashSync(req.body.password, salt);
           // var hash = bcrypt.hashSync(req.body.password, 10);
           // console.log('hash: ', hash);
            var info = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                // password: hash,
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
