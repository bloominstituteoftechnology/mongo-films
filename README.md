# Mongo Films

## Topics

* Importing Data from JSON files.
* Exporting Data to JSON files.
* Modeling _One to Many_ Relationships.
* Data Population in _One to Many_ Relationships.
* Querying Data.
* Enabling Cross Origin Resource Sharing in Node.js APIs.

## Assignment

Use Node.js, Express.js and Mongoose.js to build an API that queries data persisted in a MongoDB database.

### Download Project Files and Install Dependencies

* **Fork** and **Clone** this repository.
* **CD into the folder** where you cloned the repository.
* Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.

### Import Sample Data

* Windows users follow [this tutorial](https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/) to add the MongoDB _bin_ folder to your path. Linux and MacOS users should be ready to go. **If you don't have Windows 10**, follow [the section for your version of windows on this tutorial instead](https://www.computerhope.com/issues/ch000549.htm).
* We have provided six _JSON_ files with sample data inside the `/data` folder.
* Use the _mongoimport_ utility to import all the data into your local instance of MongoDB. **Please make sure the MongoDB server is running before starting the import process**.
* In a _terminal_ or _command prompt_ window, **navigate to the data folder** and run the following command for each _JSON_ file.

```shell
  mongoimport --db starwars --collection characters --file characters.json
```

This code imports the _characters_ data into the _characters_ collection of the _starwars_ database. **Modify the command, changing the collection name and the file name** to import the other JSON files.

**MongoDB will automatically create the database and the collection**.

* After importing all files, open _MongoDB_ compass and verify that the data was imported successfully into the _starwars_ database. **If you get errors, please reach out to your assigned PM**.

Now that we have the sample data loaded, it is time to work on the API.

### Start the API and Implement Requirements

* To start the server, type `yarn start` or `npm start` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.
* Take some time to study the code provided.
* Add the code necessary to implement the API requirements.
* **Test the API using _Postman as you work through the exercises_.**

### Configure relationships on the provided _mongoose_ Schemas.

Each _Schema_ is configured to work with the data imported into the corresponding collection on the database, but is missing the field(s) needed for the relatioships.

### Write endpoints to perform the following queries.

Return a list of all films. (/api/films)

* order by episode.
* populate character information.
  * only include: `_id, name, gender, height, skin_color, hair_color and eye_color`.
* populate planets, include: `name, climate, terrain, gravity and diameter`.

Find all films produced by _Gary Kurtz_ (/api/films?producer=gary+kurtz)

Find all films released in _2005_. (/api/films?released=2005)

Given a character id, (/api/characters/:id)

* find the character and return it.
* populate the character's homeworld.
* add a _movies_ property that should be an array of all the movies where the character appeared.

Find all vehicles driven by a given character. (/api/characters/:id/vehicles)

Find all female characters taller than 100cm (/api/characters?minheight=100)

Given a planet Id find all `characters` born in that planet and all native `species`. (/api/planet/:id)

## Stretch Problems

* Use `create-react-app` to create an application inside the root folder, name it `client`.
* From the React application connect to the `/api/films` endpoint in the API and show the list of Characters
* Style the list of characters however you see fit.
* Add as many CRUD endpoints as you can for the _Resources_ to make it a full API.

### Additional Notes

**Stop the MongoDB database server when not in use to save computer resources**.
