const express = require("express");
const Character = require("./Character.js");
const Film = require("../films/Film");
const Vehicle = require("../vehicles/Vehicle");
const router = express.Router();

router.get("/", (req, res) => {
  const { minheight, gender } = req.query;

  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter -_id")
    .populate("movies", "title")
    .then(p => {
      if (minheight && gender) {
        const x = p.filter(p => {
          return (
            p.height >= Number(minheight) &&
            p.gender.toLowerCase() === gender.toLowerCase()
          );
        });

        res.status(200).json(x);
      }
      if (minheight || gender) {
        const x = p.filter(p => {
          return (
            p.height >= Number(minheight) ||
            p.gender.toLowerCase() === gender.toLowerCase()
          );
        });

        res.status(200).json(x);
      }

      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .populate("homeworld", "name climate terrain gravity diameter -_id")

    .then(p => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const newP = { ...p._doc, movies: films };
          res.status(200).json(newP);
        });
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

///api/characters/:id/vehicles)

router.get("/:id/vehicles", (req, res) => {
  const { id } = req.params;

  Vehicle.find({ pilots: id })

    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
