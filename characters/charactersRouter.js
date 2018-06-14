const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    Character.find()
        .then(characters =>{
            res.status(200).json(characters)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving characters`, res, err);
        });
};

const post = (req, res) =>{
    const { name, gender, height, hair_color, skin_color, eye_color } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color};
        const character = new Character(characterTraits)

    character
        .save()
        .then(character =>{
            res.status(201).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving character to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Character.findById(id)
        .populate('homeworld', {name:1, _id:0})
        .then(character =>{
            if(character.length===0){
                sendUserError(404, `There was an error in fetching character with ${id}`, res);
            }
            res.status(200).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching character");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Character
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Character with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing character from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const { name, gender, height, hair_color, skin_color, eye_color } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color };

    if(!id){
        sendUserError(404, `There was an error in fetching character with ${id}`, res);
    }
    Character.update({ _id: id}, { $set: {characterTraits }})
        .then(character =>{
            res.status(200).json(character);
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

router.route("/")
    .get(get)
    .post(post);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId);

router.route("/:id/planet")
    .post(postPlanet)
    
module.exports = router;
