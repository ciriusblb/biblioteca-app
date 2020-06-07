(function(){
	'use strict';
	angular.module('app.historial')
		.controller('Historial',Historial);

	function Historial(logger){
		var vm=this;

		vm.mensaje='romario se la COME';
		logger.info('romario se la come');
	}
}());