var users = require('./../server/controllers/users.js');
var words = require('./../server/controllers/words.js');
var scores = require('./../server/controllers/scores.js');
//  load other controllers here

module.exports = function Routes(app) {
    ///////////my actual routes////////
    /////login page////
    app.get('/', function(request, response) { users.index(request, response) }); 
    ///user registration//
    app.post('/users/create_json', function(req, res){users.create(req, res)});   
    app.post('/users/login', function(req, res){ 
        req.session.name = req.body.name; 
        users.login(req, res) 
    });
     /////dashboard///////
    app.get('/homepage', function(req, res){ users.homepage(req, res) });
    
    ///////////////////////////////////
    app.get('/logout', function(req, res){
        delete req.session.name;
        res.redirect('/');
    })
    /////my words routes/////
    app.get('/words/index_json', function(req, res){words.index_json(req, res)});
    //////save user score//////
    app.post('/scores/save_score', function(req, res){scores.save(req, res)}); 
    app.get('/scores/index', function(req, res){ scores.index(req, res) });
    /////////chat room io routes///////
    app.io.route('user_joined', function(request){
        request.io.join(request.data.room);
        request.io.broadcast('joined_broadcast', {message: request.session.name + ' has entered the chatroom!', socketID: request.socket.id})
    })
    app.io.route('message_submit', function(request){
        request.io.broadcast('message_broadcast', {username: request.session.name, message: request.data.message, socketID: request.socket.id });
    })
    //////////////////////////////
};
