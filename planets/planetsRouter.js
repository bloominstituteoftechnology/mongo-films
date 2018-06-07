const express = require('express');

const Planet = require('./Planet.js');
const routerFactory = require('../RouterFactory/routerFactory');
const router = express.Router();

// add endpoints here
routerFactory(router, Planet);
module.exports = router;
