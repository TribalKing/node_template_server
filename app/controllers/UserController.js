/**
 * User Controller 
 *
 * Contains all API calls for users
 * 
 */
const User = require('../models/User');

class UserController extends User {

    constructor() {
        super();

        this.WebSocket = require('ws');
        this.config = require('../config/Config');

        /**
         * All WebSockets in one object, with all current users.
         */
        this.WebSockets = {};
    }

    /**
     * Test API
     * @return json
     */
    test(req, res) {
        res.json('Success! API is working!');

    }

    /**
     * Get all users
     * @return json
     */
    getAll(req, res) {
        this.userModel.find({}).then(eachOne => {
            res.json(eachOne);
        });
    }

    /**
     * Create a new user
     * @return json
     */
    create(req, res) {
        this.userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }).then(user => {
            res.json(user);
        }).catch(function(e) {
            console.log(e);
            res.json(e);
        });
    }

    /**
     * Get all currently logged in users
     * @return json
     */
    getAllLoggedUsers(req, res) {

        const users = Object.entries(this.WebSockets);
        const currentUsers = [];
        users.map((value, key, a) =>
            currentUsers.push(value[1].user)
        );

        res.json(currentUsers);

    }

    /**
     * Login user
     * @return json
     */
    loginUser(req, res) {
        const self = this;
        if (req.body.email && req.body.password) {
            this.authenticate(req.body.email, req.body.password, function(error, user) {
                if (error || !user) {
                    // Wrong credentials
                    let err = new Error('Wrong email or password.');
                    err.status = 401;
                    res.json(err);
                } else {

                    // Successful login
                    req.session.userId = user._id;
                    res.json('logged with user id: ' + req.session.userId);

                    const ws = new self.WebSocket('ws://' + self.config.db.host + ':' + self.config.websocket.port);

                    // event emmited when connected
                    ws.onopen = function() {
                        // sending a send event to websocket server
                        ws.send('User with id: ' + user._id + ' connected');

                        // saving websocket in WebSockets object, inserting into
                        // the object with user id as a key
                        self.WebSockets[user._id] = ws;

                        // inserting whole user info in WebSockets object
                        self.WebSockets[user._id]['user'] = user;
                    }

                    // event emmited when receiving message
                    ws.on('message', function() {
                        console.log(message);
                    });

                    // event emmited when websocket is closed - on logout
                    ws.on('close', function(userId) {
                        delete ws[req.session.userId];
                        delete self.WebSockets[req.session.userId];

                        // delete session object
                        req.session.destroy();

                    });
                }
            });

        } else {
            // Missing email or password
            let err = new Error('Email and password are required.');
            err.status = 401;
            err = new Error('All fields required.');
            err.status = 400;

            res.json(err);


        }
    }

    /**
     * Logout user
     * @return json
     */
    logoutUser(req, res) {

        if (req.session) {
            // destroy websocket for this specific user
            try {
                this.WebSockets[req.session.userId].terminate();
                console.log('User logged out.');
                res.json('User logged out.');
            } catch (e) {
                res.json('User not logged in.');
            }
        }
    }

}

module.exports = new UserController();