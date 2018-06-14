const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
//GET all characters
router
.route( '/' )
.get( ( req, res ) =>
{
Planet.find()
    .then( planets =>
    {
    res.status( 200 ).json( planets );
    } )
    .catch( err =>
    {
    res.status( 500 ).json( { error: 'Error' } )
    } );
} )

//GET by ID
///api/characters/:id
router
.route( '/:id' )
.get( ( req, res ) =>
{
const { id } = req.params;
Planet.findById( id )
    .then( foundPlanet =>
    {
    res.status( 200 ).json( foundPlanet );
    } )
    .catch( err =>
    {
    res.status( 500 ).json( { errorMessage: "The friends information could not be retrieved." } );
    } )
})

module.exports = router;
