var rds = rds || {};

( function(rdsBase) {

		/* RDS Mileage Functions Base Platform */
	rdsBase.Mileage = {};
	
	rdsBase.Mileage.testPoints = [{lat:53.319569,lon:-4.240444},
	                              {lat:53.319813,lon:-4.239607},
	                              {lat:53.320210,lon:-4.238276},
	                              {lat:53.320813,lon:-4.237139},
	                              {lat:53.321210,lon:-4.236131},
	                              {lat:53.321312,lon:-4.234972},
	                              {lat:53.321505,lon:-4.233749},
	                              {lat:53.321799,lon:-4.232590},
	                              {lat:53.322222,lon:-4.230616},
	                              {lat:53.322094,lon:-4.228899},
	                              {lat:53.321889,lon:-4.227870}]
	
	rdsBase.Mileage.distance = 0;
	
	rdsBase.Mileage.lastPoint = [{lat:null,lon:null}]
	
	rdsBase.Mileage.started = false;
	rdsBase.Mileage.cycles = 0;
	rdsBase.Mileage.count = 0;
	
	rdsBase.Mileage.calcDistance = function(lat1,lon1,lat2,lon2){
		var R = 6371; // km
		var dLat = (lat2-lat1).toRad();
		var dLon = (lon2-lon1).toRad();
		var lat1 = lat1.toRad();
		var lat2 = lat2.toRad();
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		
		return d * 0.62137;
	}
	
	
	rdsBase.Mileage.disLog = function()
	{
		
		if(rdsBase.Mileage.started)
		{
			if(rdsBase.Mileage.cycles > 5) // allow for calibration cycles
			{
				if(rdsBase.Mileage.lastPoint[0].lat == null)
				{
					
					 navigator.geolocation.getCurrentPosition(function(position){
					 	rdsBase.Mileage.lastPoint[0] = {lat:position.coords.latitude,lon:position.coords.longitude}
					 	count = 1;
					 },{ enableHighAccuracy: true });
				}
				else
				{
					 navigator.geolocation.getCurrentPosition(function(position){
					 	
					 	
					 		var lon1 =  position.coords.longitude;				 	
					 		var lon2 = rdsBase.Mileage.lastPoint[rdsBase.Mileage.lastPoint.length].lon;
					 		var lat1 = position.coords.latitude;
						 	var lat2 = rdsBase.Mileage.lastPoint[rdsBase.Mileage.lastPoint.length].lat;
					 	
					 	
					
						
						rdsBase.Mileage.distance += rdsBase.Mileage.calcDistance(lat1,lon1,lat2,lon2); // now in miles
					 	
					 	rdsBase.Mileage.lastPoint[count] = {lat:position.coords.latitude,lon:position.coords.longitude};
					 		count++;
					 },{ enableHighAccuracy: true });
				}
			}
			else
			{
				 navigator.geolocation.getCurrentPosition(function(position){
					 rdsBase.Mileage.cycles++;	//calibration phase
				 });
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
	



