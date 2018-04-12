const express = require("express");

const Character = require("./Character.js");

const Film = require("../films/Film.js");

const router = express.Router();

const mongoose = require("mongoose");

// add endpoints here

router.route("/:id").get(async (req, res) => {
  try {
    const charByID = await Character.findById(req.params.id).populate(
      "homeworld"
    );
    const movies = await Film.where("characters").equals(
      mongoose.Types.ObjectId(req.params.id)
    );
    const moviesMapped = movies.map(title => title.title);
    res.json({...charByID._doc, movies: moviesMapped});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// router.route("/:id/vehicles")

module.exports = router;
