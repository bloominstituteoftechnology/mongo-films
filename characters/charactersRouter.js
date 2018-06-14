const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

const errorMessage = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { id } = req.params;    
        const { minheight} = req.query;
        if(minheight) {
            Character
                .find({ height: { $gt: minheight}, gender: 'female' }) //gt = greater than
                .then(char => {
                    res.status(200).json({ char })
                })
        } else {
            Character
                .find()
                .then(char => {
                    res.status(200).json({ char })
                })
                .catch(error => {
                    errorMessage(500, 'Something wrong to get the data', res)
                })
            }
})


router
    .route('/:id')
    .get((req, res) => {
            
            Character
                .findById(id)            
                .then(foundChar => {
                    if(!foundChar) {
                        errorMessage(404, 'No the specific character found', res);
                    }
                    res.status(200).json({ foundChar })
                })
                .catch(error => {
                    errorMessage(500, error, res)
                })
})

module.exports = router;
