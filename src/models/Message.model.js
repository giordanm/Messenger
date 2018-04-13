let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let MessageSchema = new Schema({
	from: String,
	msg: String
});


module.exports= mongoose.model('Message', MessageSchema);