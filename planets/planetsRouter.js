const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    Planet.find()
        .then(planets =>{
            res.status(200).json(planets)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving planets`, res, err);
        });
};

const post = (req, res) =>{
    const { climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period } = req.body;
    const PlanetTraits = { climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period };
        const Planet = new Planet(PlanetTraits)

    Planet
        .save()
        .then(Planet =>{
            res.status(201).json(Planet);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving Planet to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Planet.findById(id)
        .then(Planet =>{
            if(Planet.length===0){
                sendUserError(404, `There was an error in fetching Planet with ${id}`, res);
            }
            res.status(200).json(Planet);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching Planet");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Planet
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Planet with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing Planet from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const { climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period } = req.body;
    const PlanetTraits = { climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period };
    if(!id){
        sendUserError(404, `There was an error in fetching Planet with ${id}`, res);
    }
    Planet.update({ _id: id}, { $set: {PlanetTraits }})
        .then(Planet =>{
            res.status(200).json(Planet);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};


router.route("/")
    .get(get)
    .post(post);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId);

    
module.exports = router;
