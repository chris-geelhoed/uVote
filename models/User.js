var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    ip: {
        type: String,
        required: true
    },
    choiceIds: {
        type: Array,
        required: false
    },
    createdPollIds: {
        type: Array,
        required: false
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;