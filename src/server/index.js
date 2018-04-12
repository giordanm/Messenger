'use strict';

let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    _ = require('underscore');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

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
