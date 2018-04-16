'use strict';

let _ = require('underscore');
let User = require('../models/User.model');
let Message = require('../models/Message.model');

module.exports = app => {
    app.get("/messages", (req, res) =>{
        Message.find({}).exec ((err, elems) => {
            if (err) {
                res.send('error');
            } else {
                res.json(elems);
            }
        });
    });

    app.post("/register", (req, res) =>{
        console.log(req.body);
        if (!req.body || !req.body.username || !req.body.password || !req.body.first_name || !req.body.last_name) {
            console.log('not all filled');
            res.status(400).send({error: 'please include all fields'});
        }
        else {
            //check if username already exists in database
            User.findOne({username: req.body.username}, function (err, userInfo) {
                if (err) {
                    res.status(500).end(); //right error code?
                }
                else if (userInfo) {
                    console.log("User already exists.");
                    res.status(409).send({error: `User already exists`});
                }
                else {
                    console.log("User doesn't exist yet. GOOD");
                    console.log(req.body.username);
                    //add user to database
                    let newUser = {
                        username: req.body.username,
                        password: req.body.password,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name
                    };
                    let newuser =  new User(newUser);
                    newuser.save();
                    res.status(201).send(req.body.username).end();
                }
            })
        }
    });


    // Handle POST to create a user session (i.e. log on)
    app.post('/session', (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'please include username and password' });
        } else {
            // let user = _.findWhere(app.users, {
            //     username: req.body.username.toLowerCase()
            // });
            // console.log(req.body);

            // User.find({}).exec ((err, elems) => {
            //     if (err) {
            //         res.send('error');
            //     } else {
            //         console.log(elems);
            //         // res.json(elems);
            //     }
            // });

            User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
                console.log(user);
                if (!user || user.password !== req.body.password) {
                    res.status(401).send({ error: 'unauthorized' });
                } else {
                    res.status(201).send({
                        username: user.username
                    });
                }
              });

        }
    });

    // Handle POST to create a new transaction
    app.post('/create', (req, res) => {
        let data = req.body;
        console.log("data:");
        console.log(data);
        if (!data || !data.msg) {
            res.status(400).send({ error: 'please include a message' });
        } else {
            //add new message to list of messages in server. the index will help us maintain order
            let prevMsg = app.messages[app.messages.length - 1];
            let newMsg = {
                index: prevMsg.index + 1,
                from: data.username,
                msg: data.msg
            };
            let newmessage =  new Message(newMsg);
            newmessage.save();
            app.messages.push(newMsg);
            //send back this message
            res.status(201).send({
                from: data.username,
                msg: data.msg
            });
        }
    });
};
