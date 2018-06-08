const express = require('express');

const Specie = require('./Specie.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
myFactory.routerFactory(router, Specie)('homeworld');

module.exports = router;
