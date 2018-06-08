const express = require('express');

const Character = require('./Character.js');

const myFactory = require('../RouterFactory/routerFactory');

const router = express.Router();

console.log(myFactory);

// add endpoints here
// myFactory.routerFactory(router, Character).setPopulate('homeworld');
myFactory.routerFactory(router, Character)('homeworld');

module.exports = router;
