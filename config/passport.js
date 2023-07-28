const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require("../models/User");


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

    // passport.deserializeUser(async function (id, done) {
        passport.deserializeUser(function (id, done) {

            User.findById(id)

                .then(user => { done(null, user); })

                .catch(err => { done(err, null); })

        });

        // try {
        //     const user = await User.findById(id);
        //     if (!user) {
        //         console.log(`Error in finding user --> Passport`);
        //         return done(null, false);
        //     }
        //     return done(null, user);
        // } catch (err) {
        //     console.log(`Error in finding user --> Passport`);
        //     return done(err);
        // }
    // });

}
