const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
.route('/')
.get( (req,res)=>{
  if(Object.keys(req.query).length > 0){
    if(req.query.producer){
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
        films = films.filter(e=>{
          return (e.producer.indexOf("Gary") >= 0);
        });
        res.status(200).json(films);
      });
    }
    else if(req.query.released){
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
        films = films.filter(e=>{
          let year = new Date(e.release_date);
          return (year.getYear() === 105);
        });
        res.status(200).json(films);
      });       
    }
    else{
      res.status(400).send("invalid request");
    }
  }
  else{
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
  }
});

module.exports = router;
