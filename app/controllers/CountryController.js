class CountryController {
    
    constructor() {
        // Schema from model
        this.CountryTable = Country.countryModel;
    }

    /**
     * Get all countries
     * @return json
     */
    getAll(req, res) {
        this.CountryTable.find({}).then(eachOne => {
            res.json(eachOne);
        });
    }

    /**
     * Create new country
     * @return json
     */
    create(req, res) {
        this.CountryTable.create({
            name: req.body.name
        }).then(country => {
            res.json(country)
        });

    }

}

module.exports = new CountryController();