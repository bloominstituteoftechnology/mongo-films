const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
    let query = Film
    .find()
    .sort("episode")
    .select('producer title episode release_date characters planets')
    .populate('characters', "name gender height skin_color hair_color eye_color ")
    .populate('planets', 'name climate terrain gravity diameter')
    
    const { producer, released } = req.query;

    if (producer) {
        const filter = new RegExp(producer, 'i')
        query.where({ producer: filter })
        }

    if (released) {
        const filter = new RegExp(released, 'i');
        query.where({ release_date: filter });
    }
    // if (released) {
    //     query.where({ release_date: { $regex: released, $options: 'i' } });
    //     }
    // JUST ANOTHER WAY TO WRITE IT
    
        query.then(films => res.status(200).json(films))
    })
    // .catch(err => {
    //     res.status(500).json({ msg: "error fetching films", err })
    // })

// router.get('/', function(req, res) {
//     let query = Film.find()
//       .select('episode producer title director release_date')
//       .populate('planets', 'name climate terrain gravity diameter')
//       .populate(
//         'characters',
//         'name gender height skin_color hair_color eye_color'
//       );
  
//     const { producer, released } = req.query;
  
//     if (producer) {
//       const filter = new RegExp(producer, 'i');
//       query.where({ producer: filter });
//     }
  
//     if (released) {
//       query.where({ release_date: { $regex: released, $options: 'i' } });
//     }
  
//     query.then(films => res.status(200).json(films));
//   });
  




// router.post('/', (req, res) => {
//     const userInput = req.body;
//     const film = new Film(userInput);
//     film
//     .save()
//     .then(film => {
//         res.status(201).json(film)
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// })

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const userInput = req.body;
//     const options = { new: true }
//     Film
//     .findByIdAndUpdate(id, userInput, options)
//     .then(film => {
//         if(film){
//             res.status(200).json(film)
//         } else {
//             res.status(404).json({ msg: "Film not found" })
//         }
//     })
// })

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     Film
//     .findByIdAndRemove(id)
//     .then(film => {
//         res.status(200).json({ msg: 'film successfully deleted' })
//     })
//     .catch(err => {
//         res.status(500).json({ err: "SERVER ERROR DELETING" })
//     })
// })


module.exports = router;
