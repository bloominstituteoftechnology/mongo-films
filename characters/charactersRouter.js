const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter")

    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
