const express = require("express");
const Character = require("./Character.js");
const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req, res) => {
    Character.find()
      .then(chars => res.status(200).json(chars))
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    let vars = ({
      name,
      gender,
      skin_color,
      hair_color,
      height,
      eye_color,
      birth_year
    } = req.body);
    let newC = new Character(vars);
    Character.save(newC)
      .then(newChar => res.status(201).json(newChar))
      .catch(err => res.status(500).json({ error: err.message }));
  });

router.route("/:id").get((req, res) => {
  let { id } = req.params;
  Character.find(id);
  populate("homeworld", { _id: 0, _v: 0 })
    .then(char => res.status(200).json(char))
    .catch(err => res.status(500).json({ error: err.message }));
});
module.exports = router;
