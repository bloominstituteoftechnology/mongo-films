const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

// add endpoints here

router.get("/:id", (req, res) => {
  const characterId = req.params.id;
  let charFinder = Character.findById(characterId).populate("homeworld");

  charFinder.then(character => {
    res.json(character);
  });
  charFinder.catch(err => {
    res
      .status(500)
      .json({ message: "There was an error finding the character" });
  });
});

module.exports = router;
