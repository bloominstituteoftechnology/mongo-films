const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  //Producer/Release_Date Query
 let query = Film.find()
 .select('episode producer title director release_date characters planets')
 .populate('planets', 'name climate terrain gravity diameter')
 .populate('characters', 'name gender height skin_color hair_color eye_color');
 const { producer, released } = req.query;

    if(producer) {
        const filter = new RegExp(producer, 'i');
        query.where({ producer: filter });
    }
    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' } });
    }
    query.then(films => res.status(200).json(films));
});

// Get by ID
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .populate("characters", {
      _id: 1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1
    })
    .then(foundFilm => {
      res.status(200).json(foundFilm);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
