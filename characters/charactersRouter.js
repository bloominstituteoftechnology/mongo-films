const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");
const Vehicle = require("../vehicles/Vehicle.js");
const Starship = require("../starships/Starship.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(chars => {
      const promises = chars.map(char => {
        return Film.find({ characters: char._id })
          .select("title")
          .then(films => {
            return (char = { ...char._doc, movies: films });
          });
      });
      Promise.all(promises).then(chars => res.status(200).json(chars));
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get characters." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Character.findById(id)
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(char => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const character = { ...char._doc, movies: films };
          res.status(200).json(character);
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get character." });
    });
});

router.get("/:id/vehicles", (req, res) => {
  const id = req.params.id;
  const vehicles = Vehicle.find({ pilots: id }).select("vehicle_class");
  const starships = Starship.find({ pilots: id }).select("starship_class");

  Promise.all([vehicles, starships])
    .then(results => {
      const [vehicles, starships] = results;
      res.status(200).json({ vehicles, starships });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Could not get the vehicles/starships this character piloted."
      });
    });
});

// the below way will show the whole character plus films vehicles and starships
// router.get("/:id/vehicles", (req, res) => {
//   const id = req.params.id;
//   Character.findById(id)
//     .populate("homeworld", "name climate terrain gravity diameter")
//     .then(char => {
//       const films = Film.find({ characters: id }).select("title");
//       const vehicles = Vehicle.find({ pilots: id }).select("vehicle_class");
//       const starships = Starship.find({ pilots: id }).select("starship_class");

//       Promise.all([films, vehicles, starships])
//         .then(results => {
//           const [films, vehicles, starships] = results;
//           const character = {
//             ...char._doc,
//             films: films,
//             vehicles: vehicles,
//             starships: starships
//           };
//           res.status(200).json(character);
//         })
//         .catch(err => {
//           res.status(500).json({
//             errorMessage:
//               "Could not get the vehicles/starships this character piloted."
//           });
//         });
//     })
//     .catch(err => {
//       res.status(500).json({ errorMessage: "Could not get character." });
//     });
// });

module.exports = router;
