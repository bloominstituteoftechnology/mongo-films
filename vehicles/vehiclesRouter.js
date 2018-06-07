const express = require('express');

const Vehicle = require('./Vehicle.js');

const routerFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
routerFactory(router, Vehicle);

module.exports = router;
