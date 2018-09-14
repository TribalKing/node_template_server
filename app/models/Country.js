const Model = require('./Model');

/**
 * Country model 
 *
 * Needed fields adding to Schema for mongo db.
 * 
 */
class Country extends Model {
    constructor() {
        super();
        const Schema = this.mongoose.Schema;

        const countries = new Schema({
            name: {
                type: this.mongoose.Schema.Types.Mixed,
                required: true,
            }
        });

        this.countryModel = this.mongoose.model('Country', countries);
    }

}

module.exports = Country;