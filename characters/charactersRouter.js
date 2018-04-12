const express = require(`express`);

const Character = require(`./Character.js`);

const db_thrown_error = require(`./db_thrown_error`);

const router = express.Router();

// add endpoints here
router.route(`/`).get((req, res) => {
  Character.find({})
    .then(characters => {
      if (characters.length === 0) {
        res.status(404).json({ error: `No characters found!` });
      } else {
        res.status(200).json(characters);
      }
    })
    .catch(err => {
      const error = db_thrown_error({ error: err, type: `GET` });
      res.status(error.status).json(error.errorMessage);
    });
}); // if you uncomment the post take the semi colon out
// .post((req, res) => {
//   // do some error checks
//   if (req.body.characterName === undefined) {
//     res.status(400).json({ error: `Please enter a character name` });
//     return;
//   }

//   // create a film Model
//   const character = new Character(req.body);

//   character
//     .save()
//     .then(savedCharacter => {
//       res.status(201).json(savedCharacter);
//     })
//     .catch(err => {
//       const error = db_thrown_error({ error: err, type: `POST` });
//       res.status(error.status).json(error.errorMessage);
//     });
// });

module.exports = router;
