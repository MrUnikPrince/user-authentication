const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv');
dotenv.config();

// Load User Model
const User = require("../models/User");

// local strategy
module.exports = (passport) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: ' That email is not registered' });
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect ' });
                        }
                    });
                })
        }

    ))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(user => { done(null, user); })
            .catch(err => { done(err, null); })
    });

}

// google auth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://https://user-authentication-ilpu.onrender.com//google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        console.log(profile);
        const user = await User.findOne({email: profile.emails[0].value});
        if(user){
            return done(null, user);
        } else{
        const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
        console.log(newUser);
            return done(null, newUser);
        }
    }catch(err){
        console.log('error in the google auth : ' , err);
        return done(null, false, { message: ' That email is not registered: Google ' });
    }
  }
));
// serializer function
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserializeUser function
passport.deserializeUser(function(user, cb) {
   cb(null, user);
});


