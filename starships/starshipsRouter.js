const express = require(`express`);

const Starship = require(`./Starship.js`);

const db_thrown_error = require(`./db_thrown_error`);

const router = express.Router();

// add endpoints here
router.route(`/`).get((req, res) => {
  Starship.find({})
    .then(Starships => {
      if (Starships.length === 0) {
        res.status(404).json({ error: `No Starships found!` });
      } else {
        res.status(200).json(Starships);
      }
    })
    .catch(err => {
      const error = db_thrown_error({ error: err, type: `GET` });
      res.status(error.status).json(error.errorMessage);
    });
}); // if you uncomment the post take the semi colon out
// .post((req, res) => {
//   // do some error checks
//   if (req.body.StarshipName === undefined) {
//     res.status(400).json({ error: `Please enter a Starship name` });
//     return;
//   }

//   // create a film Model
//   const starship = new Starship(req.body);

//   starship
//     .save()
//     .then(savedStarship => {
//       res.status(201).json(savedStarship);
//     })
//     .catch(err => {
//       const error = db_thrown_error({ error: err, type: `POST` });
//       res.status(error.status).json(error.errorMessage);
//     });
// });

module.exports = router;
