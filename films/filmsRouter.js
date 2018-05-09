const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get("/", (req, res) => {
    Film.find().then(films => {
      res.status(200).json(films)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The film information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Film.findById(id).then(film => {
      res.status(200).json(film)
    }).catch(err => {
      res.status(404).json({
        message: "A film with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const filmData = req.body;
    const film = new Film(filmData);
      
    film.save().then(film => {
        res.status(200).json({
          message: "Successfuly saved new film to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the film to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Film.findByIdAndRemove(id).then(film => {
        res.status(200).json({
            message: "film has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The film could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Film.findByIdAndUpdate(id, input).then(film => {
        res.status(200).json({
            message: "Film has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The film information could not be modified."
    })
  })
});

module.exports = router;
