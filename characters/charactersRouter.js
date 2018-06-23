const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film");
const Vehicle = require("../vehicles/Vehicle");

const router = express.Router();

// add endpoints here
router
  .route("/")
  .get((req, res) => {
    if (req.query) {
      Character.find({
        //mongo way of implementing 2 filters at once
        $and: [{ height: { $gte: 100 } }, { gender: "female" }]
      })
        .populate("homeworld", { _id: 0, _v: 0 })
        .populate("movies", { _id: 0, _v: 0 })
        .then(chars => {
          res.status(200).json(chars);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    } else {
      Character.find()
        .populate("homeworld", { _id: 0, _v: 0 })
        .populate("movies", { _id: 0, _v: 0 })
        .then(chars => res.status(200).json(chars))
        .catch(err => res.status(500).json({ error: err.message }));
    }
  })
  .post((req, res) => {
    //making a new variable. New ES6 will omit the parts that aren't filled out
    let vars = ({
      name,
      gender,
      skin_color,
      hair_color,
      height,
      eye_color,
      birth_year
    } = req.body);
    let newCharacter = new Character(vars);
    newCharacter
      .save()
      .then(newChar => res.status(201).json(newChar))
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    Character.find({ _id: id })
      .populate("homeworld", {
        _id: 0,
        name: 1,
        climate: 1,
        terrain: 1,
        gravity: 1,
        diameter: 1
      })
      .populate("movies", { _id: 0, _v: 0 })
      .then(char => {
        let cId = char[0].key;
        //console.log(cId);
        Film.find(
          //mongo way of filtering a character and then projecting only certain fields
          { character_ids: Number(cId) },
          { title: 1, producer: 1, director: 1, _id: 0 }
        )
          //mongoose sort the films by title <-- optional
          .sort("title")
          .then(films => {
            console.log(films);
            char[0].movies = [...films];
            res.status(200).json(char[0]);
          })
          .catch(err => res.status(500).json({ error: err.message }));
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    let { id } = req.params;
    let vars = ({
      name,
      gender,
      skin_color,
      hair_color,
      height,
      eye_color,
      birth_year
    } = req.body);
    Character.findByIdAndUpdate(id, vars, { new: true })
      .then(updatedChar => res.status(201).json(updatedChar))
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    let { id } = req.params;
    Character.findByIdAndRemove(id)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  });
router.route("/:id/vehicles").get((req, res) => {
  let { id } = req.params;
  Character.find({ _id: id })
    // .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
    // .populate('movies', { _id: 0, _v: 0 })
    .then(char => {
      let cId = char[0].key;
      Vehicle.find({ pilot_keys: Number(cId) }, { _id: 0, vehicle_class: 1 })
        .then(veh => {
          console.log(veh);
          res.status(200).json(veh);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
