class UserController {

    constructor() {

        // Schema from model
        this.UserTable = User.userModel;
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
        this.UserTable.find({}).then(eachOne => {
            res.json(eachOne);
        });
    }

    /**
     * Create a new user
     * @return json
     */
    create(req, res) {
        this.UserTable.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }).then(user => {
            res.json(user);
        });
    }

    /**
     * Get all currently logged in users
     * @return json
     */
    getAllLoggedUsers(req, res) {

        const users = Object.entries(WebSockets);
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
        if (req.body.email && req.body.password) {
            User.authenticate(req.body.email, req.body.password, function(error, user) {
                if (error || !user) {
                    // Wrong credentials
                    let err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {

                    // Successful login
                    req.session.userId = user._id;
                    res.json('logged with user id: ' + req.session.userId);

                    const ws = new WebSocket('ws://' + config.db.host + ':' + config.websocket.port);

                    // event emmited when connected
                    ws.onopen = function() {
                        // sending a send event to websocket server
                        ws.send('User with id: ' + user._id + ' connected');

                        WebSockets[user._id] = ws;
                        WebSockets[user._id]['user'] = user;
                    }

                    // event emmited when receiving message
                    ws.on('message', function() {
                        console.log(message);
                    });

                    // event emmited when websocket is closed - on logout
                    ws.on('close', function(userId) {
                        console.log(req.session.userId);
                        delete ws[req.session.userId];
                        delete WebSockets[req.session.userId];

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
            return next(err);
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
                WebSockets[req.session.userId].terminate();
            } catch (e) {
                return res.redirect('/');
            }
        }
    }

}

module.exports = new UserController();