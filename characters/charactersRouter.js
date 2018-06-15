const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

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
    .post( ( req, res ) =>
    {
        const { name } = req.body;
        const newCharacter = new Character( { name } );
        newCharacter
            .save()
            .then( savedcharacters =>
            {
                res.status( 201 ).json( savecharacters );
            } )
            .catch( error =>
            {
                res.status( 400 ).json( { errorMessage: "Please provide firstName, lastName and age for the friend." } )
            } )
    } );
router
    .route( '/:id' )
    .get( ( req, res ) =>
    {
        const { id } = req.params;
        Character.findById( id )
            .then( foundcharacters =>
            {
                res.status( 200 ).json( foundcharacters );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { errorMessage: "The friends information could not be retrieved." } );
            } )
    } )
    .put( ( req, res ) =>
    {
        const { id } = req.params;
        const updates = ( { name } = req.body );
        // findByIdAndUpdate
        Character
            .findByIdAndUpdate( id, updates, { name } = req.body )
            .then( characters =>
            {
                res.json( characters );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { status: 'error didnt find what your looking for' } );
            } )

            .delete( ( req, res ) =>
            {
                const { id } = req.params;
                const updates = ( {  } = req.body );
                // findByIdAndUpdate
                Character
                    .findByIdAndRemove( id, updates, { name } = req.body )
                    .then( characterRemoved =>
                    {
                        res.json( characterRemoved );
                    } )
                    .catch( err =>
                    {
                        res.status( 500 ).json( { status: 'error didnt find what your looking for' } );
                    } )
                // res.json(200).json({ status: 'please implement PUT functionality' });
            } )
        // res.json(200).json({ status: 'please implement PUT functionality' });
    } )
// router.route("/")
//     .get(get)
//     .post(post);

// router.route("/:id")
//     .get(getId)
//     .delete(deleteId)
//     .put(updateId);

// router.route("/:id/planet")
//     .post(postPlanet)
    
module.exports = router;
