const express = require('express');

const Specie = require('./Specie.js');

const routerFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
routerFactory(router, Specie);

module.exports = router;
