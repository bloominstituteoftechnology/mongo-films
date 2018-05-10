const express = require('express');

const Film = require('./Film.js'); //model name for exported film schema 

const router = express.Router();

// add endpoints here
router.route('/').get((req, res) => {
    res.status(200).json(req);
}


module.exports = router;
