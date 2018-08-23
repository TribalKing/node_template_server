const Country = require('../models/Country.js');

/**
 * Get all countries
 * @return json
 */
app.get(Routes.Country.countries, function (req, res) {
    Country.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

/**
 * Create new country
 * @return json
 */
app.post(Routes.Country.countries, function (req, res) {
    Country.create({
        name: req.body.name
    }).then(country => {
        res.json(country)
    });
});
