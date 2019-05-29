/**
 * Class config contains all info needed for the app
 * ports for node server and websocket server, and db configuration.
 * Also requiring mongo db, which is used for storing all the data
 */
class Config {
    constructor() {
        this.app = {
            port: 8089
        };

        this.websocket = {
            port: 8088
        };

        this.db = {
            host: 'localhost',
            port: 27017,
            name: 'db'
        };
    }

    /**
     * Database
     */
    Db() {
        const mongoose = require('mongoose');

        // setting the mongodb to useCreateIndex instead of ensure to avoid deprecation message
        mongoose.set('useCreateIndex', true);

        // connection to db
        const connectionString = `mongodb://${this.db.host}:${this.db.port}/${this.db.name}`;
        mongoose.connect(connectionString, { useNewUrlParser: true });
        
        return mongoose;
    }

}

module.exports = new Config();
