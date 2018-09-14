/**
 * Country Controller 
 *
 * Contains all API calls for countries
 * 
 */
const Country = require('../models/Country');

class CountryController extends Country {
    
    constructor() {
        super();
    }

    /**
     * Get all countries
     * @return json
     */
    getAll(req, res) {
        this.countryModel.find({}).then(eachOne => {
            res.json(eachOne);
        });
    }

    /**
     * Create new country
     * @return json
     */
    create(req, res) {
        this.countryModel.create({
            name: req.body.name
        }).then(country => {
            res.json(country)
        });

    }

}

module.exports = new CountryController();