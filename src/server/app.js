var express=require('express');
var app = express();
var morgan= require('morgan');
var bodyParser=require('body-parser');
var favicon = require('serve-favicon');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/',express.static('./src/client/'));

require('./routers/index')(app);


app.get('*',function(req,res){
	res.sendfile('./src/client/index.html');
})

app.listen(4000);
console.log("servidor escuchando en el puerto 4000");
