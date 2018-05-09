const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  Film.find()
    .then(films => {
      films = films.sort(function(a, b) {
        let episodeA = a.episode;
        let episodeB = b.episode;
        if (episodeA < episodeB) {
          return -1;
        }
        if (episodeA > episodeB) {
          return 1;
        }
        return 0;
        // console.log(a);
        // return b - a;
      });
      // sortedNotes.sort(function(a, b) {
      //   let titleA = a.title.toLowerCase();
      //   let titleB = b.title.toLowerCase();
      //   if (titleA < titleB) {
      //     return -1;
      //   }
      //   if (titleA > titleB) {
      //     return 1;
      //   }
      //   return 0;
      // })
      res.status(200).json(films);
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

module.exports = router;
