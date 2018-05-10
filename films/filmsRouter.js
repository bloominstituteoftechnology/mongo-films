const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
// router.get('/', function(req, res) {
//   let query = Film.find().sort({episode: 1})
//     .select('episode producer title director release_date')
//     .populate('planets', 'name climate terrain gravity diameter')
//     .populate(
//       'characters',
//       'name gender height skin_color hair_color eye_color'
//     );
//
//   const { producer, released } = req.query;
//
//   if (producer) {
//     const filter = new RegExp(producer, 'i');
//     query.where({ producer: filter });
//   }
//
//   if (released) {
//     // query.where({ release_date: { $regex: released, $options: 'i' } });
//     const filter = new RegExp(released, 'i');
//     query.where({ release_date: filter });
//   }
//
//
//   query.then(films => res.status(200).json(films));
// });



// add endpoints here
router.get('/', (req, res) => {

    let query = Film.find();

    query.sort({ episode: 1 })
    .populate("characters", "name gender height skin_color hair_color eye_color")
    .populate("planets", "name climate terrain gravity diameter")

    query
    .then(films => {
        res.json(films)
    })
    .catch(err => {
        res.json({ Error: err})
    })
})

router.get('/?producer=gary+kurtz', (req, res) => {

    Film
    .find({ producer: { regex: /Gary Kurtz/ }})
    .then(gary => {
        res.json(gary)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/?released=2005', (req, res) => {

    query
    .find({ release_date: { regex: /2005/ }})
    .then(release => {
        res.json(release)
    })
    .catch(err => {
        res.json(err)
    })
})


module.exports = router;
