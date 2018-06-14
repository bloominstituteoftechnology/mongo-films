const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    const { producer } = req.query;
    if (producer){
       const filtered = new RegExp(producer, 'i');
       console.log(filtered);
       Film.find({})
        .where('producer')
        .regex(filtered)
        .then(films => res.json(films))
        .catch(err => sendUserError(500, "There as an error in filtering results", res, err))
        }
    
        const { released } = req.query;
        if (released){
           const filtered = new RegExp(released, 'g');
           console.log(filtered);
           Film.find({})
            .where('release_date')
            .regex(filtered)
            .then(films => res.json(films))
            .catch(err => sendUserError(500, "There as an error in filtering results", res, err))
            }
        
    Film.find()
        .populate('characters', { _id:1, name:1})
        .populate('vehicles', {_id:0})
        .populate('starships', {_id:0})
        .populate('planets', {_id:0, name:1})
        .populate('species', {_id:0})
        .sort({episode: 1})
        .select({_id:0, episode: 1, title:1})
        .then(films =>{
            res.status(200).json(films)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving films`, res, err);
        });
};

const post = (req, res) =>{
    const {episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, starship_ids, vehicle_ids, starships, vehicles, planets, characters, species}= req.body;
    const FilmTraits = {episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, starship_ids, vehicle_ids, starships, vehicles, planets, characters, species};
       
    const Film = new Film(FilmTraits)

    Film
        .save()
        .then(film =>{
            res.status(201).json(film);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving film to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Film.findById(id)
        .populate('characters', { _id:1, name:1, gender:1, height:1, skin_color:1, hair_color:1,eye_color:1})
        .populate('vehicles', {_id:0})
        .populate('starships', {_id:0})
        .populate('planets', {_id:0, name:1, climate:1, terrain:1, gravity:1, diameter:1})
        .populate('species', {_id:0})
        .then(film =>{
            if(film.length===0){
                sendUserError(404, `There was an error in fetching film with ${id}`, res);
            }
            res.status(200).json(film);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching film");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Film
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Film with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing Film from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const {episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, starship_ids, vehicle_ids, starships, vehicles, planets, characters, species} = req.body;
    const FilmTraits = {episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, starship_ids, vehicle_ids, starships, vehicles, planets, characters, species};

    if(!id){
        sendUserError(404, `There was an error in fetching film with ${id}`, res);
    }
    Film.update({ _id: id}, { $set: {FilmTraits }})
        .then(film =>{
            res.status(200).json(film);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};

const postCharacter = (req, res) =>{
    const { id } = req.params;
    const { characterId } = req.body;

    Film.findOne({ _id: id })
        .then(foundCharacter =>{
            foundCharacter.films = [...foundCharacter.films, characterId];
            foundCharacter
                .save()
                .then(savedCharacter =>{
                    res.status(201).json(savedCharacter);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving char to film database", res, err)
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

router.route("/:id/planet")
    .post(postCharacter)

module.exports = router;
