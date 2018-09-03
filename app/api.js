const glob = require('glob');
const path = require('path');

/**
 * Including models globally
 */
User = require('./models/User.js');
Country = require('./models/Country.js');

/**
 * Routes for controllers
 */
const routes = require('./config/routes.js');