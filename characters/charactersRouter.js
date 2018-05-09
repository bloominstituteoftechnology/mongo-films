const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get('/', function get(req, res) {
    Character.find().then(characters => {
      res.status(200).json(characters);
    });
  });
module.exports = router;
