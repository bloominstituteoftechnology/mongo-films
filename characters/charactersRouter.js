const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
//GET all characters
router
.route( '/' )
.get( ( req, res ) =>
{
Character.find()
    .then( characters =>
    {
    res.status( 200 ).json( characters );
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
Character.findById( id )
    .then( foundCharacter =>
    {
    res.status( 200 ).json( foundCharacter );
    } )
    .catch( err =>
    {
    res.status( 500 ).json( { errorMessage: "The friends information could not be retrieved." } );
    } )
})


module.exports = router;

/*/api/films
/api/films?producer=gary+kurtz
/api/films?released=2005

/api/characters/:id
/api/characters/:id/vehicles
/api/characters?minheight=100

/api/planet/:id*/