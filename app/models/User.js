/**
 * User Model
 */
 let Schema = mongoose.Schema;

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

/**
 * Hashing a password before saving it to the database
 */
users.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

/**
 * Authenticate user
 */
users.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

 const User = mongoose.model('User', users);

 module.exports = User;