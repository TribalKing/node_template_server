const express = require('express');

app = module.exports = express();

config = require('./config/config');
const db = require('./config/db');

/**
 * Dependencies - Including all dependencies needed for app
 */
const Dependencies = require('./Dependencies.js');

/**
 * WebSocket - Listening WebSockets (configuration info in config.js file)
 */
const Websocket = require('./WebSocket.js');

/**
 * API - Including all controllers and models for API calls
 */
const api = require('./api.js');

app.listen(config.app.port);