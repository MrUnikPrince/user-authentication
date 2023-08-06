const User = require('../models/User');
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const bcrypt = require ('bcryptjs');
// sign up function for routes
module.exports.signUp = (req, res) => {
    return res.render('sign_up', {
        title: 'Register'
    })
}
// sign in function for routes
module.exports.signIn = (req, res) => {
    return res.render('sign_in', {
        title: 'Login'
    })
}
 
// sign out function for routes
// module.exports.signOut = (req, res) => {
//     return res.render('sign_out', {
//         title: 'Logout'
//     })
// }

// register function 
module.exports.register = async (req, res) => {
   const { name, email, password, confirm_password } = req.body;
    let errors = [];

    // check required fields
    if(!name || !email || !password || !confirm_password){
        errors.push({msg : `Please fill in all fields`});
    }

    // check passwords match
    if(password !== confirm_password){
        errors.push({msg : 'Passwords do not match'});
    }

    // check pass length
    if(password.length < 6){
        errors.push({msg : 'Passwords should be at least 6 characters '});
    }

    if(errors.length > 0) {
        res.render('sign_up', {
            title:'Register',
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else{
        // Validation
        try{
            const user = await User.findOne({email:email});
            if(!user){
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Store hash in your password DB.
                        newUser.password = hash;

                        //save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/sign-in')
                        })
                        .catch(err => console.log(`Error in hashing password ${err}`));
                    });
                });

            } else{
                // User exists
                errors.push({msg : 'Email is already registered'});
                res.render('sign_up', {
                    title:'Register',
                    errors,
                    name,
                    email,
                    password,
                    confirm_password
                });
            }
        }catch(err){
            console.log('Error in creating error');
        }
    }
} 

module.exports.signInSession = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/sign-in',
        failureFlash: true
    }) (req, res, next);
}

module.exports.logOut = (req, res) => {
    req.logOut((err) => {
        if(err) {
            errors.push({msg:`Unable to log out`});
        }
        req.flash('success_msg', 'You are logged out');
    res.redirect('/users/sign-in');
    });
}

