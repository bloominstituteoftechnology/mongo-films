const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{
    Vehicle.find()
        .populate('pilots', { _id:0, name:1})
        .then(vehicles =>{
            res.status(200).json(vehicles)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving vehicles`, res, err);
        });
};

const post = (req, res) =>{
    const {vehicle_class, pilots}= req.body;
    const VehicleTraits = {vehicle_class, pilots};
       
    const Vehicle = new Vehicle(VehicleTraits)

    Vehicle
        .save()
        .then(vehicle =>{
            res.status(201).json(vehicle);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving Vehicle to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Vehicle.findById(id)
        .populate('pilots', { _id:0, name:1})
        .then(vehicle =>{
            if(vehicle.length===0){
                sendUserError(404, `There was an error in fetching Vehicle with ${id}`, res);
            }
            res.status(200).json(Vehicle);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching Vehicle");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Vehicle
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Vehicle with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing Vehicle from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const {vehicle_class, pilots} = req.body;
    const VehicleTraits = {vehicle_class, pilots};

    if(!id){
        sendUserError(404, `There was an error in fetching Vehicle with ${id}`, res);
    }
    Vehicle.update({ _id: id}, { $set: {VehicleTraits }})
        .then(Vehicle =>{
            res.status(200).json(Vehicle);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};

const postCharacter = (req, res) =>{
    const { id } = req.params;
    const { characterId } = req.body;

    Vehicle.findOne({ _id: id })
        .then(foundCharacter =>{
            foundCharacter.vehicles = [...foundCharacter.vehicles, characterId];
            foundCharacter
                .save()
                .then(savedCharacter =>{
                    res.status(201).json(savedCharacter);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving char to Vehicle database", res, err)
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

router.route("/:id/Vehicle")
    .post(postCharacter)

module.exports = router;
