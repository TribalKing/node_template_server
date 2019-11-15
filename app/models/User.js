const Model = require('./Model');

/**
 * User model 
 *
 * Needed fields adding to Schema for mongo db.
 * Also authentication in this class, for user login.
 */
class User extends Model {
    constructor() {
        super();
        
        // Getting Schema for users
        const Schema = this.mongoose.Schema;

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
            likes: {
                type: Number
            },
        });

        this.hashPass(users);

        this.userModel = this.mongoose.model('User', users);
    }

    /**
     * Authenticate user
     */
    authenticate(email, password, callback) {
        const User = this.userModel;
        const bcrypt = this.bcrypt;

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
        const bcrypt = this.bcrypt;
        
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

module.exports = User;