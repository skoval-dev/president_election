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


app.listen(port, () => {
    console.log(`Server is up, and listening on port: ${port}`);
 });
 
 module.exports = {app};
 