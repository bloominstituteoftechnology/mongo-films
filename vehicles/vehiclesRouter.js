const express = require('express');

const Vehicle = require('./Vehicle.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
myFactory.routerFactory(router, Vehicle);

module.exports = router;
