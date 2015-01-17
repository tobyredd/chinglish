var users = require('./../server/controllers/users.js');
var words = require('./../server/controllers/words.js');
//  load other controllers here

module.exports = function Routes(app) {
    app.get('/',                    function(request, response) { users.index(request, response) });
    app.get('/users',               function(request, response) { users.index(request, response) });
    app.get('/users/index',         function(request, response) { users.index(request, response) });
    app.get('/users/index.json',    function(request, response) { users.index_json(request, response) });

    app.get('/users/new',           function(request, response) { users.new(request, response) });
    app.post('/users/newUser_json', function(request, response) { users.newUser_json(request, response) });
    app.post('/users',              function(request, response) { users.create(request, response) });

    app.get('/users/:id',           function(request, response) { users.show(request, response) });
    app.get('/users/:id/edit',      function(request, response) { users.edit(request, response) });
    ///////////my actual routes////////
    app.post('/users/create_json', function(req, res){console.log('in the routes!', req.body); users.create(req, res)});
    ///////////////////////////////////

    /////my words routes/////
    app.get('/words/index_json', function(req, res){console.log('in the routes!!'); words.index_json(req, res)});
    /////////////////////////

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
