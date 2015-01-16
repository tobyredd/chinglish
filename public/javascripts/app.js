var chinglish = angular.module('chinglish', ['ngRoute']);

chinglish.config(function($routeProvider){
	$routeProvider.when('/',
	{
		templateUrl: 'javascripts/partials/dashboard.ejs'
	})
	.when('/login',
	{
		templateUrl: 'javascripts/partials/login.ejs'
	})
	.when('/game',
	{
		templateUrl: 'javascripts/partials/game.ejs'
	})
})