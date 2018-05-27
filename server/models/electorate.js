const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electorateSchema = new Schema({
    voted: {
        type: Boolean,
        required: true,
        default: false
    },
    _election: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

electorateSchema.statics.create_electorates = function(count, election_id){
    const electorate = this;
    let arr_electorate = [];
    for(var i = 0; i < count; i++){
        arr_electorate.push({_election: election_id});
    }
    return electorate.insertMany(arr_electorate);
};

electorateSchema.statics.made_vote = function(id){
    const electorate = this;
    return electorate.findOneAndUpdate({_id: id}, {$set: {"voted": true}}, {new: true});
};

const Electorate = mongoose.model('Electorate', electorateSchema);

module.exports = {
    Electorate
};