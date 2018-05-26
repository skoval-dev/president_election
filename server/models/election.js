const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electionSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Text should contains at least 6 characters'],
        trim: true
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    state: { 
        type: String,
        enum : [ 'open', 'closed', 'finished' ],
        required: true,
        lowercase: true
    },
    electorate_count: {
        type: Number,
        minlength: 1,
        required: true
    },
    tour:{
        type: Number,
        required: true,
        default: 1
    }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = {
    Election
};