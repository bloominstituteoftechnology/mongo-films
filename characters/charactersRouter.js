const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

// add endpoints here

router.route("/:id").get((req, res) => {
  Character.findById(req.params.id)
    .populate("homeworld")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// db.users.find({$or: [{name: {$regex: "^Da"}}, {name: {$regex: "^Ali"}}]})

router.route("/").get((req, res) => {
  if (req.query.minheight) {
    Character.find({
      $and: [{ gender: "female" }, { height: { $gte: req.query.minheight } }]
    })
      .populate("homeworld")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    Character.find()
      .populate("homeworld")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = router;
