const express = require("express");

const Resume = require("./Resume.js");

const router = express.Router();

router.get("/", (req, res) => {
  Resume.find()
    .populate({
      path: "planets.item",
      populate: {
        path: "item",
        model: "Planet"
      }
      // "planets", "name climate terrain gravity diameter"
    })
    .then(resumes => {
      res.status(200).json(resumes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get resumes." });
    });
});

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   // below is luis way to find species and chars that have the given planet id as a homeworld
//   const chars = Character.find({ homeworld: id });
//   const species = Species.find({ homeworld: id });

//   Promise.all([chars, species])
//     .then(results => {
//       const [characters, species] = results;
//       res.status(200).json({ characters, species });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({
//           errorMessage:
//             "Could not get the native characters/species of this planet."
//         });
//     });
// });

module.exports = router;
