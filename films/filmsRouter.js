const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// // add endpoints here
// router.get('/', function(req, res) {
//   Film.find()
//     .then(films => res.status(200).json(films))
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

//release date /api/films?producer=gary kurtz&released=2005
router.get('/', function(req, res) {
  let query = Film.find().select('producer release_date');
  const { producer, released } = req.query;
  if (producer) {
    //filter by producer
    const filter = new RegExp(producer, 'i');
    query.where({ producer: filter });
  }

  if (released) {
    //filter by released
    query.where({ release_date: { $regex: released, $options: 'i' } });
  }
  query.then(film => res.status(200).json(film)).catch(err => {
    res.status(500).json(err);
  });
});
module.exports = router;
