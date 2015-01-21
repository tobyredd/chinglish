var chinglish = angular.module('chinglish', ['ngRoute']);

chinglish.config(function($routeProvider){
	$routeProvider.when('/',
	{
		templateUrl: 'javascripts/partials/dashboard.ejs'
	})
	.when('/chat',
	{
		templateUrl: 'javascripts/partials/chat.ejs'
	})
	.when('/game',
	{
		templateUrl: 'javascripts/partials/game.ejs'
	})
	.when('/multiplayer',
	{
		templateUrl: 'javascripts/partials/multiplayer.ejs'
	})
	.when('/multiplayer_game',
	{
		templateUrl: 'javascripts/partials/multiplayer_game.ejs'
	})
})