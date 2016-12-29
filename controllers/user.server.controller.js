var User = require('../models/user.server.model.js');

exports.getUsers = function(req,res){
	
	
		var query = User.find();
	
		query.sort().exec(function(err, result){
	
			res.json({ usersdata:result });
			
		})

	
}



exports.createUser = function(req,res){
	
	
	var entry = new User({
		
		
		username:req.body.username,
		name:req.body.name,
		email:req.body.email,
		contactnumber:req.body.contactnumber
		
		
	});
	
	entry.save();
	
	
	
	var result = [{
		
		
		username:req.body.username,
		name:req.body.name,
		email:req.body.email,
		contactnumber:req.body.contactnumber
		
		
	}];
	
	res.json({usersdata:result});
	
	

	
	
}