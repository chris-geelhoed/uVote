var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    creatorUserId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    choiceIds: {
        type: Array,
        required: true
    }
});

var Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;