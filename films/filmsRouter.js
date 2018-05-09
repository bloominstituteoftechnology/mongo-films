const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  const { producer } = req.query;
  let query = Film.find();

  Film.find().sort('episode')
    .then(films => {
      if(producer === 'gary kurtz') {
        query.where({ producer: /Gary Kurtz/i })
          .then(films => {
            res.status(200).json(films);
          })
      } else {
        res.status(200).json(films);
      }
		})
		.catch(err => {
			res.status(500).json({
				err: "Films cannot be retrieved"
			});
		});
});



module.exports = router;
