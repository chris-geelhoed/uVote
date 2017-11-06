var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choiceSchema = new Schema({
    choice: {
        type: String,
        required: true
    },
    voterIps: {
        type: Array,
        required: false
    }
});

var Choice = mongoose.model('Choice', choiceSchema);
module.exports = Choice;