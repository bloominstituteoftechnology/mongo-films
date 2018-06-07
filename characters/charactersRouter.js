const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.route('/').get((req, res) => {
    Character.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message }));
})

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Character.findById(id).populate('homeworld', '-_id -edited -created -__v -key')
        .then(response => {
            if(response === null) res.status(400).json({ error: `The character by that ID does not exist.`});
            res.json(response);
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

module.exports = router;
