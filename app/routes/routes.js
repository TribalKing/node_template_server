/**
 * Routes for all API calls
 */
class Route {

    constructor() {
        this.app = require('../App');
    }

    /**
     * Routes for countries
     */
    countryRoutes() {
        const countries = require('../controllers/CountryController.js');

        // * Create a new country
        this.app.post('/api/countries', (req, res) => {
            countries.create(req, res);
        });

        // * Get all countries
        this.app.get('/api/countries', (req, res) => {
            countries.getAll(req, res);
        });
    };

    /**
     * Routes for users
     */
    userRoutes() {
        const users = require('../controllers/UserController.js');

        // * Test if api is working
        this.app.get('/', (req, res) => {
            users.test(req, res);
        });

        // * Get all users
        this.app.get('/api/users', (req, res) => {
            users.getAll(req, res);
        });

        // * Get all currently logged in users
        this.app.get('/api/users/current', (req, res) => {
            users.getAllLoggedUsers(req, res);

        });

        // * Create new user
        this.app.post('/api/users', (req, res) => {
            users.create(req, res);
        });

        // * Login user
        this.app.post('/api/users/login', (req, res, next) => {
            console.log(req.body);
            users.loginUser(req, res);
        });

        // * Logout user
        this.app.get('/api/users/logout', (req, res, next) => {
            users.logoutUser(req, res);
        });

        // * Current user
        this.app.get('/api/me', (req, res, next) => {
            users.getMe(req, res);
        });

        // * Like User
        this.app.get('/api/:id/like', (req, res, next) => {
            users.likeUser(req, res);
        });

        // * Unlike User
        this.app.get('/api/:id/unlike', (req, res, next) => {
            users.unlikeUser(req, res);
        });

        // * Get most liked users
        this.app.get('/api/most-liked', (req, res, next) => {
            users.mostLikedUsers(req, res);
        });

    };
}

const route = new Route();

route.countryRoutes();
route.userRoutes();