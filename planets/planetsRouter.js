const express = require('express');

const Planet = require('./Planet.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
// myFactory.routerFactory(router, Planet).setPopulate();
myFactory.routerFactory(router, Planet);

module.exports = router;
