require('./config/config');

const _              = require('lodash');
const       express  = require('express');
const   body_parser  = require('body-parser');

const          {db}  = require('./db/mongoose');
const    {ObjectID}  = require('mongodb');
const   {Candidate}  = require('./models/candidate');
const    {Election}  = require('./models/election');
const  {Electorate}  = require('./models/electorate');
const        {User}  = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const           app  = express();
const          port  = process.env.PORT;

app.use(body_parser.json());

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then(() => {
        return user.generate_auth_token();
    }).then((token) => {
        res.header('x-auth', token).status(200).send(user);
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.find_by_credentials(body.email, body.password).then((user) => {
        user.generate_auth_token().then((token) => {
            res.header('x-auth', token).status(200).send(user);
        });

    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete("/users/me/token", authenticate, (req, res) => {
    req.user.remove_token(req.token).then(() => {
        res.status(200).send({message: "The token was deleted", success: true})
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.post('/election', authenticate, (req, res) => {
    let body = _.pick(req.body, ['name', 'start_date', 'end_date', 'state', 'electorate_count', 'tour']);
    
    if(body['end_date'] <= body['start_date']){
        res.status(400).send({'message': 'The end date should be more than start date'});
    } else {
        const election = new Election(body);
        election.save().then((doc) => {
            Electorate.create_electorates(doc.electorate_count, doc._id).then((electorates) => {
                res.status(200).send(doc);
            });
        }).catch((err) => {
            res.status(400).send(err.message);
        });
    }

});

app.get('/election', (req, res) => {
	Election.find().sort('start_date').then((election) => {
		if(election.length === 0){
			throw new Error('There is not available election');
		}
		res.status(200).send({election, success: true});
	}).catch((err) => {
		res.status(400).send({success: false, message: err.message});
	});
});

app.get('/election/id/:id', (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Election.findOne({_id: id}).then((election) => {
        if(!election){
            return res.status(404).send({message: `There are not found election by id <${id}>`, success: false});
        }
        res.status(200).send({election, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.get('/election/state/:state', (req, res) => {
    let state = req.params && req.params.state;

    if(!state && !_.contains(state, [ 'Open', 'Closed', 'Finished' ])) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Election.find({state}).then((election) => {
        if(!election){
            return res.status(404).send({message: `There are not found election by state <${state}>`, success: false});
        }
        res.status(200).send({election, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.delete('/election/:id', authenticate, (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Election.findOneAndRemove({_id: id}).then((election) => {
        if(!election){
            return res.status(404).send({message: `There are not found election by id <${id}>`, success: false});
        }
        res.status(200).send({election, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.patch('/election/:id', authenticate, (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    //Filter props from body based on provided in arr
    let body = _.pick(req.body, ['state', 'name']);

    Election.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((election) => {
        if(!election){
            return res.status(404).send({message: `There is not found election by id <${id}>`, success: false});
        }
        res.status(200).send({election, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.get('*', function(req, res){
    res.status(404).send({message: "The route is not found"});
});

app.listen(port, () => {
    console.log(`Server is up, and listening on port: ${port}`);
 });
 
 module.exports = {app};
 