chinglish.factory('chatFactory', ['$http', function($http){
	var messages = [];
	var factory = {};
	factory.joinChat = function(){
		io = io.connect();
		var room = 'room';
		io.emit('user_joined', { room: room});
		io.on('joined_broadcast', function(data){
			$('.chat').append('<p>' + data.message + '</p>');
		})
		io.on('message_broadcast', function(data){
			$('.chat').append('<p>' + data.username + ': ' + data.message + '</p>');
		})
	}
	factory.sendMessage = function(message){
		io.emit('message_submit', { message: message });
		
	}
	return factory;
}])