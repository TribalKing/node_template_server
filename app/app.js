/**
 * App is the main class, which is instantiated in Start.js
 * All packages and dependencies are called here.
 * Only thing needed is to make an instance of this class
 * and call Listen method to start the server
 */
class App {
    constructor() {
        const express = require('express');

        this.app = module.exports = express();

        this.config = require('./config/Config');

        /**
         * Dependencies - Including all dependencies needed for app
         */
		const Dependencies = this.Dependencies();

        /**
         * API - Including all controllers and models for API calls
         */
        const api = this.Api();

    }

    Listen() {
    	/**
    	 * WebSocket - Listening WebSockets (configuration info in Config.js file)
    	 */
    	const WebSocket = require('./WebSocket.js');
    	WebSocket.Server();

        this.app.listen(this.config.app.port);

    }

    Api() {
    	const glob = require('glob');
    	const path = require('path');

    	/**
    	 * Routes for controllers
    	 */
    	const routes = require('./config/Routes.js');
    }

    Dependencies() {
    	/**
    	 * BodyParser - For parsing of JSON from requests
    	 */
    	const bodyParser = require('body-parser');

    	this.app.use(bodyParser.json()); // to support JSON-encoded bodies
    	this.app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    	    extended: true
    	}));

    	/**
    	 * Session - For tracking logins
    	 */
    	const session = require('express-session');

    	this.app.use(session({
    	    secret: 'there is no spoon',
    	    resave: true,
    	    saveUninitialized: false
    	}));
    }

}

module.exports = App;