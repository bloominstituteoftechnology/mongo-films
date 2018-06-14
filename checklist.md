## Mongo-Film
- [ ] Decide how you will tackle the problem
- [ ] Fork and Clone this repository.
- [ ] CD into the folder where you cloned the repository.
- [ ] Type yarn or npm install to download all dependencies listed inside package.json.

### Import Sample Data
- [ ] Make sure the MongoDB server is running before starting the import process.
- [ ] In a terminal or command prompt window, navigate to the data folder and run the following command for each JSON file.
 ** mongoimport --db starwars --collection characters --file characters.json**
- [ ] Modify the command, changing the collection name and the file name to import the other JSON files.
- [ ] After importing all files, open MongoDB compass and verify that the data was imported successfully into the starwarsdatabase.

### Start the API and Implement Requirements
- [ ] To start the server, type yarn start or npm start from the root folder (where the package.json file is).
- [ ] Take some time to study the code provided.
- [ ] Configure relationships on the provided mongoose Schemas.
- [ ] Write endpoints to perform the following queries;
===Film===
- [ ] /api/films
- [ ] /api/films?producer=gary+kurtz
- [ ] /api/films?released=2005
===Characters===
- [ ] /api/characters/:id
- [ ] /api/characters/:id/vehicles
- [ ] /api/characters?minheight=100
===Planet===
- [ ] /api/planet/:id
- [ ] Test the API using Postman as you work through the exercises.

### Stretch Problems
- [ ] Use create-react-app to create an application inside the root folder, name it client.
- [ ] From the React application connect to the /api/films endpoint in the API and show the list of Characters
- [ ] Style the list of characters however you see fit.
- [ ] Add as many CRUD endpoints as you can for the Resources to make it a full API.
