const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
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


module.exports = router;

/*/api/films
/api/films?producer=gary+kurtz
/api/films?released=2005

/api/characters/:id
/api/characters/:id/vehicles
/api/characters?minheight=100

/api/planet/:id*/