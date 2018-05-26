const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        minlength: [6, 'Text should contains at least 6 characters'],
        trim: true
    },
    birth_day: {
        type: Date,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    votes_count: {
        type: Number,
        required: true
    },
    _election: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = {
    Candidate
};