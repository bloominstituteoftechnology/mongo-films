const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');
const charactersRouter = require('./routers/charactersRouter.js');
const filmsRouter = require('./routers/filmsRouter.js');
const speciesRouter = require('./routers/speciesRouter.js');
const starshipsRouter = require('./routers/starshipsRouter.js');
const vehiclesRouter = require('./routers/vehiclesRouter.js');
const planetsRouter = require('./routers/planetsRouter.js');

const server = express();
const port = process.env.PORT || 8080;

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

server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
