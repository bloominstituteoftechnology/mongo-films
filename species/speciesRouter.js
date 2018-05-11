const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    Specie
    .find()
    .then(species => res.status(200).json(species))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Specie
        .findById(id)
        .populate('homeworld', 'classification name')
        .then(species => {
            Specie.find({ specie: id })
            .select('homeworld')
            .then(homeworld => {
                const planet = { ...planet._doc, homeworld: planet };
                res.status(200).json(homeworld);

            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;
