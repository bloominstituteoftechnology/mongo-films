const express = require('express');

const Starship = require('./Starship.js');

const routerFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
routerFactory(router, Starship);

module.exports = router;
