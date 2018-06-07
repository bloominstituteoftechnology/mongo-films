const express = require('express');

const Film = require('./Film.js');

const routerFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
routerFactory(router, Film);

module.exports = router;
