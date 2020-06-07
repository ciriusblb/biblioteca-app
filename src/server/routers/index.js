'use strict';
var router_main=require('../apps/main/controller');
var routers = function(app){
	app.use('/',router_main);
};

module.exports = routers;