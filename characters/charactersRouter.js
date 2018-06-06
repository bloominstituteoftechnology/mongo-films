const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    Character.find()
      .then(foundCharacter => res.json(foundCharacter))
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    const character = ({
      name,
      edited,
      created,
      gender,
      height,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      key,
      homeworld_key
    } = req.body);
    const newCharacter = new Character(character);
    if (!name) {
      res
        .status(400)
        .json({ error: "Please provide a name for your character." });
    } else {
      newCharacter
        .save()
        .then(createdCharacter => res.status(201).json(createdCharacter))
        .catch(err => res.status(500).json({ error: err.message }));
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .then(foundCharacter => {
        if (foundCharacter) {
          res.json(foundCharacter);
        } else {
          res.status(404).json({
            error: "The character with the specified ID does not exist."
          });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    Character.findByIdAndRemove(id)
      .then(removed => {
        if (removed) {
          res.json(removed);
        } else {
          res.status(404).json({
            error: "The character with the specified ID does not exist."
          });
          return;
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    const character = ({
      name,
      edited,
      created,
      gender,
      height,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      key,
      homeworld_key
    } = req.body);
    Character.findByIdAndUpdate(id, character, { new: true })
      .then(updated => {
        if (updated) {
          res.json(updated);
        } else {
          res.status(404).json({
            error: "The character with the specified ID does not exist."
          });
        }
      })
      .catch(err => res.status.json({ error: err.message }));
  });

module.exports = router;
