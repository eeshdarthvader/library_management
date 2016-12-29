var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	user:Object,
	book:Object,
	transaction_status:String,
	duedate:{type:Date, default:Date.now},
	createdOn : {type:Date, default:Date.now}
	
});

module.exports = mongoose.model('Transaction',TransactionSchema);

