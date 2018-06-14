const express = require( 'express' );

const Film = require( './Film.js' );

const router = express.Router();


// add endpoints here
//GET all characters
// router 
//     .route( '/' )
//     .get( ( req, res ) =>
//     {
const router = express();
router.route( '/' ).get( ( req, res ) =>
{
    const { producer } = req.query;
    if ( producer )
    {
        film.find( { producer: { $regex: producer, $options: '1' } } )
            .then( films => res.json( films ) )
            .catch( error => res.status( 500 ).json( { error: error.message } ) );
    } else
    {
        find.find( {} )
            .sort( 'episode' )
         
            // Film.find()
            //     .sort( { episode: 1 } )
            //     .select( 'episode' )
            .populate( 'characters',
                '_id name gender height skin_color hair_color and eye_color'
            )
            .populate( 'planets',
                'name climate terrain gravity and diameter'
            )
            //2nd method to POPULATE
            // .populate({path: 'characters', select: '-_id, name, gender, height, skin_color, hair_color and eye_color'})
            .then( films => res.json( films ) )
            .catch( error => res.status( 500 ).json( { error: 'error.message' } ) );
            } 
        });


module.exports = router;
