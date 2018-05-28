require('./config/config');

const _              = require('lodash');
const       express  = require('express');
const   body_parser  = require('body-parser');
const         morgan = require('morgan');
const          {db}  = require('./db/mongoose');
const    {ObjectID}  = require('mongodb');
const   {Candidate}  = require('./models/candidate');
const    {Election}  = require('./models/election');
const  {Electorate}  = require('./models/electorate');
const        {User}  = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const {electorate_auth} = require('./middleware/electorate_auth');

const           app  = express();
const          port  = process.env.PORT;

app.use(body_parser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Accept-Encoding", "gzip, deflate, br");
    res.header("Accept", "*");
    next();
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'password_again']);
    
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable to process`, success: false});
    }
    if(body.password !== body["password_again"]){
        return res.status(403).send({message: `Password doesn't match`, success: false});
    }
    let user = new User(body);
    user.save().then(() => {
        return user.generate_auth_token();
    }).then((token) => {
        res.header('x-auth', token).status(200).send({user, token});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send({user: req.user, success: true});
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable to process`, success: false});
    }
    User.find_by_credentials(body.email, body.password).then((user) => {
        user.generate_auth_token().then((token) => {
            user.token = token;
            res.header('x-auth', token).status(200).send({user, token, success: true});
        });

    }).catch((err) => {
        res.status(401).send(err);
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
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable to process`, success: false});
    }
    if(body['end_date'] <= body['start_date']){
        res.status(400).send({'message': 'The end date should be more than start date', success: false});
    } else {
        const election = new Election(body);
        election.save().then((doc) => {
            Electorate.create_electorates(doc.electorate_count, doc._id).then((electorates) => {
                res.status(200).send({doc, success: true});
            });
        }).catch((err) => {
            res.status(400).send({message:err.message, success: false});
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
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable for updates`, success: false});
    }
    Election.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((election) => {
        if(!election){
            return res.status(404).send({message: `There is not found election by id <${id}>`, success: false});
        }
        res.status(200).send({election, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.get('/electorate/login/:id', (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Electorate.findOne({_id: id}).then((electorate) => {
        if(!electorate){
           return res.status(401).send({message:"You don't have access to current election", success: false});
        }
        res.header('x-elec-id', id).status(200).send(electorate);
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.post('/candidate', authenticate, (req, res) => {
    let body = _.pick(req.body, ['full_name', 'birth_day', 'intro', '_election']);
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable to process`, success: false});
    }
    const candidate = new Candidate(body);
    candidate.save().then((doc) => {
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });

});

app.get('/candidate', (req, res) => {
	Candidate.find().sort('full_name').select('full_name birth_day intro _election votes_count').then((candidate) => {
		if(candidate.length === 0){
			throw new Error('There is not available candidate');
        }
        
		res.status(200).send({candidate, success: true});
	}).catch((err) => {
		res.status(400).send({success: false, message: err.message});
	});
});

app.get('/candidate/id/:id', (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Candidate.findOne({_id: id}).select('full_name birth_day intro _election').then((candidate) => {
        if(!candidate){
            return res.status(404).send({message: `There is not found candidate by id <${id}>`, success: false});
        }
       
		res.status(200).send({candidate, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.get('/candidate/election/:id', (req, res) => {
    let id = req.params && req.params.id;

    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Candidate.find({_election: id}).select('full_name birth_day intro _election').then((candidate) => {
        if(!candidate){
            return res.status(404).send({message: `There is not found candidate by election _id <${id}>`, success: false});
        }
        res.status(200).send({candidate, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.delete('/candidate/:id', authenticate, (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    Candidate.findOneAndRemove({_id: id}).select('full_name birth_day intro _election').then((candidate) => {
        if(!candidate){
            return res.status(404).send({message: `There are not found candidate by id <${id}>`, success: false});
        }
        res.status(200).send({candidate, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.patch('/candidate/:id', authenticate, (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    //Filter props from body based on provided in arr
    let body = _.pick(req.body, ['intro', 'full_name', 'birth_day']);
    if(_.isEmpty(body)){
        return res.status(403).send({message: `The fields are not suitable for updates`, success: false});
    }
    Candidate.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).select('full_name birth_day intro _election').then((candidate) => {
        if(!candidate){
            return res.status(404).send({message: `There is not found candidate by id <${id}>`, success: false});
        }
        res.status(200).send({candidate, success: true});
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.patch('/candidate/add_vote/:id', electorate_auth, (req, res) => {
    let id = req.params && req.params.id;
    if(id && !ObjectID.isValid(id)) {
        return res.status(404).send({message: `The id: <${id}> is not valid!`, success: false})
    }
    //Filter props from body based on provided in arr
    let body = _.pick(req.body, ['add_vote']);
    if(!body.add_vote && !body.add_vote === true){
        return res.status(403).send({message: `The fields are not suitable to operate`, success: false});
    }
    Candidate.findOneAndUpdate({_id: id}, {$inc: {votes_count:1}}, {new: true}).select('full_name birth_day intro _election').then((candidate) => {
        if(!candidate){
            return res.status(404).send({message: `There is not found candidate by id <${id}>`, success: false});
        }
        Electorate.made_vote(req.electorate._id).then((doc) => {
            res.status(200).send({candidate, success: true});
        });
    }).catch((err) => {
        res.status(400).send({message: err.message, success: false});
    });
});

app.get('*', function(req, res){
    res.status(404).send({message: "The route is not found", success: false});
});

app.listen(port, () => {
    console.log(`Server is up, and listening on port: ${port}`);
 });
 
 module.exports = {app};
 