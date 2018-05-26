require('./config/config');

const _              = require('lodash');
const       express  = require('express');
const   body_parser  = require('body-parser');

const          {db}  = require('./db/mongoose');
const    {ObjectID}  = require('mongodb');

const           app  = express();
const          port  = process.env.PORT;

app.use(body_parser.json());



app.listen(port, () => {
    console.log(`Server is up, and listening on port: ${port}`);
 });
 
 module.exports = {app};
 