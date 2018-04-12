const express = require(`express`);

const Vehicle = require(`./Vehicle.js`);

const db_thrown_error = require(`./db_thrown_error`);

const router = express.Router();

// add endpoints here
router
  .route(`/`)
  .get((req, res) => {
    Vehicle.find({})
      .then(Vehicles => {
        if (Vehicles.length === 0) {
          res.status(404).json({ error: `No Vehicles found!` });
        } else {
          res.status(200).json(Vehicles);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `GET` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .post((req, res) => {
    // do some error checks
    if (req.body.VehicleName === undefined) {
      res.status(400).json({ error: `Please enter a Vehicle name` });
      return;
    }

    // create a film Model
    const vehicle = new Vehicle(req.body);

    vehicle
      .save()
      .then(savedVehicle => {
        res.status(201).json(savedVehicle);
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `POST` });
        res.status(error.status).json(error.errorMessage);
      });
  });

module.exports = router;
