const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here

// For testing
// router.get('/', (req, res) => {
//   Film.find().sort('episode')
//   .then( film => {
//     res.status(200).json(film);
//   })
//   .catch( error => {
//     res.status(500).json ({ error: "Films could not be retrieved, try again later" })
//   })
// });


router.get('/', (req, res) => {
  const { producer, release_date } = req.query;

  let query = Film.find()
  .sort({ episode: 1})
  .populate('characters', '_id name gender height skin_color hair_color eye_color')
  .populate('planets', 'name climate terrain gravity diameter')
      if (producer) {
        const regex = new RegExp(producer, 'i');
        query.where({ producer: regex });
    }

    if (release_date) {
        const regex = new RegExp(release_date, 'i');
        query.where({ release_date: regex });
    }
    
    query.then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


//Luis example from lesson, not working ATM
// router.get('/', (req, res) => {
//   let query = Film.find().select('producer release_date');
//   const { prodducer, released } = req.query
//  .select('episode producer title director release_date charactrers planets')
//   .populate ('planets', 'name climate terran gravity diameter')
//   .populate('characters', 'name gender height skin_color eye_color hair_color')
//   if (producer) {
//     const filter = new RegExp(producer, 'i');
//     query.where({ producer: filter })
//   }

//   if (released) {
//     query.where({release_date: { $regex: released, $options: 'i' } });
//   }

//   query.then(films => res.status(200).json(films));
// });

module.exports = router;
