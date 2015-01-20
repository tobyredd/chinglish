chinglish.factory('userFactory', ['$http', function($http){
	console.log('in the user factory!!!');
	var register_users = [];
	var users = [];
	var factory = {};
	factory.getUsers = function(){
		console.log('in the get users function in users factory');
		return users;
	}
	factory.addNewUser = function(info){
		console.log('in the add user function in users factory');
		console.log('info: ', info);
		var time = Date();
		var date = time.substring(0, 15);
		info.created_at = date;
		console.log('date', info.created_at);
		// register_users.push({
		// 	name: info.name,
		// 	email: info.email,
		// 	password: info.password,
		// 	created_at: date
		// })
		console.log('registered users: ', register_users);
		$http.post('/users/create_json', info).success(function(){
			console.log('successful registration!');
		})
	}
	// factory.loginOldUser = function(info){
	// 	console.log('in the login function of users factory');
	// 	console.log('login info: ', info);
	// 	// users.push({
	// 	// 	name: info.name
	// 	// })
	// 	// console.log('logged in users: ', users);
	// 	// $http.post('/users/login', info).success(function(){
	// 	// 	console.log('logging user in!!');
	// 	// })

	// }
	return factory;
}])