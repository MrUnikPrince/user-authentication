const router = require('express').Router();
const passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const mainController = require('../controller/main_controller');

router.get('/' , mainController.home);
// dashbaord
router.get('/dashboard', ensureAuthenticated , mainController.dashboard);


// google auth
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/'}), mainController.createSession);

router.use('/users', require('./users'));


module.exports = router;