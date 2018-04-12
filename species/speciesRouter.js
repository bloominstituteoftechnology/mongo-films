const express = require(`express`);

const Species = require(`./Species.js`);

const router = express.Router();

// add endpoints here
router.route(`/`).get((req, res) => {
  Species.find({})
    .then(Species => {
      if (Species.length === 0) {
        res.status(404).json({ error: `No Species found!` });
      } else {
        res.status(200).json(Species);
      }
    })
    .catch(err => {
      const error = db_thrown_error({ error: err, type: `GET` });
      res.status(error.status).json(error.errorMessage);
    });
}); // if you uncomment the post take the semi colon out
// .post((req, res) => {
//   // do some error checks
//   if (req.body.SpeciesName === undefined) {
//     res.status(400).json({ error: `Please enter a Species name` });
//     return;
//   }

//   // create a film Model
//   const species = new Species(req.body);

//   species
//     .save()
//     .then(savedSpecies => {
//       res.status(201).json(savedSpecies);
//     })
//     .catch(err => {
//       const error = db_thrown_error({ error: err, type: `POST` });
//       res.status(error.status).json(error.errorMessage);
//     });
// });

module.exports = router;
