'use strict';

let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    _ = require('underscore');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup Express pipeline
let app = express();
if (env !== 'test') app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Import  routes
require('./routes')(app);

// Some preset server-side data structures
app.users = [
    {
        username: 'jdoe',
        password: 'passWORD1!',
        first_name: 'John',
        last_name: 'Doe',
        city: 'Dallas',
        primary_email: 'alpha@beta.com',
    },
    {
        username: 'runaway',
        password: 'Fun420!',
        first_name: 'Arnold',
        last_name: 'Schwarzenegger',
        city: 'Bikini Bottom',
        primary_email: 'omega@gamma.com',
    }
];

/**********************************************************************************************************/

// Run server
let server = app.listen(port, () => {
    console.log('Server listening on... ' + server.address().port);
});