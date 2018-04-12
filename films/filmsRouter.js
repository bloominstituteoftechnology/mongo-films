const express = require(`express`);

const Film = require(`./Film.js`);

const db_thrown_error = require(`./db_thrown_error`);

const router = express.Router();

// add endpoints here
router.route(`/`).get((req, res) => {
  const producer = req.query.producer !== undefined ? req.query.producer : ``;
  const released = req.query.released !== undefined ? req.query.released : ``;

  console.log(producer, ' and ', released);
  Film.find({})
    .sort({ episode: 1 })
    .populate(`characters`, {
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1,
    })
    .populate(`planets`, {
      _id: 0,
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1,
    })
    .where({ producer: { $regex: producer, $options: 'i' } })
    .where({ release_date: { $regex: released, $options: 'i' } })
    .then(films => {
      if (films.length === 0) {
        res.status(404).json({ error: `No Films found!` });
      } else {
        res.status(200).json(films);
      }
    })
    .catch(err => {
      const error = db_thrown_error({ error: err, type: `GET` });
      res.status(error.status).json(error.errorMessage);
    });
}); // if you uncomment the post take the semi colon out
// .post((req, res) => {
//   // do some error checks
//   if (req.body.filmName === undefined) {
//     res.status(400).json({ error: `Please enter a film name` });
//     return;
//   }

//   // create a film Model
//   const film = new Film(req.body);

//   film
//     .save()
//     .then(savedFilm => {
//       res.status(201).json(savedFilm);
//     })
//     .catch(err => {
//       const error = db_thrown_error({ error: err, type: `POST` });
//       res.status(error.status).json(error.errorMessage);
//     });
// });

module.exports = router;
