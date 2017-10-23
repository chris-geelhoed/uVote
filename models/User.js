var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    ip: {
        type: String,
        required: true
    },
    votes: {
        type: Array
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;