const express = require(`express`);

const Planet = require(`./Planet.js`);

const db_thrown_error = require(`./db_thrown_error`);

const router = express.Router();

// add endpoints here
router.route(`/`).get((req, res) => {
  console.log('here');
  Planet.find({})
    .then(Planets => {
      if (Planets.length === 0) {
        res.status(404).json({ error: `No Planets found!` });
      } else {
        res.status(200).json(Planets);
      }
    })
    .catch(err => {
      const error = db_thrown_error({ error: err, type: `GET` });
      res.status(error.status).json(error.errorMessage);
    });
}); // if you uncomment the post take the semi colon out
// .post((req, res) => {
//   // do some error checks
//   if (req.body.characterName === undefined) {
//     res.status(400).json({ error: `Please enter a character name` });
//     return;
//   }

//   // create a film Model
//   const planet = new Planet(req.body);

//   planet
//     .save()
//     .then(savedPlanet => {
//       res.status(201).json(savedPlanet);
//     })
//     .catch(err => {
//       const error = db_thrown_error({ error: err, type: `POST` });
//       res.status(error.status).json(error.errorMessage);
//     });
// });

module.exports = router;
