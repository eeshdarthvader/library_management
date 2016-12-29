var Transaction = require('../models/transactions.server.model.js');

var Books = require('../models/books.server.model.js');

exports.getTransaction = function(req,res){
	
	
		var query = Transaction.find();
	
		query.sort({createdOn: 'desc'}).exec(function(err, results){
	
					res.json({ data: results });
			
		})

	

	
}



exports.deleteTransaction = function(req,res){
	
				var query = {'_id':req.body.id};
			
			
				Transaction.find(query).remove(function(err){
		
			
			
					res.status(200).send({ status: 'transaction removed' })
		
				})

			

	
}



exports.createTransaction = function(req,res){
	
	
		var entry = new Transaction({
		
			user:req.body.user,
			book:req.body.book,
			transaction_status:req.body.transaction_status,
			duedate:req.body.duedate
			
			
		});
		
		
		if(req.body.transaction_status == 'borrow')
		{
			//change the status to unavailble in books table
			
			
			var query = {'name':req.body.book.name};
			
			
			
				Books.findOneAndUpdate(query, {current_status:'unavailable'}, {upsert:false}, function(err, doc){
				    if (err) return res.send(500, { error: err });
				    
				});
				
				var query = Books.find();
	
				query.sort({createdOn: 'desc'}).exec(function(err, results){
			
							res.json({ data: results });
					
				})

		}
		
		
		if(req.body.transaction_status == 'return')
		{
			//change the status to unavailble in books table
			
			
				var query = {'name':req.body.book.name};
				
				
				
			
			
			
				Books.findOneAndUpdate(query, {current_status:'available'}, {upsert:false}, function(err, doc){
				    if (err) return res.send(500, { error: err });
				    
				});
				
				var query = Books.find();
	
				query.sort({createdOn: 'desc'}).exec(function(err, results){
			
							res.json({ data: results });
					
				})

		}

		
		entry.save();
	
	

		var result = [{
		
			user:req.body.user,
			book:req.body.book,
			transaction_status:req.body.transaction_status,
			duedate:req.body.duedate,
			createdOn:Date.now 
			
			
		}];
		
		
		
		

	
}
