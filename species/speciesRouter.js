const express = require('express');

const Species = require('./Specie.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    Species.find()
        .populate("homeworld", {name:1, _id:0})
        .then(species =>{
            res.status(200).json(species)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving Species`, res, err);
        });
};

const post = (req, res) =>{
    const {classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, homeworld} = req.body;
    const SpeciesTraits = {classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, homeworld};
        const Species = new Species(SpeciesTraits)

    Species
        .save()
        .then(species =>{
            res.status(201).json(species);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving Species to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Species.findById(id)
    .populate("homeworld", {name:1, _id:0})
        .then(species =>{
            if(species.length===0){
                sendUserError(404, `There was an error in fetching Species with ${id}`, res);
            }
            res.status(200).json(species);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching Species");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Species
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Species with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing Species from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const {classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, homeworld} = req.body;
    const SpeciesTraits = {classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, homeworld};
    if(!id){
        sendUserError(404, `There was an error in fetching Species with ${id}`, res);
    }
    Species.update({ _id: id}, { $set: {SpeciesTraits }})
        .then(species =>{
            res.status(200).json(species);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};

const postPlanet = (req, res) =>{
    const { id } = req.params;
    const { planetId } = req.body;

    Character.findOne({ _id: id })
        .then(foundPlanet =>{
            foundPlanet.characters = [...foundPlanet.characters, planetId];
            foundPlanet
                .save()
                .then(savedPlanet =>{
                    res.status(201).json(savedPlanet);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving planet to char database", res, err)
                })
        .catch(err =>{
            sendUserError(500, "There was an error in saving character to database");
            });
        });
}

const postPeople = (req, res) =>{
    const { id } = req.params;
    const { peopleId } = req.body;

    Character.findOne({ _id: id })
        .then(foundPeople =>{
            foundPeople.characters = [...foundPeople.characters, peopleId];
            foundPeople
                .save()
                .then(savedPeople =>{
                    res.status(201).json(savedPeople);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving planet to char database", res, err)
                })
        .catch(err =>{
            sendUserError(500, "There was an error in saving character to database");
            });
        });
}

router.route("/")
    .get(get)
    .post(post);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId);

router.route("/:id/planet")
    .post(postPlanet)

router.route("/:id/people")
    .post(postPeople)
 
    
module.exports = router;
