const router = require('express').Router();

const mainController = require('../controller/main_controller');

router.get('/' , mainController.home);
router.use('/users', require('./users'));


module.exports = router;