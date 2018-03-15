const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here

router.get("/", (req, res) => {
  const { producer } = req.query;
  let query = Film.find({})
    .sort("episode")
    .select("title producer");
  if (producer) {
    query.where({ producer: /gary kurtz/i });
  }
  query.then(films => {
    res.json(films);
  });
});

module.exports = router;
