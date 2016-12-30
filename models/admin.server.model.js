var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
	name:String,
	username:String,
	password:String,
	email:String,
	contactnumber:String
	
});

module.exports = mongoose.model('Admin',AdminSchema);

