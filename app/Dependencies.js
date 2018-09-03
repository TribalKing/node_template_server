/**
 * BodyParser - For parsing of JSON from requests
 */
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

/**
 * Bcrypt - For hashing a password
 */
bcrypt = require('bcrypt');

/**
 * Session - For tracking logins
 */
const session = require('express-session');

app.use(session({
    secret: 'there is no spoon',
    resave: true,
    saveUninitialized: false
}));