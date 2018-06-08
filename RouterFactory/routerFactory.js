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
  function handlePOST(req, res, next) {}
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
  function validateParameters(req, res, next) {}
  /**
   * Schema middlewares: Custom Pre, Post middlewares
   */

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
