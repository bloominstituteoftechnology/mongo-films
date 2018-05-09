const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// const query = Film.find();
// const producer = req.query.producer;
// const released = req.query.released;


// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Film.find()
    .sort('episode')
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json( { errorMessage: "Server error.  Cannot find any films." })
    })
  })

  // if(producer) {
  //   query.where({ producer: producer });
  // }

  // query.then(films => res.json(films)).catch();

module.exports = router;
