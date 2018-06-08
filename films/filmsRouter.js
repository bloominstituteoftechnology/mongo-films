const express = require('express');

const Film = require('./Film.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

// add endpoints here
// myFactory.routerFactory(router, Film).setPopulate('starship', 'vehicles', 'planets', 'characters', 'species');
myFactory.routerFactory(router, Film)('starship', 'vehicles', 'planets', 'characters', 'species');

module.exports = router;
