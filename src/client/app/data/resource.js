(function(){
	"use strict";
	angular.module('app.data')
	  	.factory('dataservice',dataservice);
	  
	function dataservice($resource)
	{
		return $resource('/books/:id',{idBricks:'@id'}, { 
			'get':    {method:'GET'},
			'query': { method: 'GET',isArray:true},
            'update': { method: 'PUT'},
	        'save': { method: 'POST',url:'/guardar'},
	        'remove': { method:'DELETE'}
		});
	};

}());
