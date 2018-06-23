const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  //making the search query dynamic
  //next time design the database so that the search query name === the database name
  if (Object.keys(req.query).length > 0) {
    //making the search query dynamic
    let query = Object.keys(req.query);
    let key = query[0] === "released" ? `release_date` : query[0];
    const filter = new RegExp(req.query[query], "i");
    //console.log(key, filter);

    Film.find({})
      .where(key) //mongoose way of querying
      .regex(filter) //mongoose way of how to query by
      .populate("homeworld", {
        //a way to select what to populate with ObjectID
        _id: 0,
        name: 1,
        climate: 1,
        terrain: 1,
        gravity: 1,
        diameter: 1
      })
      .populate("characters", {
        name: 1,
        gender: 1,
        height: 1,
        skin_color: 1,
        hair_color: 1,
        eye_color: 1
      })
      .populate("starships", { _id: 0, starship_class: 1 })
      .populate("vehicles", "-_id vehicle_class") //another way to dictate what to populate
      .select(
        //select only certain things to display
        "-planet_ids -character_ids -specie_ids -starship_ids -vehicle_ids"
      )
      .then(films => res.status(200).json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    // console.log(Object.keys(req.query))
    Film.find()
      .sort({ episode: 1 }) //sort({how to sort by})
      .populate("homeworld", {
        _id: 0,
        name: 1,
        climate: 1,
        terrain: 1,
        gravity: 1,
        diameter: 1
      })
      .populate("characters", {
        _id: 0,
        name: 1,
        gender: 1,
        height: 1,
        skin_color: 1,
        hair_color: 1,
        eye_color: 1
      })
      .populate("starships", { _id: 0, starship_class: 1 })
      .then(films => res.status(200).json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

router.route("/:id").get((req, res) => {
  let { id } = req.params;
  Film.findById(id)
    .populate("homeworld", {
      _id: 0,
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1
    })
    .populate("characters", {
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1
    })
    .then(film => res.status(200).json(film))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
