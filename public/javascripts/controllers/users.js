chinglish.controller('users', function($scope, userFactory){
	console.log('in the users controller angular side');
	$scope.users = userFactory.getUsers(function(data){$scope.users = data});
	$scope.addUser = function(){
		$('.registration_form').val('');
		userFactory.addNewUser($scope.new_user);
		
	}
})