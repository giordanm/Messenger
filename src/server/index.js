'use strict';

let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    _ = require('underscore');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';


let User = require('../models/User.model');

// let db = 'mongodb://localhost:32768';
let db = 'mongodb://heroku_bfczx3k5:1l9rfk8qqn392dav03hj9vgh9@ds037175.mlab.com:37175/heroku_bfczx3k5';

mongoose.connect(db);


/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
if (env !== 'test') app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Import our routes
require('./routes')(app);

// Build up the server-side data structures
app.messages = [
    {
        from: 'joe',
        msg: 'hey.'
    }
];

app.users = [
    {
        username: 'ben',
        password: 'pass',
        first_name: 'Ben',
        last_name: 'Black',
    },
    {
        username: 'joe',
        password: 'pass',
        first_name: 'Joe',
        last_name: 'Shmo',
    }
];

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Server listening on ' + server.address().port);
});
