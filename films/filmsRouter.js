const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.route("/").get((req, res) => {
  const { producer, released } = req.query;
  if (producer) {
    const producerFilter = new RegExp(producer, "i");
    Film.find({})
      .where("producer")
      .regex(producerFilter)
      .then(films => res.json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  } else if (released) {
    const releasedFilter = new RegExp(released, "i");
    Film.find({})
      .where("release_date")
      .regex(releasedFilter)
      .then(films => res.json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    Film.find({})
      .sort("episode")
      .populate(
        "characters",
        "_id name gender height skin_color hair_color eye_color"
      )
      .populate("planets", "name climate terrain gravity diameter")
      .then(films => res.json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

module.exports = router;
