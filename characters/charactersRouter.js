const express = require('express');

const Character = require('./Character.js');

const routerFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
routerFactory(router, Character);

module.exports = router;
