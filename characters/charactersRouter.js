const express = require('express');
const Character = require('./Character.js');
const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

//   Character
//     .findById(id)
//     .then(data => {
//       if (data.movies.length < 1) {
//         let addMovies = [];
//
//           .then(() => {
//             Promise
//               .all(addMovies)
//               .then(() => {
//                 Character.findById(id)
//                   .populate('movies', 'title _id')
//                   .then(finalData => {
//                     res.send(finalData);
//                   });
//               });
//           });
//       }
//     });
// });

module.exports = router;
