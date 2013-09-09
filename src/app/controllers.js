function TrackingController($scope,MapSvc)
{

	$scope.goTo = function(e)
	{
		jQT.goTo(e,'slideLeft');
	}		
	
	$scope.started = function()
	{
		return rds.Mileage.started;
	}
	
	$scope.changeState = function()
	{
		rds.Mileage.started = !rds.Mileage.started;
		$scope.started();
		if(!rds.Mileage.started)
		{
			alert(rds.Mileage.distance)
		}
		
	}
		
}

