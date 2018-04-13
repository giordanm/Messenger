'use strict';

let _ = require('underscore');
let User = require('../models/User.model');

module.exports = app => {
    app.get("/users", (req, res) =>{
        let newuser =  new User({user: "ben", message: 'hi'});
        newuser.save();
        User.find({}).exec ((err, elems) => {
            if (err) {
                res.send('error');
            } else {
                res.json(elems);
            }
        });
    });
    // Handle POST to create a user session (i.e. log on)
    app.post('/session', (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'please include username and password' });
        } else {
            let user = _.findWhere(app.users, {
                username: req.body.username.toLowerCase()
            });
            if (!user || user.password !== req.body.password) {
                res.status(401).send({ error: 'unauthorized' });
            } else {
                res.status(201).send({
                    username: user.username
                });
            }
        }
    });

    // Handle POST to create a new transaction
    app.post('/create', (req, res) => {
        let data = req.body;
        console.log("data:");
        console.log(data);
        if (!data || !data.msg || !data.from) {
            res.status(400).send({ error: 'please include a from user and a message' });
        } else if (
            !_.findWhere(app.users, { username: data.from })
        ) {
            res.status(404).send({ error: 'from user not found' });
        } else {
            //add new message to list of messages in server. the index will help us maintain order
            let prevMsg = app.messages[app.messages.length - 1];
            let newMsg = {
                index: prevMsg.index + 1,
                from: data.from,
                msg: data.msg
            };
            app.messages.push(newMsg);
            //send back this message
            res.status(201).send({
                from: data.from,
                msg: data.msg
            });
        }
    });
};
