/**
 * User Model
 */
class User {
    constructor() {

        /**
         * Getting Schema for users
         */
        const Schema = mongoose.Schema;

        const users = new Schema({
            email: {
                type: String,
                unique: true,
                required: true,
                trim: true
            },
            username: {
                type: String,
                unique: true,
                required: true,
                trim: true
            },
            password: {
                type: String,
                required: true
            },
            passwordConf: {
                type: String,
                required: true
            },
        });

        this.hashPass(users);

        this.userModel = mongoose.model('User', users);
    }

    /**
     * Authenticate user
     */
    authenticate(email, password, callback) {
        const User = this.userModel;
        User.findOne({ email: email })
            .exec(function(err, user) {
                if (err) {
                    return callback(err);
                } else if (!user) {
                    let err = new Error('User not found.');
                    err.status = 401;
                    return callback(err);
                }
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result === true) {
                        return callback(null, user);
                    } else {
                        return callback();
                    }
                })
            });
    }

    /**
     * Hashing a password before saving it to the database
     */
    hashPass(users) {
        users.pre('save', function(next) {
            let user = this;
            bcrypt.hash(user.password, 10, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        });
    }

}

module.exports = new User();