/**
 * Country Model
 */
class Country {
    constructor() {
        const Schema = mongoose.Schema;

        const countries = new Schema({
            name: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            }
        });

        this.countryModel = mongoose.model('Country', countries);
    }

}

module.exports = new Country();