const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
}

// add endpoints here
const get = (req, res) =>{
    Character.find()
        .then(characters =>{
            res.status(200).json(characters)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving characters`, res, err);
        });
}

const post = (req, res) =>{
    const { name, gender, height, hair_color, skin_color, eye_color, birth_year } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color, birth_year };
        const character = new Character(characterTraits)

    character
        .save()
        .then(character =>{
            res.status(201).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving bear to database", res, err)
        });
}

const getId = (req, res) =>{
    const { id } = req.params;

    Character.findById(id)
        .then(character =>{
            if(character.length===0){
                sendUserError(404, `There was an error in fetching character with ${id}`, res);
            }
            res.status(200).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching character");
        });
}

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
}

const updateId = (req, res) =>{
    const { id } = req.params;
    const { name, gender, height, hair_color, skin_color, eye_color, birth_year } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color, birth_year };
}

module.exports = router;
