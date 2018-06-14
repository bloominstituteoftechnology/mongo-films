const express = require('express');

const Film = require('./Film.js');

const router = express.Router();


// add endpoints here
//GET all characters
router
.route( '/' )
.get( ( req, res ) =>
{
Film.find()
    .then( films =>
    {
    res.status( 200 ).json( films );
    } )
    .catch( err =>
    {
    res.status( 500 ).json( { error: 'Error' } )
    } );
} )

// add endpoints here
//GET all characters
router
.route( '/films' )
.get( ( req, res ) =>
{
Film.find({})
    .sort({ episode: 1})
    .select('episode')
    .populate('characters',
    '_id, name, gender, height, skin_color, hair_color and eye_color'
    )
    // .populate('characters',
    // '_id, name, gender, height, skin_color, hair_color and eye_color'
    // )
    .then( films =>
    {
    res.status( 200 ).json( films );
    } )
    .catch( err =>
    {
    res.status( 500 ).json( { error: 'Error' } )
    } );
} )


module.exports = router;
