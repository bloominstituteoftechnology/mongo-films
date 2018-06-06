const express = require('express');
const mongoose = require('mongoose');
const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req,res) => {
    Film.find()
      .sort({ episode: 1})
      .then(film => {
        res.status(200).json(film)
      })
      .catch(err => {
        res.status(500).json({error:  "brah,no can do get"})
      })
  })


module.exports = router;
