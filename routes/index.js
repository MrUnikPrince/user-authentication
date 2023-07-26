const { log } = require('console');
const router = require('express').Router();

const mainController = require('../controller/main_controller');
router.use('/' , mainController.home);


module.exports = router;