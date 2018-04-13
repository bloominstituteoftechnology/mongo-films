const express = require('express')
const helmet = require('helmet')

const db = require('./data/db')
const charactersRouter = require('./characters/charactersRouter')
const filmsRouter = require('./films/filmsRouter')
const speciesRouter = require('./species/speciesRouter')
const starshipsRouter = require('./starships/starshipsRouter')
const vehiclesRouter = require('./vehicles/vehiclesRouter')
const planetsRouter = require('./planets/planetsRouter')

const server = express()
const port = process.env.PORT || 5000

db
  .connectTo('starwars')
  .then(() => {
    console.log('\n🤖 MongoDB connected... \n')
    server.listen(port, () => console.log(`👋 Hey from http://localhost:${port}`))
  })
  .catch(err => console.log('\n⚠️ Error connecting to MongoDB\n', err))

server.use(helmet())
server.use(express.json())

server.use('/api/characters', charactersRouter)
server.use('/api/films', filmsRouter)
server.use('/api/species', speciesRouter)
server.use('/api/starships', starshipsRouter)
server.use('/api/vehicles', vehiclesRouter)
server.use('/api/planets', planetsRouter)

server.get('/', (req, res) => res.send('API Running...'))
