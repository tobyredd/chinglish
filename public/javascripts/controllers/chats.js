chinglish.controller('chats', function($scope, chatFactory){
	var my_messages = [];
	$scope.joinChat = function(){
		$('.chat').append('<p>You have joined the chat!</p>');
		chatFactory.joinChat();
	}
	$scope.sendMessage = function(){
		$('.chat').append('<p>me: ' + $scope.message + '</p>');
		$('#user_input').val('');
		chatFactory.sendMessage($scope.message);
	}
})