var express = require('express');
var router = express.Router();

//var App = require('../public/javascripts/script');


var zoneController = require('../controller/zoneController');
var deviceController = require('../controller/deviceController');

/* Get Home Page */
router.get('/', zoneController.index);

//router.get('/device', deviceController.device_load); //test

module.exports = router;