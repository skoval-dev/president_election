const {Electorate} = require('./../models/electorate');
const  {ObjectID}  = require('mongodb');
const electorate_auth = (req, res, next) => {
    const id = req.header('x-elec-id');
    if(id && !ObjectID.isValid(id)) {
        return res.status(401).send({message: "You are not authorised!", success: false});
    }
    Electorate.findOne({_id: id, voted: false}).then((electorate) => {
        if(!electorate){
            return Promise.reject('You can not make a vote or already did it!');
        }

        req.electorate = electorate;
        req.token = id;
        next();
    }).catch((err) => {
        res.status(401).send({message: err, success: false});
    });
};

module.exports = {electorate_auth};