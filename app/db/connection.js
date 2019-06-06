/**
 * Class Connection requiring mongo db, which is used for storing all the data
 */
class Connection {
    constructor() {
        this.config = require('config');
    }

    /**
     * Connection for Mongo DB
     */
    startMongo () {
        const mongoose = require('mongoose');

        // setting the mongodb to useCreateIndex instead of ensure to avoid deprecation message
        mongoose.set('useCreateIndex', true);

        // checking if already connected to MongoDB
        if(mongoose.connection.readyState === 0) {
            // connection to db
            const connectionString = `mongodb://${this.config.get('db.host')}:${this.config.get('db.port')}/${this.config.get('db.name')}`;

            mongoose.connect(connectionString, { useNewUrlParser: true })
            .then(() => console.log('Connected to MongoDB.') )
            .catch(err => console.log('Error connecting the MongoDB', err));
        }

        return mongoose;

    }

}

module.exports = Connection;
