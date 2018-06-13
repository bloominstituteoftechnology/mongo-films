###SchemaTypes in Mongoose

- String (we've used this)
- Number (we've used this - integers)
- Date (we've also used this- Date.now)
- Buffer
    * used for media types. Files that are large - images, etc. 
    * you can save things as a buffer because there is a limitation to a mongo db
        * if you had GB of data, you can use buffer to chunk out portions of the database. Buffers stick things back together. Audio files, too

- Boolean 
    * active vs inactive account, for instance

- Mixed
    * mixed bag of schema types
- ObjectID
    * underscore id that mongo will create by default ( `_id` )

- Array
    * I want an array of strings, or an array of nested schemas

- Decimal128
    * floater decimal

- Map
    * brand new (data type that can handle a bunch of different fields) 

###Mongoose is awesome!

###How to export document

* mongoexport -- db cs10 --collection hobbies --out hobbies.json

###How to import document
* mongoimport --db cs10 --collection restaurants --file restaurants.json

# This code imports the characters data into the characters collection of the starwars database. Modify the command, changing the collection name and the file name to import the other JSON files.
mongoimport --db starwars --collection characters --file characters.json
mongoimport --db starwars --collection films --file films.json
mongoimport --db starwars --collection planets --file planets.json
mongoimport --db starwars --collection species --file species.json
mongoimport --db starwars --collection starships --file starships.json
mongoimport --db starwars --collection vehicles --file vehicles.json