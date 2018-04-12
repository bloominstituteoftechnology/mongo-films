const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
.route('/')
.get( (req,res)=>{
  Film.find({}).sort('episode')
  .populate('characters')
  .populate('planets')
  .exec(function(err,films){
    if(err){
      handleError(err);
    }
    films = films.map(e=>{
      e.characters = e.characters.map(f=>{
        return {_id:f._id,name:f.name,gender:f.gender,height:f.height,skin_color:f.skin_color,eye_color:f.eye_color};
      });
      e.planets = e.planets.map(f=>{
        return {_id:f._id,name:f.name,climate:f.climate,terrain:f.terrain,gravity:f.gravity,diameter:f.diameter};
      });
      return e;
    });
    res.status(200).json(films);
  })
});

module.exports = router;
