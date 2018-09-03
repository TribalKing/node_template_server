/**
 * Database
 */
mongoose = require('mongoose');
const config = require('./config');

// connection to db
const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString, { useNewUrlParser: true });