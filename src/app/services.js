var MileageSvcModule = angular.module('Mileageservices', ['ngResource']);



function MileageMapService($rootScope, $timeout, $window) {

	var start = function()
	{
		//start logging data
		rds.Mileage.started = true;
		
	}
	
	var stop = function()
	{
		rds.Mileage.started = true;
		
	}
	
	var save = function()
	{
		
	}
	

return {
	start : start,
	stop : stop,
	save : save
}

};

MileageSvcModule.factory('MapSvc', ['$rootScope', '$timeout', '$window',
function($rootScope, $timeout, $window) {

	return new MileageMapService($rootScope, $timeout, $window);
}]);
