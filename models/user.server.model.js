var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:String,
	name:String,
	email:String,
	contactnumber:Number
	
	
});

module.exports = mongoose.model('User',UserSchema);