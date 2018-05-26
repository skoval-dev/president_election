const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electorateSchema = new Schema({
    unique_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    voted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Electorate = mongoose.model('Electorate', electorateSchema);

module.exports = {
    Electorate
};