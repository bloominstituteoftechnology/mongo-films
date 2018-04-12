const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here


router
.route('/')
.get( (req,res)=>{
  if( Object.keys(req.query).length > 0){
    if(req.query.minheight){
      Character.find({})
      .then(response=>{
        let characters = response.filter(e=>{
          return (parseInt(e.height) >= parseInt(req.query.minheight) && e.gender === "female")
        });
        res.status(200).json(characters);
      })
      .catch(err=>{
        res.status(500).json(err);
      });
    }
    else{
      res.status(500).send("invalid request");
    }
  }
  else{
    Character.find({})
    .then( characters=>{
      res.status(200).json(characters);
    })
    .catch( err=>{
      res.status(500).json(err);
    });
  }
})
.post( (req,res)=>{
  const person = new Character(req.body);
  person.save().then(savedPerson =>{
    res.status(200).json(savedPerson);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
router
.route('/:id')
.get( (req,res)=>{
  Character.findById(req.params.id)
  .populate('homeworld')
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
.delete( (req,res)=>{
  Character.findById(req.params.id).remove()
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
.put((req,res)=>{
  Character.findOneAndUpdate(new ObjectId(req.params.id),req.body,{upsert:false})
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});
router
.route('/:id/vehicles')
.get( (req,res)=>{
  const id = new ObjectId(req.params.id);
  Vehicle.find({pilots:id})
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});
module.exports = router;
