const User = require('../models/User.js');

/**
 * Test if api is working
 * @return string
 */
app.get('/', function (req, res) {
    res.json('Success! API is working!');
});

/**
 * Get all users
 * @return json
 */
app.get(Routes.User.users, function (req, res) {
    User.find({}).then(eachOne => {
    	ws.send('socket users');
        res.json(eachOne);
    })
});

/**
 * Create new user
 * @return json
 */
app.post(Routes.User.users, function (req, res) {
    User.create({
        username: req.body.username,
        email: req.body.email,        
        password: req.body.password,
        passwordConf: req.body.passwordConf
    }).then(user => {
        res.json(user);
    });
});

/**
 * Login user
 */
app.post(Routes.User.login, function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        // Wrong credentials
        let err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        // Successful login
        req.session.userId = user._id;
        res.json('logged with user id: ' + req.session.userId);
      }
    });
  } else {
    // Missing email or password
    let err = new Error('Email and password are required.');
    err.status = 401;
    let err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

/**
 * Logout user
 * @return json
 */
app.get(Routes.User.logout, function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
