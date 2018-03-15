const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req,res){
    const id = req.query.key;
    console.log(id);
    let query = Character.find({})
    .sort('character_ids') // {episode: 1} sortting from 1....
    .select('name created key')
    .populate('characters','homeworld')//no comma just space between them
    .populate('films','title character_ids');

    // if(id) {
    //     query.where({key: id}); //.where({producer: producerFilter});
    // }

    if(id) {
        query.where({character_ids: id}); //.where({producer: producerFilter});
    }
    query.then(char => {
        console.log(char);
        res.json(char);
    });
});
module.exports = router;
