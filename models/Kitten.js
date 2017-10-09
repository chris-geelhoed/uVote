var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittenSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

var Kitten = mongoose.model('Kitten', kittenSchema);
module.exports = Kitten;