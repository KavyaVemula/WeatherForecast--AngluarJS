//Defining Module
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);

//Setting up Routes
weatherApp.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
    
    .when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
});

//Defining Custom Service
weatherApp.service('cityService', function() {
    this.city = 'London';

})


//Controllers
weatherApp.controller('homeController',['$scope','cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams,  cityService) {
    
    $scope.city = cityService.city;
    
    //initializing days value from url and giving a default value of 2
    $scope.days = $routeParams.days || '2';
    
    //callback and get methods are used so browser doesn't complain about //getting data from internet
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/?APPID=8c37a649d69414a7768bf0914762c20c", {callback: "JSON_CALLBACK"}, {get: { method: "JSONP" }});
    
    //get method takes 2 objects as parameters
    // one for the city and the other for no. of days
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});
    
    //Function to convert Kelvin -> Fahrenheit
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    
    //Converting the default date into date format
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
    };
    
    console.log($scope.weatherResult);

}]);