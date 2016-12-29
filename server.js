var express = require('express');

var app = express();


var path =require('path');


var swig = require('swig');

app.engine('html',swig.renderFile);

app.set('views',path.join(__dirname,'src/views'));

app.set('view engine','html');



var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




var mongoose = require('mongoose');


var booksCtrl = require('./controllers/books.server.controller');


var userCtrl = require('./controllers/user.server.controller');


var transactionCtrl = require('./controllers/transactions.server.controller');

//connect to mongoose
mongoose.connect('mongodb://eesh:testing@ds145848.mlab.com:45848/library');

port = 5000;

app.listen(port, function(err){
	
	console.log("server running at:"+ port );
	
})


app.use(express.static('public'));

app.use(express.static('src/views'));

app.get('/', function(request, response){
	
	response.send('Hello');
	
});






//api routes
app.post('/newbook', function(req,res){
	
		
	return booksCtrl.createbook(req,res);
})


app.get('/bookslist', function(req,res){
	
	return booksCtrl.getbooks(req,res);
})


app.post('/removebook',function(req,res){
	
	return booksCtrl.removebook(req,res);
	
})


app.get('/getusers', function(req,res){
	
	return userCtrl.getUsers(req,res);
})


app.post('/newuser', function(req,res){
	
	return userCtrl.createUser(req,res);
})



app.get('/gettransaction', function(req,res){
	
	return transactionCtrl.getTransaction(req,res);
})

app.post('/createtransaction', function(req,res){
	
	return transactionCtrl.createTransaction(req,res);
})




app.post('/deletetransaction', function(req,res){
	
	return transactionCtrl.deleteTransaction(req,res);
})


