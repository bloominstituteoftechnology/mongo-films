const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

const errorMessage = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet
            .find()
            .then(totalPlanet => {
                res.status(200).json({ totalPlanet })
            })
            .catch(error => {
                errorMessage(500, 'Something wrong to get the data', res)
            })
})


router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet
            .findById(id)
            .then(foundPlanet => {
                if(!foundPlanet) {
                    errorMessage(404, 'No the specific character found', res);
                }
                res.status(200).json({ foundPlanet })
            })
            .catch(error => {
                errorMessage(500, 'Something wrong to get the data', res)
            })
})

module.exports = router;
