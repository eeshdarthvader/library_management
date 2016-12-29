var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BooksSchema = new Schema({
	name:String,
	author:String,
	current_status:String,
	createdOn:{type:Date, default:Date.now}
	
});

module.exports = mongoose.model('Books',BooksSchema);

