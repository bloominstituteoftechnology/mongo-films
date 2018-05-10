const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  let { producer, released } = req.query;
  if (producer) {
    producer = producer.toLowerCase();
  }
  Film.find()
    // .select('episode producer title director release_date')
    .select("-specie_ids -character_ids -planet_ids -starship_ids -vehicle_ids")
    .sort("episode")
    .populate(
      "characters",
      "name gender height skin_color hair_color eye_color"
    )
    .populate("planets", "name climate terrain gravity diameter")
    .then(films => {
      const filteredFilms = films.filter(film => {
        if (producer !== undefined && released !== undefined) {
          return (
            film.producer.toLowerCase().includes(producer) &&
            film.release_date.includes(released)
          );
        } else if (producer !== undefined || released !== undefined) {
          return (
            film.producer.toLowerCase().includes(producer) ||
            film.release_date.includes(released)
          );
        } else return film;
      });
      res.status(200).json(filteredFilms);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get films." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Film.findById(id)
    .then(film => {
      res.status(200).json(film);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get film." });
    });
});

// == Luis' way to filter by producer/release (I added the combo if) ==
// router.get("/", (req, res) => {
//   let query = Film.find()
//   // .select will just show producer and release_date only
//   // .select("producer release_date");
//   const { producer, released } = req.query;
//   if (producer && released) {
//     const filter = new RegExp(producer, "i");
//     query.where({
//       producer: filter,
//       release_date: { $regex: released, $options: "i" }
//     });
//   } else if (producer) {
//     const filter = new RegExp(producer, "i");
//     query.where({ producer: filter });
//   } else if (released) {
//     query.where({ release_date: { $regex: released, $options: "i" } });
//   }
//   query.then(films => res.status(200).json(films));
// });

module.exports = router;
