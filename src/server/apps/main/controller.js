'use strict';
var express= require('express'),
	getBooks = require('./model').getBooks,
	saveBooks = require('./model').saveBooks,
    router = express.Router();



	router.route('/books')
	 	.get(function(req,res){
	 		console.log('query');
			getBooks(function(error,data){
				res.send(data);
			});
	 	});

	router.route('/guardar')
	 	.post(function(req,res){
			saveBooks(req.body,function(error,data){
				res.send(data);
			});
	 	});

module.exports = router;


