let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String
});


module.exports= mongoose.model('User', UserSchema);