const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    Starship.find()
        .populate('pilots', { _id:0, name:1})
        .then(starships =>{
            res.status(200).json(starships)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving starships`, res, err);
        });
};

const post = (req, res) =>{
    const {mglt, starship_class, hyperdrive_rating, pilots}= req.body;
    const StarshipTraits = {mglt, starship_class, hyperdrive_rating, pilots};
       
    const Starship = new Starship(StarshipTraits)

    Starship
        .save()
        .then(Starship =>{
            res.status(201).json(Starship);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving Starship to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Starship.findById(id)
        .populate('pilots', { _id:0, name:1})
        .then(starship =>{
            if(starship.length===0){
                sendUserError(404, `There was an error in fetching Starship with ${id}`, res);
            }
            res.status(200).json(starship);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching Starship");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Starship
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Starship with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing Starship from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const {mglt, starship_class, hyperdrive_rating, pilots} = req.body;
    const StarshipTraits = {mglt, starship_class, hyperdrive_rating, pilots};

    if(!id){
        sendUserError(404, `There was an error in fetching Starship with ${id}`, res);
    }
    Starship.update({ _id: id}, { $set: {StarshipTraits }})
        .then(Starship =>{
            res.status(200).json(Starship);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};

const postCharacter = (req, res) =>{
    const { id } = req.params;
    const { characterId } = req.body;

    Starship.findOne({ _id: id })
        .then(foundCharacter =>{
            foundCharacter.starships = [...foundCharacter.starships, characterId];
            foundCharacter
                .save()
                .then(savedCharacter =>{
                    res.status(201).json(savedCharacter);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving char to Starship database", res, err)
                })
        .catch(err =>{
            sendUserError(500, "There was an error in saving char to database");
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

router.route("/:id/starship")
    .post(postCharacter)

module.exports = router;
