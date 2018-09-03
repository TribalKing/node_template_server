/**
 * Routes for all API calls
 */
class Route {

    constructor() {
        this.User = {
                users: '/api/users',
                login: '/api/users/login',
                logout: '/api/users/logout',
                current: '/api/users/current',
            },

            this.Country = {
                countries: '/api/countries',
            }
    }

    countryRoutes() {
        const countries = require('../controllers/CountryController.js');

        /**
         * Create a new country
         */
        app.post(this.Country.countries, function(req, res) {
            countries.create(req, res);
        });

        /**
         * Get all countries
         */
        app.get(this.Country.countries, function(req, res) {
            countries.getAll(req, res);
        });
    };

    userRoutes() {
        const users = require('../controllers/UserController.js');

        /**
         * Test if api is working
         */
        app.get('/', function(req, res) {
            users.test(req, res);
        });

        /**
         * Get all users
         */
        app.get(this.User.users, function(req, res) {
            users.getAll(req, res);
        });

        /**
         * Get all currently logged in users
         */
        app.get(this.User.current, function(req, res) {
            users.getAllLoggedUsers(req, res);

        });

        /**
         * Create new user
         */
        app.post(this.User.users, function(req, res) {
            users.create(req, res);
        });

        /**
         * Login user
         */
        app.post(this.User.login, function(req, res, next) {
            users.loginUser(req, res);
        });

        /**
         * Logout user
         */
        app.get(this.User.logout, function(req, res, next) {
            users.logoutUser(req, res);
        });

    };
}

const route = new Route();

route.countryRoutes();
route.userRoutes();