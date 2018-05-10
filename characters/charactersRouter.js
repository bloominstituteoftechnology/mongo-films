const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.route("/").get(get);

//returns a list of all characters
function get(req, res) {
  Character.find()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      errorMessage: "The friends information could not be retrieved.";
    });
}

//returns a specific character
router.route("/:id").get((req, res) => {
  Character.findById(req.params.id)
    .populate("homeworld")
    .then(character => {
      if (!character) {
        res.status(404).json({
          error: "The character with the specified ID does not exist."
        });
      } else {
        res.status(200).json(character);
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The character information could not be retrieved."
      });
    });
});

module.exports = router;
