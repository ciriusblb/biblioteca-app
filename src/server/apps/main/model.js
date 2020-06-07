'use strict';
var mysql = require('../../config/mysql');

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'bibliotecadb',
   port: 3306
});



var dataModels ={};
dataModels.getBooks =function(callback){
    if(connection)
	{	
		var sql ='SELECT * FROM c_ejemplar';
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}

};
dataModels.saveBooks =function(data,callback){
    if(connection)
	{
		console.log(data);
		// var sql='insert into c_ejemplar(id_ejemplar,titulo,descripcion,num_ejemplares) values('+connection.escape(1)+','+connection.escape(data.titulo)+
		// ','+connection.escape(data.descripcion)+','+connection.escape(data.ejemplares)+')';
		// var sql2='insert into c_libro(edicion,ruta_portada) values('+connection.escape(data.editorial)+','+connection.escape(data.imagen)+')';
		// var sql='insert into c_autores(	id_autor,nombre) values(1,'+connection.escape(data.autor)+')';
		// var sql4='insert into c_areas(nombre_areas) values('+connection.escape(data.area)+')';
		// var sql5='insert into c_carrera(nombre) values('+connection.escape(data.carrera)+')';


		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, 'correcto');
			}
		});
	}

};




module.exports =dataModels;