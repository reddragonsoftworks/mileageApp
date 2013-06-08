'use strict';


// Declare app level module which depends on filters, and services
var appModule = angular.module('Mileage', ['Mileageservices']);

appModule.run(function($rootScope,MapSvc){

		/*
		 * initialize our application state holding object 
		 */
		 
		$rootScope._952State = { version:'0.0.0-b', online:'dunno'};
});
