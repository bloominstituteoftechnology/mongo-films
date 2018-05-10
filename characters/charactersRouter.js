const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter")
    // .then(characters => {
    //   // this version would need a map promise.all or something liek
    //   res.status(200).json(characters);
    // })
    // below is the promise all version that works but only returns one
    // .then(chars => {
    //   const promises = chars.map(char => {
    //     return Film.find({ characters: char._id })
    //       .select("title")
    //       .then(films => {
    //         const character = { ...char._doc, movies: films };
    //         // you can put return on bottom or remove the res status thing to change
    //         res.status(200).json(character);
    //       });
    //   });
    //   Promise.all(promises).then(chars => res.status(200).json(promises));
    .then(chars => {
      const promises = chars.map(char => {
        return Film.find({ characters: char._id })
          .select("title")
          .then(films => {
            const character = { ...char._doc, movies: films };
            // you can put return on bottom or remove the res status thing to change
            res.status(200).json(character);
          });
      });
      Promise.all(promises).then(chars => res.status(200).json(promises));
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get characters." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Character.findById(id)
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(char => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const character = { ...char._doc, movies: films };
          res.status(200).json(character);
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get character." });
    });
});

module.exports = router;
