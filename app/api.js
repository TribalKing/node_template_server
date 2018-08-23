glob = require('glob'), path = require('path');

/**
 * Routes for controllers
 */
routes = require('./config/routes.js');

/**
 * Require all controllers from controllers folder
 */
glob.sync( './controllers/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
});
