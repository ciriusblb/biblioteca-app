(function(){
	'use strict';
	angular.module('app.historial')
		.run(appRun);

	appRun.$inject=['routehelper'];	
	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return[
			{
				name:'historial',
				config:{
					url:'/historial',
					templateUrl:'app/historial/historial.html',
					controller:'Historial',
					controllerAs:'vm',
					title:'Historial',
					settings:{
						nav: 3,
						content:'<i class="glyphicon glyphicon-plus"></i> Historial'
					}
				}
			}
		]
	}
}());