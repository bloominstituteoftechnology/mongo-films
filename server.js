const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');
const charactersRouter = require('./routes/characters/charactersRouter.js');
const filmsRouter = require('./routes/films/filmsRouter.js');
const speciesRouter = require('./routes/species/speciesRouter.js');
const starshipsRouter = require('./routes/starships/starshipsRouter.js');
const vehiclesRouter = require('./routes/vehicles/vehiclesRouter.js');
const planetsRouter = require('./routes/planets/planetsRouter.js');

const server = express();

db
  .connectTo('starwars')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.use('/api/characters', charactersRouter);
server.use('/api/films', filmsRouter);
server.use('/api/species', speciesRouter);
server.use('/api/starships', starshipsRouter);
server.use('/api/vehicles', vehiclesRouter);
server.use('/api/planets', planetsRouter);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
