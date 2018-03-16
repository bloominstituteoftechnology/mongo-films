const express = require('express');
const Film = require('./Film.js');
const router = express.Router();

router.get('/', (req, res) => {
    const producerCriteria = req.query.producer;
    const releasedYearCriteria = req.query.released;

    const query = Film.find({}).sort({episode: 1})
        .populate('characters', 'name gender height skin_color')
        .populate('planets', 'name climate terrain gravity diameter');

    if (producerCriteria) {
        const regxExpression = new RegExp(producerCriteria, 'i');
        query.where({producer: regxExpression});
    }

    if (releasedYearCriteria) {
        const regxExpression = new RegExp(releasedYearCriteria);
        query.where({release_date: regxExpression});
    }

    query.then(resp => res.json(resp));
});

module.exports = router;
