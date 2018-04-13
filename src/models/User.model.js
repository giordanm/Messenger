let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UserSchema = new Schema({
	user: String,
	message: String
});


module.exports= mongoose.model('User', UserSchema);