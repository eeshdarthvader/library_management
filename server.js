var express = require('express');

var app = express();


var path =require('path');


var swig = require('swig');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var expressSession = require('express-session');
var cookieParser = require('cookie-parser');


var adminCtrl = require('./controllers/admin.server.controller');


passport.use(new Strategy(
  function(username, password, cb) {
	  
    adminCtrl.findUserByUsername(username, function(err, user) {
      if (err) { console.log("login err 1");  return cb(err); }
      if (!user) { console.log("login err 2"); return cb(null, false); }
      if (user.password != password) { console.log("login err 3",password," user pwd ",user); return cb(null, false); }
      console.log("login success 1");
      return cb(null, user);
    });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  adminCtrl.findUserByUsername(username, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



app.engine('html',swig.renderFile);

app.set('views',path.join(__dirname,'src/views'));

app.set('view engine','html');



var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(expressSession({secret:'123',resave: true,
    saveUninitialized: true}));

var sess;

app.get('/login',
  function(req, res){
    res.render('signin');
  });
  
  
 
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
	
	sess = req.session.passport.user;
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
	  req.session.destroy();
    req.logout();
    res.redirect('/');
});



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

 //app.use(express.static('src/views'));
 
 
/*
 app.get('/', function(request, response){
	
	console.log('session',sess);
	
	response.render('index');
	
	
});
*/


app.get('/', function(request, response){
	
	
	if(request.session.passport && request.session.passport.user) {
		
		response.render('index', {user: sess,title:'home'});
		
	} else {
		//console.log('session',request.session.passport.user);
		response.redirect("/login");
	}
	
	
	
	
});


app.get('/users', function(request, response){
	
	
	if(request.session.passport && request.session.passport.user) {
		
		console.log('session',request.session.passport.user);
	
	response.render('users', {user: sess,title:'home'});
		
	} else {
		//console.log('session',request.session.passport.user);
		response.redirect("/login");
	}
	
	
	
	
});


app.get('/admin', function(request, response){
	
	
	if(request.session.passport && request.session.passport.user) {
		
		
	
	response.render('admin', {user: sess,title:'home'});
		
	} else {
		//console.log('session',request.session.passport.user);
		response.redirect("/login");
	}
	
	
	
	
});


app.get('/transactions', function(request, response){
	
	
	if(request.session.passport && request.session.passport.user) {
		
		console.log('session',request.session.passport.user);
	
	response.render('transactions', {user: sess,title:'home'});
		
	} else {
		//console.log('session',request.session.passport.user);
		response.redirect("/login");
	}
	
	
	
	
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



app.post('/createadmin', function(req,res){
	
	return adminCtrl.createAdmin(req,res);
})


app.get('/username', function(req,res){
	
	return res.send(req.session);
})


app.get('/getadmins', function(req,res){
	
	return adminCtrl.getadmins(req,res);
})


