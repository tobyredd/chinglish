chinglish.controller('chats', function($scope, chatFactory){
	// $scope.messages = chatFactory.getMessages();
	var my_messages = [];
	$scope.joinChat = function(){
		console.log('here in the join chat function in the chat controller!');
		$('.chat').append('<p>You have joined the chat!</p>');
		chatFactory.joinChat();
	}
	$scope.sendMessage = function(){
		console.log('scope: ', $scope.message);
		// my_messages.push({message: $scope.message});
		// console.log('my messages: ', my_messages);
		// return my_messages;
		/////show the typed in info here, don't even worry about server///////
		$('.chat').append('<p>me: ' + $scope.message + '</p>');
		chatFactory.sendMessage($scope.message);
	}
})