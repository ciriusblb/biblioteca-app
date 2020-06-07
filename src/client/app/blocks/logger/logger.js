(function(){
	'use strict';
	angular
		.module('blocks.logger')
		.factory('logger',logger);

		logger.$inject=['$log','toastr'];

		function logger($log,toastr){//$log servicio de angular
			var service={
				showToasts:true,

				error:error,
				info:info,
				success:success,
				warning:warning,
				
				log:$log.log//directo a la consola 
			};

			return service;
			function error(message, data, title){
	            toastr.error(message, title);
	            $log.error('Error : ' + message, data);
	        }
	        ///metodo para loggear informacion
	        function info(message, data, title){
	            toastr.info(message,title);
	            $log.info('Info : ' + message, data);
	        }

	        function success(message, data, title){
	            toastr.success(message,title);
	            $log.info('Success : ' + message, data);
	        }

	        function warning(message, data, title){
	            toastr.warning(message,title);
	            $log.warn('Warning : ' + message, data);
	        }
		}

}());