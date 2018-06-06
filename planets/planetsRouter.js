const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Planet.find()
    .then(planets => {
      res.json(planets);
    })
    .catch(err => {
      console.log(err);
    })
})



module.exports = router;
