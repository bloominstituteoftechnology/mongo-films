const express = require('express');

const Starship = require('./Starship.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
myFactory.routerFactory(router, Starship)('pilot');

module.exports = router;
