const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router.route('/').get(get)

// function get (req, res) {
// let pilotedStarships = Starship.find().where('pilots').ne([]).populate('pilots', 'name -_id') // find starships that have pilots and populate the pilots field
// let unpilotedStarships = Starship.find().where('pilots').equals([]).select('-pilot_keys -pilots') // find starships without pilots and remove pilot_keys and pilots properties

//     Promise.all([pilotedStarships, unpilotedStarships]).then(results => { // Wait for both finds to resolve before returning
//     const [ pilotedStarships, unpilotedStarships ] = results; // same as saying const pilotedStarships = results[0] const unpilotedStarships = results[1]

//     res.status(200).json({ pilotedStarships, unpilotedStarships })
//     })
//     .catch(err => sendUserError(500, err.message, res))
// } // promise.all solution

function get (req, res) {
    Starship.find().where('pilots').ne([]).populate('pilots', 'name -_id').then(pilotedStarships => {
        let Starships = []
        Starship.find().where('pilots').equals([]).select('-pilot_keys -pilots').then(unpilotedStarships => {
            Starships.push({unpilotedStarships}, {pilotedStarships})
            res.status(200).json({ Starships })
        }).catch(err => sendUserError(500, err.message, res))
    }).catch(err => sendUserError(500, err.message, res))
} // Acomplishes about the same as above code, only this one includes the heading of Starships

router.route('/:id').get(getId)

function getId (req, res) {
    const { id } = req.params;
    Starship.findById(id)
    .where('pilots').ne([])
    .populate('pilots', 'name -_id') 
    .then(RequestedPilotedStarship => { // if the starship does not have an empty array for pilots, populate pilots and show their name
        Starship.findById(id)
        .where('pilots').equals([])
        .select('-pilot_keys -pilots')
        .then(RequestedUnpilotedStarship => { // if the starship has an empty array for pilots, do not show pilot_keys or pilots
            if (RequestedUnpilotedStarship === null) { // if RequestedUnpilotedStarship equals null, send RequestedPilotedStarship 
                res.status(200).json({ RequestedPilotedStarship })
            } else {
                res.status(200).json({ RequestedUnpilotedStarship }) // else, send RequestedUnpilotedStarship
        }})
        .catch(err => sendUserError(500, err.message, res))
}).catch(err => sendUserError(500, err.message, res))
}

module.exports = router;
