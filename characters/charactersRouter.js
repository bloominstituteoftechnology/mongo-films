const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  let query = Character.find();

  const heightFilter = req.query.height;
  const genderFilter = req.query.gender;

  if (heightFilter) {
    const filterHt = new RegExp(heightFilter);
    query.where({ height: filterHt });
  }

  if (genderFilter) {
    const filterGen = new RegExp(genderFilter, "i");
    query.where({ gender: filterGen });
  }

  query
    .then(char => {
      res.status(201).json(char);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .populate("homeworld", "name climate -_id")
    .then(char => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const charInfo = { ...char._doc, movies: films }; // grab the document info or char
          res.status(200).json(charInfo);
        });
      // res.status(201).json(char);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.use("/:id", (req, res, next) => {
//   Character.findById(req.params.id)
//     .populate("homeworld")
//     .then(char => {
//       Film.find({ characters: id })
//         .then(films => res.send(Object.assign({}, char, { movies: films })))
//         .catch(err => next(err));
//     })
//     .catch(err => next(err));
// });

// router.get("/:id/vehicles", (req, res) => {
//   const { id } = req.params;

//   Character.findById(id)
//     .select("vehicles")
//     .then(char => {
//       res.status(201).json(char);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
