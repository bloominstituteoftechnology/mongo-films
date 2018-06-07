module.exports = function(router, db) {
  router
    .route('/')
    .get(handleGET)
    .post(validateParameters, handlePOST);

  router
    .route('/:id')
    .get(isIdValid, handleGET)
    .put(isIdValid, validateParameters, handlePUT)
    .delete(isIdValid, handleDELETE);

  router.use(handleError);

  /**
   * ROUTER HANDLERS: handle endpoints
   */
  function handlePOST(req, res, next) {
    const data = ({ firstName, lastName, age } = req.body);

    const newFriend = new Friend(data);
    newFriend
      .save()
      .then(response => {
        res.status(201).json(response);
      })
      .catch(e => {
        // if there were an Error validatin the data in the Schema:
        if (e.name === 'ValidationError' || e instanceof Error)
          return next(createError(400, (e.message = `Age:${age} -> must be a number between 1 and 120`)));
        // If there were any other problem POSTING to the data base: send custom-default Error.
        next(createError(500, 'There was an error while saving the friend to the database.'));
      });
  }
  function handleGET(req, res, next) {
    const { id } = req.params;
    const fetching = !id ? db.find() : db.findById(id);

    fetching
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        !id
          ? next(createError(500, 'The friends information could not be retrieved.'))
          : next(500, 'The friend information could not be retrieved.');
      });
  }
  function handleDELETE(req, res, next) {
    const { id } = req.params;

    db.findByIdAndRemove(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        next(createError(500, 'The friend could not be removed'));
      });
  }
  function handlePUT(req, res, next) {
    const data = ({ firstName, lastName, age } = req.body);
    const { id } = req.params;

    /**
     * VALIDATE 'AGE':
     * Mongoose do not validate on PUT: So I define a custom middleware for this purpose.
     * POST: validates via the Schema.
     * REFACTORED: Now POST && PUT get 'age' validationo vía a 'setter'
     */

    db.findByIdAndUpdate({ _id: id }, { $set: { ...data } }, { new: true })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        // if there were an Error validatin the data in the Schema:
        if (e.name === 'ValidationError') next(createError(400, e.message));
        // If there were any other problem POSTING to the data base: send custom-default Error.
        next(createError(500, 'The friend information could not be modified.'));
      });
  }
  /**
   * ERROR: Handle Error
   */
  function handleError(err, req, res, next) {
    !err.status ? next(err) : res.status(err.status).json({ errorMessage: err.message });
    next();
  }
  // return a new custom Error
  function createError(code = 500, message = 'Oh, oh.... there is a problem bargain with the dababase, try again!') {
    let e = new Error();
    e.status = code;
    e.message = message;
    return e;
  }
  /**
   * MIDDLEWARES: Custom middlewears
   */
  function isIdValid(req, res, next) {
    const { id } = req.params;
    if (!id) return next();

    db.findById(id)
      .then(idFound => {
        return idFound ? next() : next(createError(404, 'The friend with the specified ID does not exist.'));
      })
      .catch(e => {
        next(e);
      });
  }
  function validateParameters(req, res, next) {
    const data = ({ firstName, lastName, age } = req.body);
    // if any is not in the req.body
    !firstName || !lastName || (age !== 0 && !age)
      ? // create an error and past it to "handleError"
        next(createError(400, 'Please provide firstName, lastName and age for the db.'))
      : // else pass to the next hanldler
        next();
  }
  function validateAge(req, res, next) {
    const { age } = req.body;
    Number.isInteger(age) && (1 <= age && age <= 120)
      ? next()
      : next(createError(400, 'Age must be a number between 1 and 120'));
  }
};
