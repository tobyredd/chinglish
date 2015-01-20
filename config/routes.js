var users = require('./../server/controllers/users.js');
var words = require('./../server/controllers/words.js');
var scores = require('./../server/controllers/scores.js');
//  load other controllers here

module.exports = function Routes(app) {
    ///////////my actual routes////////
    app.get('/',                    function(request, response) { users.index(request, response) });                /////login page////
    app.post('/users/create_json', function(req, res){console.log('in the routes!', req.body); users.create(req, res)});     ///user registration//
    app.post('/users/login', function(req, res){ 
        console.log('req.body.name: ', req.body.name);
        console.log('req.body.id: ', req.body);
        console.log('session: ', req.session);
        req.session.name = req.body.name; 
        // req.session.id = req.body._id;
        users.login(req, res) 
    });
    app.get('/homepage',                function(req, res){ users.homepage(req, res) });                                /////dashboard///////
    
    ///////////////////////////////////
    app.get('/logout', function(req, res){
        delete req.session.name;
        res.redirect('/');
    })
    /////my words routes/////
    app.get('/words/index_json', function(req, res){console.log('in the routes!!'); words.index_json(req, res)});
    /////////////////////////
    /////my scores//////////
    app.post('/scores/save_score', function(req, res){ console.log('made it to save score route! ', req.body); scores.save(req, res)});                    //////save user score//////
    app.get('/scores/index', function(req, res){ scores.index(req, res) });


    app.io.route('client_ready',    function(request) {
        console.log('A new user connected.');

        // sending a message to just that person
        request.io.emit('info', { msg: 'The world is round, there is no up or down.' }); 

        // broadcasting to everyone
        app.io.broadcast('global_event', { msg: 'hello' });      

        // broadcasting an event to everyone except the person you established the socket connection to
        request.io.broadcast('event', {msg: 'hi' });        

        // listening for an event
        app.io.route('my other event', function(data) { console.log("Received 'my other event' :", data); });  
        app.io.route('disconnect',  function() { app.io.broadcast('user disconnected'); });
    });
};
