

const express = require('express');
const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function get(req, res) {
  let query = Film.find()
  .sort('episode')
  .select('episode title director planets characters producer release_date')
  .populate('characters', 'name gender height skin_color hair_color eye_color _id' )
  .populate('planets', 'name climate terrain gravity diameter -_id' )

  const { producer, released } = req.query;
  if(producer){
    const filter = new RegExp(producer, 'i');
    query.where({ producer: filter })
  }

  // if(released) {
  //   const filter = new RegExp(released, "i")
  //   query.where({ release_date:  })
  // }


  query.then(films =>
      res.status(200).json(films))
    .catch(err=>{
        res.status(500).json(err);
    });
  });

router.get('/:id', function get(req, res) {
    Film.findById(req.params.id)
    .populate('starships', 'starship_class hyperdrive_rating' )
    .populate('characters', 'name -_id' )
    .populate('planets', 'name -_id' )
    .populate('species', 'name -_id' )
    .populate('vehicle', 'vehicle_class -_id'  )
    .then(film => res.status(200).json(film))
    .catch(err => {
        res.status(500).json(err)
    });
});
module.exports = router;
