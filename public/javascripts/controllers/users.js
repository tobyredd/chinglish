chinglish.controller('users', function($scope, userFactory){
	console.log('in the users controller angular side');
	$scope.users = userFactory.getUsers(function(data){$scope.users = data});
	$scope.addUser = function(){
		userFactory.addNewUser($scope.new_user);
	}
	$scope.loginUser = function(){
		userFactory.loginOldUser($scope.old_user);
	}
})