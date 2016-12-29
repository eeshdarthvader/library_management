var Books = require('../models/books.server.model.js');


exports.createbook = function(req,res){
	
	
	var entry = new Books({
		
		name:req.body.name,
		author:req.body.author,
		current_status:req.body.current_status
		
		
	});
	
	entry.save();
	
	
	
	var result = [{name:req.body.name,author:req.body.author,current_status:req.body.current_status,createdOn:Date.now }];
	
	res.json({data:result});
	
	

	
	
}


	exports.getbooks = function(req,res){
	
	
		var query = Books.find();
	
		query.sort({createdOn: 'desc'}).exec(function(err, results){
	
					res.json({ data: results });
			
		})

	

	
	}
	
	
	exports.removebook = function(req,res){
	
	
	
		Books.find({name:req.body.name}).remove(function(err){
		
			
			
			res.status(200).send({ status: 'book removed' })
		
		})
	
	
	
	
	

	
	
}
	
	