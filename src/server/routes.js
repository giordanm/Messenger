'use strict';

let _ = require('underscore');

module.exports = app => {
    // Handle POST to create a logged in session
    app.post('/session', (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'Username and password required.' });
        } else {
            let user = _.findWhere(app.users, {
                username: req.body.username.toLowerCase()
            });
            if (!user || user.password !== req.body.password) {
                if (user)
                    console.log(`Wrong password.`);
                else
                    console.log('User not found.');
                res.status(401).send({ error: 'Not authorized.' });
            } else {
                res.status(201).send({
                    username: user.username
                });
                //for now this is how we are implementing a user being logged in
                localStorage.setItem("username", req.body.username);
            }
        }
    });

    // Handle POST to register a user
    app.post('/user', (req, res) => {
        let data = req.body;
        if (
            !data ||
            !data.username ||
            !data.password ||
            !data.first_name ||
            !data.last_name
        ) {
            res
                .status(400)
                .send({
                    error:
                        'username, password, first_name, last_name required'
                });
        } else {
            let user = _.findWhere(app.users, {
                username: data.username.toLowerCase()
            });
            if (user) {
                res.status(400).send({ error: 'username already in use' });
            } else {
                let newUser = _.pick(
                    data,
                    'username',
                    'first_name',
                    'last_name',
                    'password'
                );
                app.users.push(newUser);
                res.status(201).send({
                    username: data.username
                });
            }
        }
    });


    // Handle POST to send a new message
    app.post('/create', (req, res) => {
        let data = req.body;
        if (!data) {
            res.status(400).send({ error: 'No text!' });
        } else {
            //create new message and push it to list of messages
            // app.transactions.push(newTransaction);

            // res.status(201).send({
            //     hash: newTransaction.hash.substring(0, 8)
            // });
            console.log("we have yet to implement creating new message.");
        }
    });

    //Handle get to display list of message
    //app.get('/messages'
};
