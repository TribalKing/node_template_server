/**
 * Country Model
 */
let Schema = mongoose.Schema;

const countries = new Schema({
    name: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
});

const Country = mongoose.model('Country', countries);

module.exports = Country;