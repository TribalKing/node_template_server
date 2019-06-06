const Connection = require('../db/connection');

/**
 * Model class contains everything that is needed for all models
 * Including all models goes from here too, and anything that
 * is needed can be added here for other models to use it.
 */
class Model extends Connection {
    constructor() {
        super();
        this.mongoose = this.startMongo();

        /**
         * Bcrypt - For hashing a password
         */
        this.bcrypt = require('bcrypt');
    }

}

module.exports = Model;