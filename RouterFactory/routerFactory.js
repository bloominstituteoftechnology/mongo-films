const routerFactory = function(router, db) {
  console.log('inside Routerfactory');
  let toPopulate = [];

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
    const parameters = req.body;

    const toPost = new db(parameters);
    toPost
      .save()
      .then(response => {
        res.status(201).json(response);
      })
      .catch(e => {
        next(e);
      });
  }
  function handleGET(req, res, next) {
    const { id } = req.params;
    let fetching = !id ? db.find({}) : db.find({ _id: id });

    toPopulate.forEach(join => fetching.populate(join));

    fetching.exec(function(err, response) {
      if (err) {
        !id
          ? next(createError(500, 'The friends information could not be retrieved.'))
          : next(500, 'The friend information could not be retrieved.');
      } else {
        res.status(200).json(response);
      }
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
  function handlePUT(req, res, next) {}
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
    const parameters = { ...req.body };

    // To 'push' the path that are "required: true"
    let requiredPaths = [];

    // Get Schema paths and path's properties:
    const entries = Object.entries(db.schema.paths);

    /**
     * Filter the required paths: and push tehm to the 'requiredPaths' variable
     */
    entries.forEach(entrie => {
      const pathName = entrie[0];
      const pathProperties = entrie[1];
      pathProperties.validators.length === 1 && requiredPaths.push(pathName);

      /**
       * If there a several 'validators': => filter if one of them are of type 'required: true'
       */
      if (pathProperties.validators.length > 1) {
        pathProperties.validators.forEach(validator => {
          validator.type == 'required' && requiredPaths.push(pathName);
        });
      }
    });
    console.log(requiredPaths.length, requiredPaths);

    /**
     * If there are no imssing required fields: ? next() : next('custom-error')
     */
    requiredPaths.length === 0 || !areMissingPathsInParams(requiredPaths, parameters)
      ? next()
      : next(createError(400, `The following field are required: ${requiredPaths.join(' ')}`));
  }

  /**
   * Schema middlewares: Custom Pre, Post middlewares
   */

  /**
   * OTHER Helpers: auxiliar functions
   */
  function areMissingPathsInParams(paths, parameters) {
    let missingFields = false;
    for (let path of paths) {
      if (!parameters.hasOwnProperty(path)) missingFields = true;
    }
    return missingFields;
  }

  return function(...arg) {
    arg.forEach(arg => toPopulate.push(arg));
    console.log(toPopulate);
  };
  // return {
  //   setPopulate: function(...arg) {
  //     arg.forEach(arg => toPopulate.push(arg));
  //     console.log(toPopulate);
  //   },
  // };
};

module.exports = { routerFactory };
