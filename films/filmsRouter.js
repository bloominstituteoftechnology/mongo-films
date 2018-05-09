const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.post("/", function post(req, res) {
  const filmData = req.body;
  const film = new Film(filmData);

  film
    .save()
    .then(film => {
      res.status(201).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route("/").get((req, res) => {
  if (req.query.producer) {
    Film.find()
      .where({ producer: new RegExp(req.query.producer, "i") })
      .populate("characters", "name")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  if (req.query.released) {
    Film.find()
      .where({ producer: new RegExp(req.query.released, "i") })
      .populate("characters", "name")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    Film.find()
      .sort("episode")
      .populate(
        "characters",
        "_id name gender height skin_color hair_color eye_color"
      )
      .populate("planets", "name climate terrain gravity diameter")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => res.status(500).json(err));
});

// /api/films/1234
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Film.findByIdAndRemove(id)
    .then(film => {
      if (film) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: "Film not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const options = {
    new: true
  };

  Film.findByIdAndUpdate(id, update, options)
    .then(film => {
      if (film) {
        res.status(200).json(film);
      } else {
        res.status(404).json({ msg: "Film not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
