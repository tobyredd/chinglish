chinglish.factory('userFactory', ['$http', function($http){
	var register_users = [];
	var users = [];
	var factory = {};
	factory.getUsers = function(){
		return users;
	}
	factory.addNewUser = function(info){
		var time = Date();
		var date = time.substring(0, 15);
		info.created_at = date;
		$http.post('/users/create_json', info).success(function(){
			console.log('successful registration!');
		})
	}
	return factory;
}])