var rds = rds || {};

( function(rdsBase) {

		/* RDS Mileage Functions Base Platform */
	rdsBase.Mileage = {};
	
	
	
	rdsBase.Mileage.distance = 0;
	
	rdsBase.Mileage.lastPoint = [null,null]
	
	rdsBase.Mileage.started = false;
	rdsBase.Mileage.cycles = 0;
	
	
	rdsBase.Mileage.disLog = function()
	{
		
		if(rdsBase.Mileage.started)
		{
			if(rdsBase.Mileage.cycles > 5)
			{
				if(rdsBase.Mileage.lastPoint[0] == null)
				{
				//starting with points
					 navigator.geolocation.getCurrentPosition(function(position){
					 	rdsBase.Mileage.lastPoint[0] = position.coords.latitude;
					 	rdsBase.Mileage.lastPoint[1] = position.coords.longitude;
					 	
					 },{ enableHighAccuracy: true });
				}
				else
				{
					 navigator.geolocation.getCurrentPosition(function(position){
					 	
					 	if(rdsBase.Mileage.lastPoint[1] >  position.coords.longitude)
					 	{
					 		var lon1 =  position.coords.longitude;				 	
					 		var lon2 = rdsBase.Mileage.lastPoint[1];
					 	
					 	}
					 	else
					 	{
					 		var lon2 =  position.coords.longitude;	
					 		var lon1 = rdsBase.Mileage.lastPoint[1];
					 	}
					 	
					 	if(rdsBase.Mileage.lastPoint[0] > position.coords.latitude)
					 	{
						 	var lat1 = position.coords.latitude;
						 	var lat2 = rdsBase.Mileage.lastPoint[0];
					 	}
					 	else
					 	{
					 		var lat2 = position.coords.latitude;
					 		var lat1 = rdsBase.Mileage.lastPoint[0];
					 	}
					 	
					 	var R = 6371; // km
						var dLat = (lat2-lat1).toRad();
						var dLon = (lon2-lon1).toRad();
						var lat1 = lat1.toRad();
						var lat2 = lat2.toRad();
						
						var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
						        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
						var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
						var d = R * c;
						
						rdsBase.Mileage.distance += d;
					 	
					 	rdsBase.Mileage.lastPoint[0] = position.coords.latitude;
					 	rdsBase.Mileage.lastPoint[1] = position.coords.longitude;
					 		
					 },{ enableHighAccuracy: true });
				}
			}
			else
			{
				 navigator.geolocation.getCurrentPosition(function(position){
					 rdsBase.Mileage.cycles++;	
					 },{ enableHighAccuracy: true });
			}
		}
		setTimeout(function(){
			rdsBase.Mileage.disLog();
		}, 3000);
	}
	
	
	var platformDetect = function(){
	if( !!(window.runtime) )
	{
		return "air"	
	}
	else if (!! (window.cordova) ) 
	{
				return "phonegap"
 	}
	else if( true /* / AppleWebKit/.test(navigator.userAgent) */ )
	{
		
		var head = document.getElementsByTagName("head")[0];
		var style = head.appendChild(document.createElement("style"));
		style.type = "text/css"
		style.media = "screen"
		style.innerHTML = '@import "src/jqtouch/android/jqtouch.css";'
		var style2 = head.appendChild(document.createElement("style"));
		style2.type = "text/css"
		style2.media = "screen"
		style2.innerHTML = '@import "src/jqtouch/android/theme.css";'
		return "webkit"
	}
	else {
		throw "Error - rdsBase002 (unknown platform)"
	}
}	


rdsBase.Mileage.PlatformName = platformDetect()
	
		
		
	
	




	
	}(rds)); 
	



