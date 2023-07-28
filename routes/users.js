const { log } = require('console');
const router = require('express').Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const usersController = require('../controller/users_controller');

// sign up page
router.get('/sign-up' , usersController.signUp);

//sign in page
router.get('/sign-in', usersController.signIn);

// dashbaord
router.get('/dashboard' ,ensureAuthenticated , usersController.dashboard);

//sign-out
// router.get('/sign-out', usersController.signOut);

// Register Handle
router.post('/sign-up', usersController.register);

// sign in Handle
router.post('/sign-in', usersController.signInSession);

// log -out 
router.get('/sign-out', usersController.logOut);

module.exports = router;