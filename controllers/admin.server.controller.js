var Transaction = require('../models/transactions.server.model.js');

var Books = require('../models/books.server.model.js');

var Users = require('../models/user.server.model.js');


var Admin  =  require('../models/admin.server.model.js'); 



exports.findUserByUsername = function(username,cb){
	
	
	process.nextTick(function() {
		var query = Admin.find({'username':username});
	
		query.exec(function(err, results){
	
					return cb(null, results[0]);
			
		})
		
	})
}



exports.findById = function(id, cb)
{
	
	process.nextTick(function() {
	var query = Admin.find({'id':id});
	
		query.exec(function(err, results){
	
					return cb(null, results);
			
		})
	
	})
}


exports.createAdmin = function(req,res){
	
	var entry = new Admin({
		
		name:req.body.name,
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		contactnumber:req.body.contactnumber
		
		
	});
	
	entry.save();
	
	
	res.status(200).send({ status: 'Admin created' })
	
	//res.json({data:result});

	
	
}