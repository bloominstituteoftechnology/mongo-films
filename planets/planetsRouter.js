const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get('/', function get(req, res) {
    Planet.find()
     .then(planets =>
      res.status(200).json(planets));
    });


  router.get('/:id', function get(req, res) {
    Planet.findById(req.params.id)
    .then(planet => res.status(200).json(planet))
    .catch(err => {
        res.status(500).json(err)
    });
});
module.exports = router;
